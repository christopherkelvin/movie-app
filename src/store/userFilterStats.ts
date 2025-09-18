import { create } from "zustand";
import { persist } from "zustand/middleware";

type Filter = {
  type: string;
  value: string;
  count: number;
};

type FilterStatsState = {
  filters: Filter[];
  trackFilter: (type: string, value: string) => void;
  resetFilters: () => void;
};

export const useFilterStats = create<FilterStatsState>()(
  persist(
    (set, get) => ({
      filters: [],
      trackFilter: (type, value) =>
        set((state) => {
          const existing = state.filters.find(
            (f) => f.type === type && f.value === value
          );

          if (existing) {
            return {
              filters: state.filters.map((f) =>
                f.type === type && f.value === value
                  ? { ...f, count: f.count + 1 }
                  : f
              ),
            };
          } else {
            return {
              filters: [...state.filters, { type, value, count: 1 }],
            };
          }
        }),
      resetFilters: () => set({ filters: [] }),
    }),
    {
      name: "filter-stats-storage",
    }
  )
);
