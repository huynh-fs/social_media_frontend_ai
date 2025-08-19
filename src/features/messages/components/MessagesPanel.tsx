import React, { useEffect, useState } from 'react';

// Dummy API fetch function (replace with real API call)
const fetchMessages = async () => {
	await new Promise((r) => setTimeout(r, 500));
	return [
		{ id: '1', user: 'Alice', text: 'Hey, how are you?', createdAt: '2m ago' },
		{ id: '2', user: 'Bob', text: 'Let’s catch up soon!', createdAt: '10m ago' },
		{ id: '3', user: 'Charlie', text: 'Check out my new post!', createdAt: '1h ago' },
	];
};

const MessagesPanel: React.FC = () => {
	const [messages, setMessages] = useState<Array<{ id: string; user: string; text: string; createdAt: string }>>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchMessages().then((data) => {
			setMessages(data);
			setLoading(false);
		});
	}, []);

	return (
		<div className="bg-white rounded-lg shadow p-4 mt-6">
			<h2 className="text-lg font-bold mb-4">Messages</h2>
			{loading ? (
				<div className="text-gray-500">Loading...</div>
			) : messages.length === 0 ? (
				<div className="text-gray-500">No messages yet.</div>
			) : (
				<ul className="space-y-3">
					{messages.map((msg) => (
						<li key={msg.id} className="border-b pb-2 last:border-b-0">
							<div className="text-sm">
								<span className="font-semibold mr-2">{msg.user}:</span>
								{msg.text}
							</div>
							<div className="text-xs text-gray-400 mt-1">{msg.createdAt}</div>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default MessagesPanel;
