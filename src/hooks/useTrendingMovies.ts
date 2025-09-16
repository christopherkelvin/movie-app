import { useEffect, useState } from "react";

export const useTrendingMovies = () => {
      const [movies, setMovies] = useState<any[]>([]);
      useEffect(() => {
        const fetchMovies = async () => {
          try {
            const res = await fetch(
              "https://api.themoviedb.org/3/trending/movie/day?api_key=9a4dcb9cc7ded31ee264c387ceadd6a8"
            );
            const data = await res.json();
            setMovies(data.results || data);
          } catch (err) {
            console.error(err);
          }
        };
        fetchMovies();
      }, []);
      return { movies, setMovies };
}