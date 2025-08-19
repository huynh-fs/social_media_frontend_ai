import React from 'react';
import { Outlet } from 'react-router-dom';
import SidebarNav from '../../features/navigation/components/SidebarNav';
import FeedTimeline from '../../features/post/components/FeedTimeline';

const MainLayout: React.FC = () => {
  return (
    <div className="w-full px-4">
      <div className="grid grid-cols-12 gap-8 min-h-screen lg:grid-cols-12 md:grid-cols-1">
        {/* Left Sidebar - fixed */}
        <aside className="hidden lg:block col-span-2 h-screen sticky top-0">
          <SidebarNav />
        </aside>
        {/* Main Feed Content - scrollable */}
        <main className="col-span-12 lg:col-span-7 h-screen">
          <FeedTimeline />
        </main>
        {/* Right Sidebar - fixed */}
        <aside className="hidden lg:block col-span-3 h-screen sticky top-0">
          <Outlet />
        </aside>
      </div>
    </div>
  );
};

export default MainLayout;
