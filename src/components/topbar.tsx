"use client";
import { CiSearch } from "react-icons/ci";
import { CiBellOn } from "react-icons/ci";
import UserImage from "../../public/userImage.jpg";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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
          placeholder="Search everything"
          className="peer border-white/10 border-2 rounded-2xl py-2 pl-10 focus:outline-none"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
        <CiSearch
          className="absolute top-2 left-3 text-white peer-focus:hidden"
          size={25}
        />
      </div>
      <CiBellOn className="ml-6 max-sm:hidden" size={25} />
      <div>
        <img
          src={UserImage.src}
          alt=""
          className="h-10 w-10 rounded-full max-sm:hidden"
        />
      </div>
    </div>
  );
};
