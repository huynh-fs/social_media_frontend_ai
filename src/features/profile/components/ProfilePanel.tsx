

import { Button } from '@/components/common/Button';
import EditProfileModal from './EditProfileModal';
import { useAuthStore } from '../../../stores/authStore';
import React, { useEffect, useState } from 'react';
import { FaPen } from 'react-icons/fa';


const ProfilePanel: React.FC<{ userId?: string }> = ({ userId }) => {
	const [profile, setProfile] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const userauth = useAuthStore((s) => s.user);
	useEffect(() => {
		if (userauth) {
			setProfile(userauth);
		}
		setLoading(false);
	}, [userauth]);

	return (
		<div className="bg-white rounded-lg shadow p-4 mt-6">
			<div className='flex justify-between items-center mb-4'>
				<h2 className="text-lg font-bold mb-4">Profile  </h2>
				<Button
					variant='secondary'
					onClick={() => setIsEditModalOpen(true)}
				>
					<FaPen />
				</Button>
			</div>
			{loading ? (
				<div className="text-gray-500">Loading...</div>
			) : !profile ? (
				<div className="text-gray-500">User not found.</div>
			) : (
				<div className="flex flex-col items-center">
					<img src={profile.avatarUrl || "https://static.vecteezy.com/system/resources/previews/036/280/651/large_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"} alt={profile.username} className="w-20 h-20 rounded-full mb-2 object-cover" />
					<div className="font-semibold text-lg">{profile.username}</div>
					<div className="text-gray-500 text-sm mb-2">{profile.bio}</div>
					<div className="flex space-x-4 text-sm">
						<span><strong>{profile.followers.length}</strong> Followers</span>
						<span><strong>{profile.following.length}</strong> Following</span>
					</div>
				</div>
			)}
			<EditProfileModal
				isOpen={isEditModalOpen}
				onClose={() => setIsEditModalOpen(false)}
				onUpdated={() => {
					// Optionally refresh profile data here
				}}
			/>
		</div>
	);
};

export default ProfilePanel;
