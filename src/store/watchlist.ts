import { create } from "zustand";
import { persist } from "zustand/middleware";
import { WatchlistState } from "@/types/WatchlistState";

export const useWatchlistStore = create<WatchlistState>()(
  persist(
    (set, get) => ({
      watchlist: [],

      addToWatchlist: (movie) => {
        const exists = get().watchlist.some((m) => m.id === movie.id);
        if (!exists) {
          set((state) => ({
            watchlist: [...state.watchlist, movie],
          }));
        }
      },

      removeFromWatchlist: (id) => {
        set((state) => ({
          watchlist: state.watchlist.filter((m) => m.id !== id),
        }));
      },

      isInWatchlist: (id) => get().watchlist.some((m) => m.id === id),
    }),
    {
      name: "watchlist-storage", // key in localStorage
    }
  )
);
