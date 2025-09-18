"use client";
import { LoadingSpinner } from "@/components/loadingSpinner";
import { useRecommendations } from "@/hooks/useRecommendations";
import { useMovies } from "@/hooks/useMovies";
import { useState } from "react";
import Link from "next/link";
import { SectionCards } from "@/components/SectionCard";
import { Recomendation } from "@/components/Recomendation";
import { genreMap } from "@/constants/genreMap";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
export default function Dashboard() {

  const { favoriteGenres } = useRecommendations();

  const {
    movies: recentMovies,
    isLoading: recLoading,
    error: recError,
  } = useMovies("now_playing");

  const [sortBy, setSortBy] = useState<"release_date" | "popularity">(
    "release_date"
  );

  const genreStats = favoriteGenres.map((f) => ({
    name: f.value,
    count: f.count,
  }));

  const sortedMovies = [...recentMovies].sort((a, b) =>
    sortBy === "release_date"
      ? new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
      : b.popularity - a.popularity
  );

  const latestFive = sortedMovies.slice(0, 5);

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards />
          <div className="pl-6 text-lg">Recomendations</div>
          <Recomendation />

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Your Favorite Genres</h2>
            {genreStats.length === 0 ? (
              <p>No data yet — start filtering movies!</p>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={genreStats}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <XAxis dataKey="name" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Tooltip />
                  <Bar dataKey="count" fill="#38bdf8" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Latest Movies</h2>

            <div className="flex gap-4 mb-4">
              <button
                className={`px-3 py-1 rounded ${
                  sortBy === "release_date" ? "bg-blue-500" : "bg-gray-700"
                }`}
                onClick={() => setSortBy("release_date")}
              >
                Sort by Release Date
              </button>
              <button
                className={`px-3 py-1 rounded ${
                  sortBy === "popularity" ? "bg-blue-500" : "bg-gray-700"
                }`}
                onClick={() => setSortBy("popularity")}
              >
                Sort by Popularity
              </button>
            </div>
            {recLoading && <LoadingSpinner />}
            {recError && <p className="text-red-500">Failed to load movies.</p>}

            <table className="w-full border border-gray-700 text-left text-sm">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-3 py-2">Title</th>
                  <th className="px-3 py-2">Release Date</th>
                  <th className="px-3 py-2">Popularity</th>
                </tr>
              </thead>
              <tbody>
                {latestFive.map((movie) => (
                  <tr key={movie.id} className="border-t border-gray-700">
                    <td className="px-3 py-2">{movie.title}</td>
                    <td className="px-3 py-2">{movie.release_date}</td>
                    <td className="px-3 py-2">{movie.popularity}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-4">
              <Link
                href="/movies"
                className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
              >
                View More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
