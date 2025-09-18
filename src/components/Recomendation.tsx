import { Card } from "@/components/ui/card";
import { useRecommendations } from "@/hooks/useRecommendations";
import { useTwoMovies } from "@/hooks/getTwoMovies";
import { Error } from "./error";
export const Recomendation = () => {
  const { favoriteGenres } = useRecommendations();
  const { isLoading, error, result } = useTwoMovies(favoriteGenres);
  const baseUrl = "https://image.tmdb.org/t/p/w500";

  return (
    <div>
      {isLoading ? (
        <div />
      ) : error ? (
        <Error error={error} />
      ) : (
        <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-3 @5xl/main:grid-cols-5">
          {Object.values(result)
            .flat()
            .map((movie) => (
              <Card key={movie.id}>
                <img src={baseUrl+movie.poster_path} alt="" />
              </Card>
            ))}
        </div>
      )}
    </div>
  );
};
