import React from "react";
import { useNotificationStore } from "../../../stores/notificationStore";
import { useNavigate, useLocation } from "react-router-dom";
import { FaHome, FaHashtag, FaBell, FaEnvelope, FaUser } from "react-icons/fa";
import { useAuthStore } from "../../../stores/authStore";
import { useRightSidebarStore } from "../../../stores/rightSidebarStore";
import UserProfileMenu from "./UserProfileMenu";

const SidebarNav: React.FC = () => {
  const { user } = useAuthStore();
  const unreadCount = useNotificationStore((s) => s.unreadCount);
  const navigate = useNavigate();
  const location = useLocation();
  const setActivePanel = useRightSidebarStore((s) => s.setActivePanel);
  const activePanel = useRightSidebarStore((s) => s.activePanel);

  return (
    <div className="flex flex-col h-full justify-between py-6">
      <ul className="space-y-2">
        {/* Home */}
        <li>
          <button
            type="button"
            className={`flex items-center space-x-4 p-3 rounded-full transition-colors hover:bg-gray-200 w-full ${
              activePanel === "DEFAULT" ? "font-bold bg-gray-100" : ""
            }`}
            onClick={() => {
              navigate("/");
              setActivePanel("DEFAULT");
            }}
          >
            <span className="text-xl">
              <FaHome />
            </span>
            <span>Home</span>
          </button>
        </li>
        {/* Explore */}
        <li>
          <button
            type="button"
            className={`flex items-center space-x-4 p-3 rounded-full transition-colors hover:bg-gray-200 w-full ${
              activePanel === "EXPLORE" ? "font-bold bg-gray-100" : ""
            }`}
            onClick={() => setActivePanel("EXPLORE")}
          >
            <span className="text-xl">
              <FaHashtag />
            </span>
            <span>Explore</span>
          </button>
        </li>
        {/* Notifications */}
        <li>
          <button
            type="button"
            className={`flex items-center space-x-4 p-3 rounded-full transition-colors hover:bg-gray-200 w-full ${
              activePanel === "NOTIFICATIONS" ? "font-bold bg-gray-100" : ""
            }`}
            onClick={() => setActivePanel("NOTIFICATIONS")}
          >
            <span className="text-xl relative">
              <FaBell />
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full px-2 py-0.5 font-bold">
                  {unreadCount}
                </span>
              )}
            </span>
            <span>Notifications</span>
          </button>
        </li>
        {/* Messages */}
        <li>
          <button
            type="button"
            className={`flex items-center space-x-4 p-3 rounded-full transition-colors hover:bg-gray-200 w-full ${
              activePanel === "MESSAGES" ? "font-bold bg-gray-100" : ""
            }`}
            onClick={() => setActivePanel("MESSAGES")}
          >
            <span className="text-xl">
              <FaEnvelope />
            </span>
            <span>Messages</span>
          </button>
        </li>
        {/* Profile */}
        <li>
          <button
            type="button"
            className={`flex items-center space-x-4 p-3 rounded-full transition-colors hover:bg-gray-200 w-full ${
              activePanel === "PROFILE" ? "font-bold bg-gray-100" : ""
            }`}
            onClick={() => setActivePanel("PROFILE")}
          >
            <span className="text-xl">
              <FaUser />
            </span>
            <span>Profile</span>
          </button>
        </li>
      </ul>
      <div className="mt-6">{user && <UserProfileMenu />}</div>
    </div>
  );
};

export default SidebarNav;
