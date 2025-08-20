import React from "react";
import { useParams } from "react-router-dom";
import { useFetchUserProfile } from "../features/profile/hooks/useFetchUserProfile";
import { ProfileHeader } from "../features/profile/components/ProfileHeader";
import { UserPostsList } from "../features/profile/components/UserPostsList";
import { Spinner } from "../components/common/Spinner";

const ProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user, isLoading, error } = useFetchUserProfile(id);

  // Hiển thị trạng thái loading cho toàn bộ trang
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  // Hiển thị lỗi nếu không tìm thấy user
  if (error || !user) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-xl font-bold">Could not find user</h2>
        <p className="text-gray-500">
          {error || "The user you are looking for does not exist."}
        </p>
      </div>
    );
  }

  // Bố cục chính của trang profile
  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* 
        PHẦN HEADER CỐ ĐỊNH 
        - Phần này sẽ không cuộn.
        - `flex-shrink: 0` để đảm bảo nó không bị co lại khi nội dung bên dưới quá nhiều.
      */}
      <div className="flex-shrink-0 border-b">
        <ProfileHeader user={user} />
        {/* Có thể thêm thanh Tabs (Posts, Likes...) ở đây */}
        <div className="px-4 mt-4">
          <h2 className="text-xl font-bold">Posts</h2>
        </div>
      </div>

      {/* 
        PHẦN DANH SÁCH BÀI VIẾT CÓ THỂ CUỘN
        - `flex-grow: 1` để nó chiếm hết không gian còn lại.
        - `overflow-y-auto` để bật thanh cuộn chỉ cho khu vực này.
      */}
      <div
        className="flex-grow overflow-y-auto"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <UserPostsList userId={user._id} />
      </div>
    </div>
  );
};

export default ProfilePage;
