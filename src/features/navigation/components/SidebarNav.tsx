import React from 'react';
import { useNotificationStore } from '../../../stores/notificationStore';
import { NavLink } from 'react-router-dom';
import { FaHome, FaHashtag, FaBell, FaEnvelope, FaUser } from 'react-icons/fa';
import { Button } from '../../../components/common/Button';
import { useAuthStore } from '../../../stores/authStore';
import UserProfileMenu from './UserProfileMenu';

const navItems = [
  { to: '/', label: 'Home', icon: <FaHome /> },
  { to: '/explore', label: 'Explore', icon: <FaHashtag /> },
  { to: '/notifications', label: 'Notifications', icon: <FaBell />, showBadge: true },
  { to: '/messages', label: 'Messages', icon: <FaEnvelope /> },
  { to: '/profile', label: 'Profile', icon: <FaUser /> },
];

export const SidebarNav: React.FC = () => {
  const { user } = useAuthStore();
  const unreadCount = useNotificationStore((s) => s.unreadCount);

  return (
    <div className="flex flex-col h-full justify-between py-6">
      <ul className="space-y-2">
        {navItems.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `flex items-center space-x-4 p-3 rounded-full transition-colors hover:bg-gray-200 ${isActive ? 'font-bold bg-gray-100' : ''}`
              }
            >
              <span className="text-xl relative">
                {item.icon}
                {item.showBadge && unreadCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full px-2 py-0.5 font-bold">
                    {unreadCount}
                  </span>
                )}
              </span>
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        {user && <UserProfileMenu />}
      </div>
    </div>
  );
};

export default SidebarNav;
