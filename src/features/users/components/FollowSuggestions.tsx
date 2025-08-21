import React from "react";
import SuggestionItem, { SuggestionUser } from "./SuggestionItem";
import { useFollowSuggestions } from "../hooks/useFollowSuggestions";

const FollowSuggestions: React.FC = () => {
  const { suggestions, handleFollowUser, loading } = useFollowSuggestions();

  return (
    <div className="bg-gray-100 rounded-lg p-4">
      <h3 className="font-semibold mb-3">Suggestions</h3>
      {loading && <div className="text-sm text-gray-500">Loading...</div>}
      <div className="space-y-2">
        {suggestions.map((user) => (
          <SuggestionItem
            key={user._id}
            user={user}
            onFollow={handleFollowUser}
          />
        ))}
      </div>
    </div>
  );
};

export default FollowSuggestions;
