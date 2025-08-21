/**
 * Đại diện cho một người dùng trong ngữ cảnh chat (phiên bản rút gọn).
 */
export interface IChatUser {
  _id: string;
  username: string;
  avatarUrl?: string;
}

/**
 * Đại diện cho một tin nhắn đơn lẻ.
 */
export interface IMessage {
  _id: string;
  sender: IChatUser;
  receiver: IChatUser;
  content: string;
  createdAt: string;
  isOptimistic?: boolean;
}

/**
 * Đại diện cho một cuộc trò chuyện trong danh sách bên sidebar.
 */
export interface IConversation {
  participant: IChatUser;
  lastMessage: {
    content: string;
    createdAt: string;
  };
  unreadCount: number;
}

/**
 * Đại diện cho một phiên chat đang mở (box chat ở góc màn hình).
 */
export interface IChatSession {
  participant: IChatUser;
  messages: IMessage[];
  unreadCount?: number;
  isLoadingHistory?: boolean;
  hasUnseenMessages?: boolean; // ✨ 1. Thêm trạng thái "chưa xem"
}