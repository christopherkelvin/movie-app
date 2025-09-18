"use client"
import { useWatchlistStore } from "@/store/watchlist";
import { MovieCard } from "@/components/movieCard";
export default function Watchlist() {
    const { watchlist } = useWatchlistStore();
  return (
    <div className="p-8">
      <div className=" uppercase text-2xl text-center pb-4 font-serif">Watchlist</div>
      <div>
        {watchlist.length === 0 ? (
          <p>No movies in watchlist yet.</p>
        ) : (
          <div className="space-x-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 overflow-x-auto overflow-y-hidden scroll-smooth">
            {watchlist.map((movie) => (
              <MovieCard movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
