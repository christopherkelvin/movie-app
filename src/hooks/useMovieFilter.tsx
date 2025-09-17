"use client";

import { useMemo, useState } from "react";
import { Movie } from "@/types/movie";

export function useMovieFilters(
  movies: Movie[],
  query: string,
  pageSize: number
) {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("release_desc");
  const [page, setPage] = useState(1);

  const genres = useMemo(
    () => [
      "All",
      ...Array.from(
        new Set(
          movies.flatMap((m) =>
            m.genre ? (Array.isArray(m.genre) ? m.genre : [m.genre]) : []
          )
        )
      ),
    ],
    [movies]
  );
  const years = useMemo(
    () => [
      "All",
      ...Array.from(
        new Set(
          movies.map((m) =>
            m.release_date
              ? new Date(m.release_date).getFullYear().toString()
              : ""
          )
        )
      ),
    ],
    [movies]
  );

  const filtered = useMemo(() => {
    return movies
      .filter(
        (m) => !query || m.title.toLowerCase().includes(query.toLowerCase())
      )
      .filter(
        (m) =>
          selectedGenre === "All" ||
          (Array.isArray(m.genre)
            ? m.genre.includes(selectedGenre)
            : m.genre === selectedGenre)
      )
      .filter(
        (m) =>
          selectedYear === "All" ||
          (m.release_date &&
            new Date(m.release_date).getFullYear().toString() === selectedYear)
      )
      .filter((m) => (m.rating ?? 0) >= minRating)
      .sort((a, b) => {
        switch (sortBy) {
          case "release_asc":
            return (
              new Date(a.release_date ?? "").getTime() -
              new Date(b.release_date ?? "").getTime()
            );
          case "release_desc":
            return (
              new Date(b.release_date ?? "").getTime() -
              new Date(a.release_date ?? "").getTime()
            );
          case "rating_asc":
            return (a.rating ?? 0) - (b.rating ?? 0);
          case "rating_desc":
            return (b.rating ?? 0) - (a.rating ?? 0);
          case "pop_asc":
            return (a.popularity ?? 0) - (b.popularity ?? 0);
          case "pop_desc":
            return (b.popularity ?? 0) - (a.popularity ?? 0);
          default:
            return 0;
        }
      });
  }, [movies, query, selectedGenre, selectedYear, minRating, sortBy]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  function resetFilters() {
    setSelectedGenre("All");
    setSelectedYear("All");
    setMinRating(0);
    setSortBy("release_desc");
    setPage(1);
  }

  return {
    genres,
    years,
    filtered,
    sortBy,
    setSortBy,
    selectedGenre,
    setSelectedGenre,
    selectedYear,
    setSelectedYear,
    minRating,
    setMinRating,
    page,
    setPage,
    paged,
    total,
    totalPages,
    resetFilters,
  };
}
