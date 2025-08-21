import { useEffect, useState } from "react";
import { SuggestionUser } from "../components/SuggestionItem";
import { fetchFollowSuggestions, followUser } from "@/api/userService";

export function useFollowSuggestions() {
  const [suggestions, setSuggestions] = useState<SuggestionUser[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchFollowSuggestions()
      .then((data) => setSuggestions(data))
      .catch(() => setSuggestions([]))
      .finally(() => setLoading(false));
  }, []);

  const handleFollowUser = async (userId: string) => {
    await followUser(userId);
    setSuggestions((prev) => prev.filter((u) => u._id !== userId));
  };

  return { suggestions, handleFollowUser, loading };
}
