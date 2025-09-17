import { useEffect, useState } from "react";

export const useTrendingMovies = () => {
  const api_key = process.env.NEXT_PUBLIC_API_KEY;
  const base_url = process.env.NEXT_PUBLIC_BASE_URL;
  const url = `${base_url}movie/day?api_key=${api_key}`;

  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState<any[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        if (!data.results || !Array.isArray(data.results)) {
          throw new Error("Invalid API response");
        }

        setMovies(data.results);
      } catch (err) {
        setMovies([]);
        setError(err as Error);
        console.error("Error fetching trending movies:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, [url]);

  return { movies, isLoading, error };
};
