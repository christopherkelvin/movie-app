
import { useWatchlistStore } from "@/store/watchlist";
export const WatchListCard = () => {
const { watchlist } = useWatchlistStore();
const baseUrl = "https://image.tmdb.org/t/p/w500";
return (
  <div className="m-4">
    <h2 className="text-lg font-bold">Watchlist</h2>
    <div>
      {watchlist.length === 0 ? (
        <p>No movies in watchlist yet.</p>
      ) : (
        <div className="space-x-4 grid grid-cols-3 md:grid-cols-6 lg:grid-cols-7 overflow-x-auto overflow-y-hidden scroll-smooth">
          {watchlist.map((movie) => (
            <img src={baseUrl + movie.poster_path} className="h-60" alt="" />
          ))}
        </div>
      )}
    </div>
  </div>
);
};
