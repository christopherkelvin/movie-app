import { useState, useEffect } from "react";
import { IoIosTrendingUp } from "react-icons/io";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

import { useTrendingMovies } from "@/hooks/useTrendingMovies";
import { LoadingSpinner } from "@/components/loadingSpinner";
import ratingLogo from "../../public/RatingLogo.webp";

export const Trending = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const baseUrl = "https://image.tmdb.org/t/p/original";
  const { movies } = useTrendingMovies();

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? movies.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === movies.length - 1 ? 0 : prev + 1));
  };
// created an interval to change slide every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 10000);
    return () => clearInterval(interval);
  }, [movies]);

// created a loading spinner while movies are being fetched
  if (movies.length === 0)
    return (
      <div className="text-white">
        <LoadingSpinner />
      </div>
    );

  const currentMovie = movies[currentIndex];

  // pick 4 movies starting at currentIndex
  const thumbnails = [
    ...movies.slice(currentIndex, currentIndex + 4),
    ...movies.slice(0, Math.max(0, currentIndex + 4 - movies.length)),
  ];

  return (
    <div className="w-full relative overflow-hidden">
      <div className="relative h-[400px] w-full max-sm:h-auto">
        <img
          key={currentMovie.id}
          src={`${baseUrl}${currentMovie.backdrop_path}`}
          alt={currentMovie.title}
          className="h-full w-full object-cover transition-all duration-3000 ease-in-out opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/0" />
      </div>

      {/* Top Badge */}
      <div className="absolute top-4 left-10 text-white flex items-center gap-2 bg-[var(--highlight)] px-4 py-2 rounded-lg text-sm max-sm:text-xs max-sm:top-2 max-sm:left-2">
        <IoIosTrendingUp />
        Trending
      </div>

      <div
        key={currentMovie.id}
        className="absolute top-1/4 left-10 text-white flex flex-col gap-2 transition-all duration-1000 ease-in-out"
      >
        <div className="uppercase font-bold text-3xl max-sm:text-sm">
          {currentMovie.original_title}
        </div>
        <div className="flex items-center gap-4 text-sm max-sm:text-xs">
          <div className="flex gap-2">
            <img src={ratingLogo.src} alt="rating" className="h-5 w-8" />
            <div>{currentMovie.vote_average.toFixed(1)}</div>
          </div>
          <div>{currentMovie.original_language.toUpperCase()}</div>
        </div>
        <div className="mt-10 p-4 bg-[var(--highlight)] rounded-2xl w-28 text-center cursor-pointer hover:opacity-80 transition max-sm:mt-5 max-sm:w-20 max-sm:p-2 max-sm:text-sm">
          Watch
        </div>
      </div>

      <div className="absolute bottom-4 right-8 flex items-center gap-2 max-sm:hidden">
        <FaChevronLeft
          onClick={prevSlide}
          className="text-white cursor-pointer p-2 bg-[var(--highlight)] rounded-full h-8 w-8 z-10"
        />

        <div className="flex gap-2">
          {thumbnails.map((movie) => (
            <img
              key={movie.id}
              src={`${baseUrl}${movie.poster_path}`}
              alt={movie.title}
              className={`h-20 w-28 rounded-2xl object-cover cursor-pointer transition-transform duration-300 hover:scale-105 ${
                movie.id === currentMovie.id
                  ? "ring-2 ring-[var(--highlight)]"
                  : ""
              }`}
              onClick={() => setCurrentIndex(movies.indexOf(movie))}
            />
          ))}
        </div>

        <FaChevronRight
          onClick={nextSlide}
          className="text-white cursor-pointer p-2 bg-[var(--highlight)] rounded-full h-8 w-8 z-10"
        />
      </div>
    </div>
  );
};
