import {useQuery} from '@tanstack/react-query';
export  const useMovies = async (filter: string) => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const { data, isLoading, error } = useQuery({
    queryKey: ["movies", filter],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}movie/${filter}?api_key=${API_KEY}&language=en-US&page=1`
      );
      if (!res.ok) throw new Error("Failed to fetch movies");
      const json = await res.json();
      return json.results;
    },
  });
  return {
    movies: data || [],
    isLoading,
    error,
  };
};