import React, { useState, useRef } from "react";
import { Input } from "../../../components/common/Input";
import { FaSearch } from "react-icons/fa";
import { useDebounce } from "../hooks/useDebounce";
import { useSearch } from "../hooks/useSearch";
import { useNavigate } from "react-router-dom";
import { useFeedStore } from "../../../stores/feedStore";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedQuery = useDebounce(query, 400);
  const { results, loading } = useSearch(debouncedQuery);
  const navigate = useNavigate();
  const feedStore = useFeedStore;

  // Reset search state
  const resetSearch = () => {
    setQuery("");
    setIsFocused(false);
    // Nếu cần reset kết quả, có thể thêm logic ở đây
  };

  // Xử lý click vào user
  const handleUserClick = (userId: string) => {
    navigate(`/profile/${userId}`);
    // resetSearch();
  };

  // Xử lý click vào post
  const handlePostClick = (post: any) => {
    feedStore.getState().prependPost(post);
    navigate(`/`);
    // resetSearch();
  };

  return (
    <div className="relative border rounded-full h-12 flex items-center bg-white">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Search..."
        className="pl-5 pr-4 h-12 w-full border rounded-full focus:outline-none focus:ring-0 focus:border-transparent"
      />
      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        <FaSearch />
      </span>
      {isFocused && query && (
        <div className="absolute left-0 right-0 top-full w-full bg-white border rounded-xl shadow-lg z-10 min-h-36 max-h-80 overflow-y-auto flex flex-col">
          {loading ? (
            <div className="p-4 text-center text-gray-500">Loading...</div>
          ) : (
            <>
              {results.users.length > 0 && (
                <div className="p-2 border-b">
                  <div className="font-semibold text-xs text-gray-500 mb-1">
                    Users
                  </div>
                  {results.users.map((user) => (
                    <div
                      key={user._id}
                      className="flex items-center space-x-2 py-1 cursor-pointer hover:bg-gray-100 rounded"
                      onMouseDown={() => handleUserClick(user._id)}
                    >
                      <img
                        src={
                          user.avatarUrl ||
                          "https://static.vecteezy.com/system/resources/previews/036/280/651/large_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
                        }
                        alt="avatar"
                        className="w-6 h-6 rounded-full"
                      />
                      <span>{user.username}</span>
                    </div>
                  ))}
                </div>
              )}
              {results.posts.length > 0 && (
                <div className="p-2">
                  <div className="font-semibold text-xs text-gray-500 mb-1">
                    Posts
                  </div>
                  {results.posts.map((post) => (
                    <div
                      key={post._id}
                      className="py-1 cursor-pointer hover:bg-gray-100 rounded"
                      onMouseDown={() => handlePostClick(post)}
                    >
                      <div className="flex items-center space-x-2 py-1">
                        <img
                          src={
                            post.user.avatarUrl ||
                            "https://static.vecteezy.com/system/resources/previews/036/280/651/large_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
                          }
                          alt="avatar"
                          className="w-6 h-6 rounded-full"
                        />
                        <span>{post.user.username}</span>
                      </div>
                      {post.content.substring(0, 24)}...
                    </div>
                  ))}
                </div>
              )}
              {results.users.length === 0 && results.posts.length === 0 && (
                <div className="p-4 text-center text-gray-400">
                  No results found
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
