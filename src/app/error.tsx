"use client";

import { useEffect } from "react";
import ErrorGif from "../../public/Error animation.json";
import Lottie from "lottie-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
   
    console.error(error);
  }, [error]);
  return (
    <div className="flex flex-col items-center justify-center h-full text-white">
      <Lottie
        animationData={ErrorGif}
        loop={true}
        style={{ width: 150, margin: "0 auto" }}
      />
      <h1 className="text-2xl font-bold mb-4">Something went wrong!</h1>
      <p className="mb-4">Please try refreshing the page or come back later.</p>
      <div
        className="bg-[var(--highlight)] py-3 px-6 rounded-lg cursor-pointer hover:bg-[var(--unhighlight)] transition"
        onClick={() => reset()}
      >
        Try again
      </div>
    </div>
  );
}
