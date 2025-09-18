"use client";
import { useUser } from "@clerk/nextjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WatchListCard } from "@/components/watchlist";
import { LoadingSpinner } from "@/components/loadingSpinner";
import { useRecommendations } from "@/hooks/useRecommendations";
import { useMovies } from "@/hooks/useMovies";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";
import Link from "next/link";

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const { favoriteGenres } = useRecommendations();

  const {
    movies: recentMovies,
    isLoading: recLoading,
    error: recError,
  } = useMovies("now_playing");

  const [sortBy, setSortBy] = useState<"release_date" | "popularity">(
    "release_date"
  );

  if (!isLoaded)
    return (
      <p className="text-white">
        <LoadingSpinner />
      </p>
    );
  if (!user) return <p className="text-white">No user found</p>;

  const primaryEmail = user.emailAddresses.find(
    (email) => email.id === user.primaryEmailAddressId
  )?.emailAddress;

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
    <div className="flex flex-col items-center">
      <Card className="w-[90%] bg-transparent mt-10 flex flex-col p-6 gap-6 text-white">
        <div className="flex max-sm:flex-col text-start">
          <img
            src={user.imageUrl}
            className="h-40 w-40 rounded-full border border-gray-700"
            alt={user.firstName || "User"}
          />

          <CardContent className="flex flex-col justify-center">
            
              <CardTitle className="text-2xl font-bold uppercase">
                {user.firstName} {user.lastName}
              </CardTitle>
            

            <ul className="space-y-2">
              <li>
                <strong>Email:</strong> {primaryEmail}
              </li>
              <li>
                <strong>Last Sign In:</strong>{" "}
                {user.lastSignInAt
                  ? new Date(user.lastSignInAt).toLocaleString()
                  : "N/A"}
              </li>
            </ul>
          </CardContent>
        </div>

        
        <WatchListCard />

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

        {/* Latest Movies Section */}
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
            <Link href="/movies" className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">
              View More
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
