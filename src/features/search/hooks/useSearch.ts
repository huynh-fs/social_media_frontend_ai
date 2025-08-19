import { useEffect, useState } from 'react';

export interface SearchResult {
  users: Array<{ _id: string; username: string; avatarUrl?: string }>;
  posts: Array<{ _id: string; content: string; user: { username: string; avatarUrl?: string } }>;
}

export function useSearch(query: string) {
  const [results, setResults] = useState<SearchResult>({ users: [], posts: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults({ users: [], posts: [] });
      return;
    }
    setLoading(true);
    fetch(`/api/search?q=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((data) => setResults(data))
      .catch(() => setResults({ users: [], posts: [] }))
      .finally(() => setLoading(false));
  }, [query]);

  return { results, loading };
}
