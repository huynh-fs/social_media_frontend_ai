import React, { useState, ChangeEvent, FormEvent } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { useCreatePost } from '../hooks/useCreatePost';
import { useAuthStore } from '../../../stores/authStore';
import {Button} from '../../../components/common/Button';
import { FaPaperPlane } from 'react-icons/fa';

interface CreatePostFormProps {
  onPostCreated?: () => void;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({ onPostCreated }) => {
  const user = useAuthStore((state) => state.user);
  const { createPost, isLoading, error } = useCreatePost();

  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await createPost(content, imageFile || undefined);
    setContent('');
    setImageFile(null);
    setImagePreview(null);
    if (onPostCreated) {
      onPostCreated();
    }
  };

  const isPostDisabled = !content.trim() && !imageFile;

  // Hàm highlight hashtag
  const renderContentWithHashtags = (content: string) => {
    const parts = content.split(/(#[\w]+)/g);
    return parts.map((part, idx) => {
      if (/^#[\w]+$/.test(part)) {
        return (
          <span key={idx} className="text-blue-500 cursor-pointer hover:underline">{part}</span>
        );
      }
      return part;
    });
  };

  return (
    <div className="bg-white px-4 py-2 border-b">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="flex space-x-4">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            {user && 
              <img src={user.avatarUrl || 'https://static.vecteezy.com/system/resources/previews/036/280/651/large_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg'}
              alt={user.username} 
              className="w-full h-full object-cover" />
            }
          </div>
          {/* Textarea */}
          <div className="flex-1 relative">
            <TextareaAutosize
              className="w-full resize-none border-none focus:border-none focus:ring-0 text-lg placeholder-gray-500 outline-none bg-transparent z-10 relative text-transparent caret-blue-500"
              minRows={2}
              maxRows={6}
              placeholder="What's happening?"
              value={content}
              onChange={handleContentChange}
              disabled={isLoading}
            />
            {/* Hashtag preview */}
            {content && (
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none text-lg z-0 px-0 py-0 whitespace-pre-wrap">
                {renderContentWithHashtags(content)}
              </div>
            )}
          </div>
        </div>
        {/* Image Preview */}
        {imagePreview && (
          <div className="relative mt-2 w-fit">
            <img src={imagePreview} alt="Preview" className="max-h-48 rounded-lg border" />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-80"
              aria-label="Remove image"
            >
              ×
            </button>
          </div>
        )}
        {/* Actions */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center space-x-2">
            {/* Image upload icon */}
            <label className="cursor-pointer text-blue-600 hover:text-blue-800">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5V19a2 2 0 002 2h14a2 2 0 002-2v-2.5M16.5 12.5l-4.5 4.5-2.5-2.5M12 6v6m0 0l-2.5-2.5M12 12l2.5-2.5" />
              </svg>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
                disabled={isLoading}
              />
            </label>
          </div>
          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={isLoading}
            disabled={isPostDisabled || isLoading}
          >
            <FaPaperPlane />
          </Button>
        </div>
        {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default CreatePostForm;
