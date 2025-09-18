"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function Settings() {
  const router = useRouter();
  const user = useUser();

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    // if (confirmed) {
    //   signOut().then(() => {
    //     router.push("/"); // redirect to homepage or login page
    //   });
    // }
  };

  return (
    <div className="flex flex-col items-center mt-10 gap-6 text-white">
      <h1 className="text-2xl font-bold">Settings</h1>

      {/* Watchlist Link */}
      <Link href="/watchlist">
        <div className="bg-blue-600 hover:bg-blue-700">
          Go to Watchlist
        </div>
      </Link>

      {/* Logout Button */}
      <div onClick={handleLogout} className="bg-red-600 hover:bg-red-700">
        Logout
      </div>
    </div>
  );
}
