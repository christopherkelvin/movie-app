"use client";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useMovieSearch } from "@/hooks/useMovieSearch";
import { Movie as MovieType } from "@/types/movie";
import { MovieCard } from "@/components/movieCard";
export default function Movie() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query") || "";
  const { movies, isLoading, error } = useMovieSearch(searchQuery);
  console.log(movies);
  return (
    <div>
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
