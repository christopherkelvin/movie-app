// src/components/MovieCard.tsx
import { genreMap } from "@/constants/genreMap";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaStar } from "react-icons/fa";
import { useWatchlistStore } from "@/store/watchlist";
const baseUrl = "https://image.tmdb.org/t/p/w500";

export const MovieCard = ({ movie }: { movie: any }) => {
    const { addToWatchlist, removeFromWatchlist, isInWatchlist } =
      useWatchlistStore();
      const inWatchlist = isInWatchlist(movie.id);
      const handleClick=()=>{
         if (inWatchlist) {
           removeFromWatchlist(movie.id);
         } else {
           addToWatchlist(movie);
         }
      }
  return (
    <Card className="relative hover:scale-[1.02] transition-transform cursor-pointer overflow-hidden bg-transparent">
      <FaStar
        className={`absolute z-10  top-2 right-4  rounded-full ${
          inWatchlist
            ? "text-yellow-400 hover:text-yellow-400"
            : "text-gray-400 hover:text-yellow-400"
        }`}
        onClick={handleClick}
        size={40}
      />
      <CardContent>
        <img
          src={`${baseUrl}${movie.poster_path}`}
          className="absolute top-0 left-0 w-full h-80 object-cover rounded-lg"
          alt={movie.title}
        />
      </CardContent>

      <div className="p-4 flex flex-col gap-2 mt-70">
        <CardHeader className="">
          <CardTitle className="text-muted-foreground text-center uppercase">
            {movie.title}
          </CardTitle>
        </CardHeader>

        <CardFooter className="flex justify-between text-xs text-gray-300">
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
        </CardFooter>

        <div className="flex flex-wrap gap-2 text-xs">
          {movie.genre_ids.slice(0, 3).map((id: number) => (
            <span
              key={id}
              className="bg-[var(--highlight)] px-2 py-1 rounded-full"
            >
              {genreMap[id] || "Unknown"}
            </span>
          ))}
        </div>

        <CardDescription className="line-clamp-3 text-sm ">
          {movie.overview || "No description available."}
        </CardDescription>
      </div>
    </Card>
  );
};
