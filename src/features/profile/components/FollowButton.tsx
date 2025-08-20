import React, { useState } from 'react';
import { Button } from '../../../components/common/Button';
import { useFollowToggle } from '../hooks/useFollowToggle';

type FollowButtonProps = {
  targetUserId: string;
  isInitiallyFollowing: boolean;
};

export const FollowButton: React.FC<FollowButtonProps> = ({ targetUserId, isInitiallyFollowing }) => {
  const [isFollowing, setIsFollowing] = useState(isInitiallyFollowing);
  const { performFollow, performUnfollow, isLoading } = useFollowToggle();

  const handleToggleFollow = async () => {
    const previousState = isFollowing;
    setIsFollowing(!previousState);

    try {
      if (previousState) {
        await performUnfollow(targetUserId);
      } else {
        await performFollow(targetUserId);
      }
    } catch (error) {
      setIsFollowing(previousState);
    }
  };

  return (
    <Button
      onClick={handleToggleFollow}
      isLoading={isLoading}
      variant={isFollowing ? 'secondary' : 'primary'}
    >
      {isFollowing ? 'Following' : 'Follow'}
    </Button>
  );
};