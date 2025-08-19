// import React, { useCallback, useState } from 'react';
// // import { MainLayout } from '../components/layout/MainLayout';
// import SidebarNav from '../features/navigation/components/SidebarNav';
// import CreatePostForm from '../features/post/components/CreatePostForm';
// import PostCard from '../features/post/components/PostCard/PostCard';

// // Dummy data for demonstration
// const initialPosts = [
//   {
//     id: '1',
//     user: { name: 'Alice', avatar: '' },
//     content: 'Hello world!',
//     imageUrl: '',
//     createdAt: '1h ago',
//     likes: 10,
//     comments: 2,
//     shares: 1,
//   },
//   {
//     id: '2',
//     user: { name: 'Bob', avatar: '' },
//     content: 'This is a post.',
//     imageUrl: '',
//     createdAt: '2h ago',
//     likes: 5,
//     comments: 1,
//     shares: 0,
//   },
// ];

// export const FeedPage: React.FC = () => {
//   // In real app, replace with useFetchPosts()
//   const [posts, setPosts] = useState(initialPosts);

//   // Callback to trigger refetch (simulate for now)
//   const handlePostCreated = useCallback(() => {
//     // TODO: Replace with real fetch logic
//     // For demo, just log and keep posts unchanged
//     console.log('Post created, should refetch posts');
//     // Example: fetchPosts().then(setPosts)
//   }, []);

//   return (
//     <MainLayout
//       left={<SidebarNav />}
//       right={null}
//     >
//       <h1 className="text-2xl font-bold mb-4 py-6">Home</h1>
//       <CreatePostForm onPostCreated={handlePostCreated} />
//       <div className="space-y-4 mt-4">
//         {posts.map((post) => (
//           <PostCard key={post.id} post={post} onLike={() => {}} onComment={() => {}} />
//         ))}
//       </div>
//     </MainLayout>
//   );
// };

// export default FeedPage;
