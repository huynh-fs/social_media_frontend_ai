import React from 'react';
import SearchBar from '../../search/components/SearchBar';
// import TrendingTopics from './TrendingTopics';

const ExplorePanel: React.FC = () => {
  return (
    <div className="flex flex-col space-y-4 py-2">
      <SearchBar />
      {/* <TrendingTopics /> */}
    </div>
  );
};

export default ExplorePanel;
