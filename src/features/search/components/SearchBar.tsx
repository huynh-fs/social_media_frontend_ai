import React, { useState, useRef } from 'react';
import { Input } from '../../../components/common/Input';
import { FaSearch } from 'react-icons/fa';
import { useDebounce } from '../hooks/useDebounce';
import { useSearch } from '../hooks/useSearch';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedQuery = useDebounce(query, 400);
  const { results, loading } = useSearch(debouncedQuery);

  return (
  <div className="relative border rounded-full h-12 flex items-center bg-white">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Search..."
        className="pl-10 pr-4 h-12 w-full border rounded-full focus:outline-none focus:ring-0 focus:border-transparent"
      />
      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        <FaSearch />
      </span>
      {isFocused && query && (
        <div className="absolute left-0 right-0 mt-2 bg-white border rounded-full shadow-lg z-10 min-h-12 flex flex-col justify-center">
          {loading ? (
            <div className="p-4 text-center text-gray-500">Loading...</div>
          ) : (
            <>
              {results.users.length > 0 && (
                <div className="p-2 border-b">
                  <div className="font-semibold text-xs text-gray-500 mb-1">Users</div>
                  {results.users.map((user) => (
                    <div key={user._id} className="flex items-center space-x-2 py-1">
                      <img src={user.avatarUrl || 'https://via.placeholder.com/32'} alt="avatar" className="w-6 h-6 rounded-full" />
                      <span>{user.username}</span>
                    </div>
                  ))}
                </div>
              )}
              {results.posts.length > 0 && (
                <div className="p-2">
                  <div className="font-semibold text-xs text-gray-500 mb-1">Posts</div>
                  {results.posts.map((post) => (
                    <div key={post._id} className="py-1">
                      <span className="font-medium">{post.user.username}</span>: {post.content}
                    </div>
                  ))}
                </div>
              )}
              {results.users.length === 0 && results.posts.length === 0 && (
                <div className="p-4 text-center text-gray-400">No results found</div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
