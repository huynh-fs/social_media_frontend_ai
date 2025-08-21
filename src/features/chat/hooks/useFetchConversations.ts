import { useState, useEffect } from 'react';
import { IConversation } from '../types';

// Giả định bạn có một hàm gọi API như thế này trong `src/api/chatService.ts`
import { fetchConversations as apiFetchConversations } from '../../../api/chatService';

/**
 * Custom hook để lấy danh sách các cuộc trò chuyện gần đây của người dùng.
 * Nó quản lý các trạng thái loading, error, và dữ liệu trả về.
 */
export const useFetchConversations = () => {
  const [conversations, setConversations] = useState<IConversation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getConversations = async () => {
      try {
        // Đặt lại trạng thái trước mỗi lần gọi API
        setIsLoading(true);
        setError(null);

        // Gọi hàm service API đã được định nghĩa
        const data = await apiFetchConversations();
        setConversations(data);
      } catch (err) {
        // Xử lý lỗi
        setError('Failed to fetch conversations.');
        console.error("Error in useFetchConversations:", err);
      } finally {
        // Luôn tắt loading sau khi hoàn thành (thành công hoặc thất bại)
        setIsLoading(false);
      }
    };

    getConversations();
    
    // useEffect này chỉ chạy một lần khi hook được mount.
    // Nếu bạn muốn nó tự động cập nhật, bạn có thể thêm logic lắng nghe socket ở đây.
  }, []);

  return { conversations, isLoading, error };
};