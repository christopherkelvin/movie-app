"use client";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useMovieSearch } from "@/hooks/useMovieSearch";
import { Movie as MovieType } from "@/types/movie";
import { MovieCard } from "@/components/movieCard";
import { MovieFilters } from "@/types/movieFilters";
import { GENRES } from "@/config/genres";
import { Ratings } from "@/constants/ratings";
const YEARS = Array.from({ length: 30 }, (_, i) => `${2025 - i}`);
export default function Movie() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query") || "";

  const [filters, setFilters] = useState<MovieFilters>({});

  const { movies, isLoading, error } = useMovieSearch(searchQuery, filters);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      <div className="flex gap-4 mb-6">
        <label htmlFor="genre-select" className="sr-only">
          Genre
        </label>
        <select
          id="genre-select"
          name="genre"
          value={filters.genre || ""}
          onChange={handleFilterChange}
          className="border rounded px-2 py-1"
          aria-label="Genre"
        >
          {GENRES.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
        <label htmlFor="year-select" className="sr-only">
          Year
        </label>
        <select
          id="year-select"
          name="year"
          value={filters.year || ""}
          onChange={handleFilterChange}
          className="border rounded px-2 py-1"
          aria-label="Year"
        >
          <option value="">All Years</option>
          {YEARS.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
        <label htmlFor="rating-select" className="sr-only">
          Rating
        </label>
        <select
          id="rating-select"
          name="rating"
          value={filters.rating || ""}
          onChange={handleFilterChange}
          className="border rounded px-2 py-1"
          aria-label="Rating"
        >
          {Ratings.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>
      </div>
      {isLoading ? (
        <div>Loading... </div>
      ) : error ? (
        <div>Error...</div>
      ) : (
        <div>
          {searchQuery ? (
            <h2>Search results for "{searchQuery}"</h2>
          ) : (
            <div>Recent Movies</div>
          )}
          <div className="pt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {movies.map((movie: MovieType) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
