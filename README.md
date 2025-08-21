# Social Media App - Frontend Client

Đây là mã nguồn cho phần frontend của ứng dụng mạng xã hội, được xây dựng bằng React, TypeScript và Vite. Giao diện được thiết kế để mang lại trải nghiệm người dùng hiện đại, nhanh và tương tác cao.

## ✨ Các tính năng chính

- **Giao diện đáp ứng (Responsive):** Hoạt động tốt trên cả desktop và mobile.
- **Bố cục 3 cột hiện đại:** Lấy cảm hứng từ các mạng xã hội lớn như X (Twitter).
- **Tương tác Real-time:**
  - Cập nhật thông báo và tin nhắn mới ngay lập tức không cần tải lại trang.
  - Trải nghiệm chat pop-up tiện lợi.
- **Cập nhật giao diện "lạc quan" (Optimistic UI):** Các hành động như like, gửi tin nhắn cho phản hồi ngay tức thì.
- **Trang Profile người dùng:** Hiển thị thông tin, bài viết, và các hành động (follow/message).
- **Trang Feed cá nhân hóa:** Dòng thời gian với các bài viết từ những người bạn theo dõi.
- **Các tính năng khám phá:** Tìm kiếm, gợi ý theo dõi, chủ đề thịnh hành.
- **Quản lý State hiệu quả:** Sử dụng Zustand để quản lý state toàn cục một cách tối giản.

## 🛠️ Công nghệ sử dụng

- **Framework:** [React](https://reactjs.org/) (v18+)
- **Ngôn ngữ:** [TypeScript](https://www.typescriptlang.org/)
- **Công cụ Build:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Routing:** [React Router](https://reactrouter.com/) (v6)
- **Gọi API:** [Axios](https://axios-http.com/)
- **Quản lý State:** [Zustand](https://github.com/pmndrs/zustand)
- **Real-time:** [Socket.IO Client](https://socket.io/docs/v4/client-api/)
- **UI Components:** [Headless UI](https://headlessui.com/) (cho các component phức tạp như Modal, Menu).

## 🚀 Bắt đầu

### Yêu cầu tiên quyết

- Node.js (v18 trở lên)
- npm hoặc yarn
- Backend API phải đang chạy (xem tài liệu backend).

### Cài đặt

1.  **Clone repository:**
    ```bash
    git clone <your-repository-url>
    cd <repository-folder>
    ```

2.  **Cài đặt các dependencies:**
    ```bash
    npm install
    # hoặc
    yarn install
    ```

3.  **Thiết lập biến môi trường:**
    Tạo một tệp `.env.local` ở thư mục gốc và điền URL của backend API:

    ```env
    # URL của server backend
    VITE_API_URL="http://localhost:5000/api"
    VITE_SOCKET_URL="http://localhost:5000"
    ```

### Chạy ứng dụng

- **Chạy server phát triển:**
  ```bash
  npm run dev
  ```
Ứng dụng sẽ có sẵn tại http://localhost:3000 (hoặc một cổng khác do Vite chỉ định).
## 🏛️ Kiến trúc
Dự án được cấu trúc theo mô hình feature-based, giúp giữ cho code có tổ chức và dễ mở rộng.
- **src/api:** Chứa toàn bộ logic gọi API, tách biệt khỏi các component.
- **src/components/common:** Chứa các component UI cơ bản, tái sử dụng (Button, Input, ...).
- **src/features:** Mỗi thư mục con là một chức năng lớn của ứng dụng (Auth, Feed, Profile, Chat...).
- **src/stores:** Chứa các "cửa hàng" state của Zustand (authStore, chatStore...).
- **src/hooks:** Chứa các custom hooks tái sử dụng.
- **src/sockets:** Chứa service quản lý kết nối Socket.IO.
## 🎨 Thư viện Component
Dự án có một thư viện component nội bộ được xây dựng trên Tailwind CSS. Các component chính bao gồm:
- **Layouts**: MainLayout (3 cột), ProtectedRoute.
- **Common**: Button, Input, Spinner, Modal.
- **Feature-specific:** PostCard, CommentSection, ProfileHeader, ChatBox.
