import { useTrendingMovies } from "@/hooks/useTrendingMovies";
import { FaAngleDown } from "react-icons/fa6";
import { useState } from "react";
import {genreMap} from "@/constants/genreMap";

export const MoviesFilter = () => {
  const { movies } = useTrendingMovies();
  const baseUrl = "https://image.tmdb.org/t/p/w500";

  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState("Popular");

  const filterOptions = ["Popular", "Top Rated", "Upcoming", "Now Playing"];

  const handleSelect = (option: string) => {
    setFilter(option);
    setIsOpen(false);
  };

  return (
    <div className="text-white p-10 max-sm:py-4 flex flex-col gap-4 relative">
      {/* Dropdown aligned right */}
      <div className="flex justify-end">
        <div
          className="relative w-40 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center justify-between py-3 px-6 border-2 border-white/20 rounded-lg">
            {filter}
            <FaAngleDown
              className={`transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-full bg-[var(--unhighlight)] rounded-lg shadow-lg z-20">
              {filterOptions.map((option) => (
                <div
                  key={option}
                  onClick={() => handleSelect(option)}
                  className={`px-4 py-2 hover:bg-[var(--highlight)] transition ${
                    option === filter ? "bg-[var(--highlight)]" : ""
                  }`}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Movies Grid */}
      <div className="pt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="relative bg-[var(--unhighlight)] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
          >
            {/* Poster */}
            <img
              src={`${baseUrl}${movie.poster_path}`}
              className="w-full h-72 object-cover"
              alt={movie.title}
            />

            {/* Info Section */}
            <div className="p-4 flex flex-col gap-2">
              {/* Title */}
              <div className="uppercase font-bold text-md truncate">
                {movie.title}
              </div>

              {/* Rating + Release Date */}
              <div className="flex justify-between items-center text-sm text-gray-300">
                <span>⭐ {movie.vote_average.toFixed(1)}</span>
                <span>
                  {movie.release_date
                    ? new Date(movie.release_date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "TBA"}
                </span>
              </div>

              {/* displaying genres */}
              <div className="flex flex-wrap gap-2 text-xs">
                {movie.genre_ids.slice(0, 3).map((id:number) => (
                  <span
                    key={id}
                    className="bg-[var(--highlight)] px-2 py-1 rounded-full"
                  >
                    {genreMap[id] || "Unknown"}
                  </span>
                ))}
              </div>

              {/* Overview */}
              <p className="text-xs text-gray-400 line-clamp-3">
                {movie.overview || "No description available."}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
