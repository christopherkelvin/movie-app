import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import { useRecommendations } from "@/hooks/useRecommendations";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useWatchlistStore } from "@/store/watchlist";
import {genreMap} from "@/constants/genreMap"
export function SectionCards() {
    const {watchlist}=useWatchlistStore()
    const {favoriteGenres} = useRecommendations();
    const topGenre = favoriteGenres.reduce(
      (max, curr) => (curr.count > max.count ? curr : max),
      favoriteGenres[0]
    );
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card ">
        <CardHeader>
          <CardDescription>Total Watchlist Movies</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {watchlist.length}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card ">
        <CardHeader>
          <CardDescription>Favourite Genre</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {genreMap[Number(topGenre.value)]}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">{topGenre.count} x Filtered </Badge>
          </CardAction>
        </CardHeader>
      </Card>
    </div>
  );
}
