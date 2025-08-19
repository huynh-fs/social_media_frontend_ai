import { useEffect, useState } from 'react';
import { SuggestionUser } from '../components/SuggestionItem';

export function useFollowSuggestions() {
  const [suggestions, setSuggestions] = useState<SuggestionUser[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('/api/users/suggestions')
      .then((res) => res.json())
      .then((data) => setSuggestions(data))
      .catch(() => setSuggestions([]))
      .finally(() => setLoading(false));
  }, []);

  const followUser = async (userId: string) => {
    await fetch(`/api/users/follow/${userId}`, { method: 'POST' });
    setSuggestions((prev) => prev.filter((u) => u._id !== userId));
  };

  return { suggestions, followUser, loading };
}
