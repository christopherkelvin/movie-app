import { useState } from "react";
import { useMovies } from "@/hooks/useMovies";
import { FaAngleDown } from "react-icons/fa6";
import { MovieCard } from "@/components/movieCard";
import { LoadingSpinner } from "./loadingSpinner";
import { filterOptions } from "@/constants/filterOptions";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
          <Select value={filter} onValueChange={(val) => setFilter(val)}>
            <SelectTrigger>
              {filterOptions.find((option) => option.value === filter)?.label ||
                "Select..."}
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Filters</SelectLabel>
                {filterOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className={`px-4 py-2 hover:bg-[var(--highlight)] transition ${
                      option.value === filter ? "bg-[var(--highlight)]" : ""
                    }`}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="pt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {isLoading ? (
          <div className="col-span-full text-center">
            <LoadingSpinner />
          </div>
        ) : (
          movies.map((movie: any) => <MovieCard key={movie.id} movie={movie} />)
        )}
      </div>
    </div>
  );
};
