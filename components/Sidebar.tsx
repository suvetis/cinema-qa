import { cn } from "@/lib/utils";
import React, { Suspense } from "react";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";

const MoviesList = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies`);

  const movies = await response.json();

  return (
    <ul>
      {movies.map((movie) => (
        <Link key={movie.id} href={`/movies/${movie.id}/showtimes`}>
          <li className="flex border border-gray-300 p-3 text-[16px] font-bold hover:bg-[#f4f4f5]">
            {movie.title}
          </li>
        </Link>
      ))}
    </ul>
  );
};

const Sidebar = ({ className = "" }) => {
  return (
    <div className={cn("overflow-y-scroll bg-white", className)}>
      <Suspense
        fallback={
          <div className="flex h-screen flex-col justify-center space-y-10">
            <Skeleton className="h-4" />
            <Skeleton className="h-4" />
            <Skeleton className="h-4" />
            <Skeleton className="h-4" />
            <Skeleton className="h-4" />
          </div>
        }
      >
        <MoviesList />
      </Suspense>
    </div>
  );
};

export default Sidebar;
