import React from 'react';
import SearchBar from '../../features/search/components/SearchBar';
import FollowSuggestions from '../../features/users/components/FollowSuggestions';

const RightSidebar: React.FC = () => {
  return (
    <div className="flex flex-col space-y-4 py-6">
      <SearchBar />
      <FollowSuggestions />
    </div>
  );
};

export default RightSidebar;
