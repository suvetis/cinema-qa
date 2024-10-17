import { cn } from "@/lib/utils";
import React, { Suspense } from "react";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";

const MoviesList = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies`);
  const movies = await response.json();

  return (
    <ul>
      {movies.map((movie: any) => (
        <li
          key={movie.id}
          className="flex border border-gray-300 p-3 text-[16px] font-bold"
        >
          <Link href={`/movies/${movie.id}/showtimes`}>{movie.title}</Link>
        </li>
      ))}
    </ul>
  );
};

const Sidebar = ({ className = "" }) => {
  return (
    <div className={cn("", className)}>
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
