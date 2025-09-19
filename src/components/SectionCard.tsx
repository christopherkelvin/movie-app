"use client";

import { useRecommendations } from "@/hooks/useRecommendations";
import { useWatchlistStore } from "@/store/watchlist";
import { genreMap } from "@/constants/genreMap";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Filter = { type: string; value: string; count: number };

export function SectionCards() {
  const { watchlist } = useWatchlistStore();
  const { favoriteGenres } = useRecommendations();

  const topGenre: Filter | undefined = (favoriteGenres ?? []).reduce<
    Filter | undefined
  >((max, curr) => (curr.count > (max?.count ?? 0) ? curr : max), undefined);

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {/* Watchlist Card */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Watchlist Movies</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {watchlist?.length ?? 0}
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Favorite Genre Card */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Favourite Genre</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {topGenre ? genreMap[Number(topGenre.value)] : "N/A"}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">{topGenre?.count ?? 0} x Filtered</Badge>
          </CardAction>
        </CardHeader>
      </Card>
    </div>
  );
}
