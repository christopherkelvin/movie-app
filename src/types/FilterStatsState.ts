type FilterStatsState = {
  filters: FilterEvent[];
  trackFilter: (type: string, value: string) => void;
  resetFilters: () => void;
};
