import React from 'react';
import { useFetchUserPosts } from '../hooks/useFetchUserPosts';
import { PostCard } from '../../post/components/PostCard/PostCard'; // Đường dẫn có thể cần điều chỉnh
import { Spinner } from '../../../components/common/Spinner';

type UserPostsListProps = {
  userId: string;
};

export const UserPostsList: React.FC<UserPostsListProps> = ({ userId }) => {
  const { posts, isLoading, error } = useFetchUserPosts(userId);

  // Trạng thái loading sẽ được hiển thị ngay trong khu vực cuộn
  if (isLoading) {
    return (
      <div className="flex justify-center pt-8">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500 pt-8">{error}</p>;
  }

  if (posts.length === 0) {
    return (
      <p className="text-center text-gray-500 pt-8">
        This user hasn't posted anything yet.
      </p>
    );
  }

  // Component này giờ chỉ tập trung vào việc render danh sách bài viết.
  // Không còn thuộc tính `className` hay `style` để quản lý cuộn.
  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};