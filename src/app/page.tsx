"use client";

import { MoviesFilter } from "@/components/moviesFilter";
import { Trending } from "@/components/trending";



export default function Home() {
  

  return (
    <div>
     <Trending/>
     <MoviesFilter/>
    </div>
  );
}
