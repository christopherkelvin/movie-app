// src/components/MovieCard.tsx
import { genreMap } from "@/constants/genreMap";

const baseUrl = "https://image.tmdb.org/t/p/w500";

export const MovieCard = ({ movie }: { movie: any }) => {
  return (
    <div className="relative bg-[var(--unhighlight)] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
      <img
        src={`${baseUrl}${movie.poster_path}`}
        className="w-full h-72 object-cover"
        alt={movie.title}
      />

      <div className="p-4 flex flex-col gap-2">
        <div className="uppercase font-bold text-md truncate">
          {movie.title}
        </div>

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

        <p className="text-xs text-gray-400 line-clamp-3">
          {movie.overview || "No description available."}
        </p>
      </div>
    </div>
  );
};
