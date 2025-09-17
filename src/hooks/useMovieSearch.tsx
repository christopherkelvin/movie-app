import { Movie } from "@/types/movie";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
export const useMovieSearch = (query: string) => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const { data, isLoading, error } = useQuery({
    queryKey: ["movies", query],
    queryFn: async () => {
      let url = "";
      if (query && query.trim()) {
        url = `${BASE_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
          query
        )}`;
      } else {
        url = `${BASE_URL}movie/now_playing?api_key=${API_KEY}&language=en-US`;
      }
      console.log("Fetching URL:", url);
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch movies");
      const json = await res.json();
      return json.results;
    },
  });
  return { movies: data || [], isLoading, error };
};
