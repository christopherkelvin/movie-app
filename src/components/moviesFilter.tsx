import { useState } from "react";
import { useMovies } from "@/hooks/useMovies";
import { FaAngleDown } from "react-icons/fa6";
import { MovieCard } from "@/components/movieCard";
import { LoadingSpinner } from "./loadingSpinner";
import { filterOptions } from "@/constants/filterOptions";

export const MoviesFilter = () => {
  const [filter, setFilter] = useState("popular");
  const [isOpen, setIsOpen] = useState(false);

  const { movies, isLoading } = useMovies(filter);
  return (
    <div className="text-white p-10 max-sm:py-4 flex flex-col gap-4 relative">
      <div className="flex justify-end">
        <div
          className="relative w-40 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center justify-between py-3 px-6 border-2 border-white/20 rounded-lg">
            {filterOptions.find((f) => f.value === filter)?.label}
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
                  key={option.value}
                  onClick={() => {
                    setFilter(option.value);
                    setIsOpen(false);
                  }}
                  className={`px-4 py-2 hover:bg-[var(--highlight)] transition ${
                    option.value === filter ? "bg-[var(--highlight)]" : ""
                  }`}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="pt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {isLoading ? (
          <div className="col-span-full text-center"><LoadingSpinner/></div>
        ) : (
          movies.map((movie:any) => <MovieCard key={movie.id} movie={movie} />)
        )}
      </div>
    </div>
  );
};
