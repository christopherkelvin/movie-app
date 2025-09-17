"use client"
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useMovieSearch } from "@/hooks/useMovieSearch";
import { Movie as MovieType } from "@/types/movie";
import { MovieCard } from "@/components/movieCard";
import { MovieFilters } from "@/types/movieFilters";
import { GENRES } from "@/config/genres";
import { Ratings } from "@/constants/ratings";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";

const YEARS = Array.from({ length: 30 }, (_, i) => `${2025 - i}`);

export default function Movie() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query") || "";

  const [filters, setFilters] = useState<MovieFilters>({});

  const { movies, isLoading, error } = useMovieSearch(searchQuery, filters);

  return (
    <div>
      <div className="flex gap-4 mb-6">
        {/* Genre Filter */}
        <Select
          value={filters.genre || "all"}
          onValueChange={(val) =>
            setFilters((prev) => ({
              ...prev,
              genre: val === "all" ? undefined : val,
            }))
          }
        >
          <SelectTrigger className="border rounded px-2 py-1 w-[180px]">
            <SelectValue placeholder="All Genres" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Genres</SelectLabel>
              <SelectItem value="all">All Genres</SelectItem>
              {GENRES.map((genre, i) => (
                <SelectItem key={i} value={genre.id}>
                  {genre.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          value={filters.year || "all"}
          onValueChange={(val) =>
            setFilters((prev) => ({
              ...prev,
              year: val === "all" ? undefined : val,
            }))
          }
        >
          <SelectTrigger className="border rounded px-2 py-1 w-[140px]">
            <SelectValue placeholder="All Years" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Year</SelectLabel>
              <SelectItem value="all">All Years</SelectItem>
              {YEARS.map((y) => (
                <SelectItem key={y} value={y}>
                  {y}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          value={filters.rating || "all"}
          onValueChange={(val) =>
            setFilters((prev) => ({
              ...prev,
              rating: val === "all" ? undefined : val,
            }))
          }
        >
          <SelectTrigger className="border rounded px-2 py-1 w-[140px]">
            <SelectValue placeholder="All Ratings" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Rating</SelectLabel>
              <SelectItem value="all">All Ratings</SelectItem>
              {Ratings.map((rate, i) => (
                <SelectItem key={i} value={rate.label}>
                  {rate.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
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
