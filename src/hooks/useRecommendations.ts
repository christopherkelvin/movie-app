import { useFilterStats } from "@/store/userFilterStats";

export const useRecommendations = () => {
  const filters = useFilterStats((s) => s.filters);

  const topFilters = [...filters].sort((a, b) => b.count - a.count);

  return {
    favoriteGenres: topFilters.filter((f) => f.type === "genre").slice(0,3),
  };
};
