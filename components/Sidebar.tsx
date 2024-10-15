import { cn } from '@/lib/utils';
import React, { Suspense } from 'react';
import { Skeleton } from './ui/skeleton';
import Link from 'next/link';

const MoviesList = async () => {
  const response = await fetch('https://cinema.xdatagroup.dev/api/v1/cinema/movies');
  const movies = await response.json();

  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id} className="pt-2">
          <Link href={`/movies/${movie.id}/showtimes`}>{movie.title}</Link>
        </li>
      ))}
    </ul>
  );
};

const Sidebar = ({ className = '' }) => {
  return (
    <div className={cn('', className)}>
      <Suspense
        fallback={
          <div className="space-y-10 h-screen flex flex-col justify-center">
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
