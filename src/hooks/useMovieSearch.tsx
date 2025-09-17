import { Movie } from "@/types/movie";
import { MovieFilters } from "@/types/movieFilters";
import { useQuery } from "@tanstack/react-query";
export const useMovieSearch = async (query: string, filters: MovieFilters) => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

  const { genre, year, rating } = filters;

  const { data, isLoading, error } = useQuery({
    queryKey: ["movies", query, genre, year, rating],
    queryFn: async () => {
      let url = "";
      const params = [
        `api_key=${API_KEY}`,
        "language=en-US",
        query && query.trim() ? `query=${encodeURIComponent(query)}` : "",
        genre ? `with_genres=${genre}` : "",
        year ? `primary_release_year=${year}` : "",
        rating ? `vote_average.gte=${rating}` : "",
      ]
        .filter(Boolean)
        .join("&");

      if (query && query.trim()) {
        url = `${BASE_URL}search/movie?${params}`;
      } else {
        url = `${BASE_URL}discover/movie?${params}`;
      }

      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch movies");
      const json = await res.json();
      return json.results;
    },
  });

  return { movies: data || [], isLoading, error };
};
