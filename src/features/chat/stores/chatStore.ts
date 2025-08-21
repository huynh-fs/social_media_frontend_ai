import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { IChatSession, IChatUser, IMessage } from "../types";
import { socketService } from "../../../sockets/socketService"; // Giả định có service này
import { useAuthStore } from "../../../stores/authStore"; // Giả định có store này để lấy thông tin người dùng hiện tại
import { fetchMessages } from "@/api/chatService";

interface IChatState {
  openChatSessions: Record<string, IChatSession>;
  actions: {
    openChat: (participant: IChatUser) => void;
    closeChat: (participantId: string) => void;
    addMessage: (message: IMessage) => void;
    setMessages: (participantId: string, messages: IMessage[]) => void;
    openChatWithNewMessage: (message: IMessage) => void;
    initializeChatListener: () => () => void; // Trả về hàm dọn dẹp
  };
}

export const useChatStore = create<IChatState>()(
  // Sử dụng persist middleware để lưu các box chat đang mở vào sessionStorage
  // Người dùng sẽ không mất các box chat khi tải lại trang
  persist(
    (set, get) => ({
      openChatSessions: {},
      actions: {
        openChat: (participant) => {
          const currentState = get();
          const existingSession = currentState.openChatSessions[participant._id];

          // Nếu session đã tồn tại (chỉ cần đưa lên trước), không cần làm gì thêm
          if (existingSession) {
            const { [participant._id]: _, ...rest } = currentState.openChatSessions;
            set({
              openChatSessions: {
                ...rest,
                [participant._id]: existingSession,
              },
            });
            return;
          }
          
          // Tạo session mới với trạng thái loading
          const newSession: IChatSession = {
            participant,
            messages: [],
            isLoadingHistory: true,
          };

          // Logic giới hạn 3 box chat không đổi
          const sessionIds = Object.keys(currentState.openChatSessions);
          let sessions = { ...currentState.openChatSessions };
          if (sessionIds.length >= 3) {
            const oldestSessionId = sessionIds[0];
            const { [oldestSessionId]: _, ...remainingSessions } = sessions;
            sessions = remainingSessions;
          }

          set({
            openChatSessions: { ...sessions, [participant._id]: newSession },
          });

          // ✨ KÍCH HOẠT FETCH LỊCH SỬ TIN NHẮN
          fetchMessages(participant._id)
            .then((messages) => {
              // Cập nhật state với tin nhắn đã fetch và tắt loading
              set((state) => {
                const currentSession = state.openChatSessions[participant._id];
                if (currentSession) {
                  return {
                    openChatSessions: {
                      ...state.openChatSessions,
                      [participant._id]: {
                        ...currentSession,
                        messages,
                        isLoadingHistory: false,
                      },
                    },
                  };
                }
                return state;
              });
            })
            .catch((error) => {
              console.error("Failed to fetch messages on openChat:", error);
              // Tắt loading kể cả khi có lỗi
              set((state) => {
                const currentSession = state.openChatSessions[participant._id];
                if (currentSession) {
                    return {
                        openChatSessions: {
                            ...state.openChatSessions,
                            [participant._id]: { ...currentSession, isLoadingHistory: false }
                        }
                    }
                }
                return state;
              });
            });
        },
        closeChat: (participantId) => {
          set((state) => {
            const { [participantId]: _, ...remainingSessions } =
              state.openChatSessions;
            return { openChatSessions: remainingSessions };
          });
        },
        // ✨ LOGIC THAY THẾ ĐƯỢC CẢI TIẾN
        addMessage: (newMessage) => {
          set((state) => {
            const currentUser = useAuthStore.getState().user;
            if (!currentUser) return state;

            const participantId =
              newMessage.sender._id === currentUser._id
                ? newMessage.receiver._id
                : newMessage.sender._id;

            const session = state.openChatSessions[participantId];
            if (!session) return state;

            let newMessages = [...session.messages];

            // Kiểm tra nếu tin nhắn đã tồn tại
            const existingIndex = newMessages.findIndex((m) => m._id === newMessage._id);
            if (existingIndex !== -1) {
              // Nếu tìm thấy, thay thế tin nhắn cũ
              newMessages[existingIndex] = newMessage;
            } else {
              // Nếu không, chỉ thêm vào nếu nó chưa tồn tại
              newMessages.push(newMessage);
            }

            if (newMessage.isOptimistic) {
              // Không thêm, trả về
              return state;
            }

            return {
              openChatSessions: {
                ...state.openChatSessions,
                [participantId]: {
                  ...session,
                  messages: newMessages,
                },
              },
            };
          });
        },
        setMessages: (participantId, messages) => {
          set((state) => {
            const session = state.openChatSessions[participantId];
            if (session) {
              return {
                openChatSessions: {
                  ...state.openChatSessions,
                  [participantId]: { ...session, messages },
                },
              };
            }
            return state;
          });
        },
        openChatWithNewMessage: (message) => {
          const participantId = message.sender._id; // Người gửi là người cần mở box chat
          const session = get().openChatSessions[participantId];

          // Nếu box chat chưa mở, hãy mở nó ra
          if (!session) {
            get().actions.openChat(message.sender);
          }
          
          // Sau đó, thêm tin nhắn vào (logic này sẽ đảm bảo tin nhắn được thêm vào đúng session)
          get().actions.addMessage(message);
        },
        // Hàm quan trọng để lắng nghe sự kiện
        initializeChatListener: () => {
          const socket = socketService.getSocket();
          if (!socket) return () => {};

          const handleNewMessage = (message: IMessage) => {
            // Khi có tin nhắn mới, gọi action `addMessage`
            get().actions.addMessage(message);
          };

          socket.on("receive_message", handleNewMessage);

          // Trả về một hàm dọn dẹp để gỡ bỏ listener khi không cần nữa
          return () => {
            socket.off("receive_message", handleNewMessage);
          };
        },
      },
    }),
    {
      name: "chat-storage", // Tên key trong storage
      storage: createJSONStorage(() => sessionStorage), // Dùng sessionStorage
      // Chỉ lưu `openChatSessions`, không lưu `actions`
      partialize: (state) => ({ openChatSessions: state.openChatSessions }),
    },
  ),
);
