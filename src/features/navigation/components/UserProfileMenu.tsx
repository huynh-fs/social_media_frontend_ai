import React from 'react';
import { Menu } from '@headlessui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../stores/authStore';

const UserInfo: React.FC<{ user: { username: string; avatarUrl?: string } }> = ({ user }) => (
  <div className="flex items-center space-x-3">
    <img
      src={user.avatarUrl || 'https://static.vecteezy.com/system/resources/previews/036/280/651/large_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg'}
      alt="avatar"
      className="w-10 h-10 rounded-full object-cover"
    />
    <span className="font-semibold">{user.username}</span>
  </div>    
);

const UserProfileMenu: React.FC = () => {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="w-full cursor-pointer hover:bg-gray-200 rounded-full p-2 flex items-center justify-between">
        <UserInfo user={user} />
      </Menu.Button>
      <Menu.Items className="absolute bottom-full mb-2 right-0 bg-white rounded-md shadow-lg border z-50 min-w-[180px]">
        <div className="py-2">
          <Menu.Item>
            {({ active }) => (
              <Link
                to={`/profile/${user._id}`}
                className={`block px-4 py-2 text-gray-700 rounded-md transition-colors ${active ? 'ui-active:bg-gray-100 bg-gray-100 font-semibold' : ''}`}
              >
                Profile
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
                className={`block w-full text-left px-4 py-2 text-gray-700 rounded-md transition-colors ${active ? 'ui-active:bg-gray-100 bg-gray-100 font-semibold' : ''}`}
              >
                Log out
              </button>
            )}
          </Menu.Item>
        </div>
      </Menu.Items>
    </Menu>
  );
};

export default UserProfileMenu;
