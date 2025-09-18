"use client";
import { CiSearch } from "react-icons/ci";
import { CiBellOn } from "react-icons/ci";
import UserImage from "../../public/userImage.jpg";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export const Topbar = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (query.trim() === "") return;
    const handler = setTimeout(() => {
      router.push(`/movies?query=${encodeURIComponent(query.trim())}`);
    }, 400);
    return () => clearTimeout(handler);
  }, [query, router]);

  return (
    <div className="h-20 w-full border-b-2 border-white/10 flex items-center justify-end text-white font-bold gap-6 pr-4">
      <div className="relative flex">
        <input
          type="text"
          placeholder="Search ..."
          className="peer border-white/10 border-2 rounded-2xl py-2 pl-10 focus:outline-none max-sm:w-40"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
        <CiSearch
          className="absolute top-2 left-3 text-white peer-focus:hidden"
          size={25}
        />
      </div>
      <CiBellOn className="ml-6 max-sm:hidden" size={25} />
      <SignedOut>
        <SignInButton />
        <SignUpButton>
          <button className="bg-[#6c47ff] text-ceramic-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
            Sign Up
          </button>
        </SignUpButton>
      </SignedOut>
      <SignedIn>
        <div className="max-sm:hidden">
          <UserButton />
        </div>
        <div className="bg-[var(--highlight)] rounded-full p-2 cursor-pointer ">
          <SignOutButton />
        </div>
      </SignedIn>
    </div>
  );
};
