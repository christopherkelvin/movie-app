import { useMovies } from "@/hooks/useMovies";
import { Movie } from "@/types/movie";
export const useTwoMovies = (genreStats: Filter[]) => {
  const { movies, isLoading, error } = useMovies("popular");

  const result: Record<string, Movie[]> = {};

  if (!isLoading && movies.length > 0) {
    genreStats.forEach((genre) => {
      const genreId = Number(genre.value);
      result[genre.value] = movies
        .filter((movie: Movie) => movie.genre_ids.includes(genreId))
        .slice(0, 2);
    });
  }

  return { result, isLoading, error };
};
