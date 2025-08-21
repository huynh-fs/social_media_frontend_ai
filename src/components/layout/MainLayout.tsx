import React from "react";
import { Outlet } from "react-router-dom";
import SidebarNav from "../../features/navigation/components/SidebarNav";
import RightSidebar from "./RightSidebar";
import { ChatTabs } from "@/features/chat/components/ChatTabs";

const MainLayout: React.FC = () => {
  return (
    <div className="w-full px-4 relative">
      <div className="grid grid-cols-12 gap-8 min-h-screen lg:grid-cols-12 md:grid-cols-1">
        {/* Left Sidebar - fixed */}
        <aside className="hidden lg:block col-span-2 h-screen sticky top-0">
          <SidebarNav />
        </aside>
        {/* Main Content Area - scrollable */}
        <main className="col-span-12 lg:col-span-7 h-screen">
          <Outlet />
        </main>
        {/* Right Sidebar - fixed */}
        <aside className="hidden lg:block col-span-3 h-screen sticky top-0">
          <RightSidebar />
        </aside>
      </div>
      {/* Component Chat sẽ nằm cố định trên tất cả */}
      <ChatTabs />
    </div>
  );
};

export default MainLayout;
