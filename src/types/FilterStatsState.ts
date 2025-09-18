type FilterStatsState = {
  filters: FilterEvent[];
  trackFilter: (type: string, value: string) => void;
  resetFilters: () => void;
};

type Filter = {
  type: string;
  value: string;
  count: number;
};
