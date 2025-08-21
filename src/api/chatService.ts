
import { IConversation, IMessage } from '../features/chat/types';
import { api } from './axiosConfig';

/**
 * Gọi API endpoint để lấy danh sách các cuộc trò chuyện.
 */
export const fetchConversations = async (): Promise<IConversation[]> => {
  // Giả sử API endpoint của bạn là '/chat/conversations' như đã định nghĩa
  const response = await api.get('/chat/conversations');
  return response.data;
};

// Bạn có thể thêm các hàm API khác liên quan đến chat ở đây, ví dụ:
// export const fetchMessages = async (participantId: string): Promise<IMessage[]> => { ... }
export const fetchMessages = async (participantId: string): Promise<IMessage[]> => {
  try {
    const response = await api.get(`/chat/messages/${participantId}`);
    return response.data;
  } catch (error) {
    // Xử lý lỗi nếu cần
    throw error;
  }
};