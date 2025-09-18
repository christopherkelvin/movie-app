"use client";
import { useUser } from "@clerk/nextjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WatchListCard } from "@/components/watchlist";
import { LoadingSpinner } from "@/components/loadingSpinner";

export default function Dashboard() {
  const { user, isLoaded } = useUser();

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

  return (
    <div className="flex flex-col items-center">
      <Card className="w-auto bg-transparent mt-10 flex flex-col p-6 gap-6 text-white">
        <div className="flex">
          <img
            src={user.imageUrl}
            className="h-40 w-40 rounded-full border border-gray-700"
            alt={user.firstName || "User"}
          />

          <CardContent className="flex flex-col justify-center">
            <CardHeader>
              <CardTitle className="text-2xl font-bold uppercase">
                {user.firstName} {user.lastName}
              </CardTitle>
            </CardHeader>

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
      </Card>
      
    </div>
  );
}
