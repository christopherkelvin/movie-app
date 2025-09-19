export interface Movie {
  genre_ids?: any;
  id: number;
  title: string;
  release_date?: string;
  genre?: string[] | string;
  rating?: number;
  popularity?: number;
  poster?: string;
  poster_path?: string;
  backdrop_path?: string;
}