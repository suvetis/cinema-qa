import Link from 'next/link';
import React from 'react';

const ShowTimeCard = ({ showTimeInfo }: any) => {
  const { movie, startTime, cinemaHall } = showTimeInfo;

  return (
    <Link href={`/showtimes/${showTimeInfo.id}`}>
      <div className="max-w-xs bg-white rounded-lg shadow-md">
        <div className="bg-gray-100 p-4">
          <p className="text-gray-600">
            Showtime: <span className="font-semibold">{new Date(startTime).toLocaleString()}</span>
          </p>
          <p className="text-gray-600">
            Cinema Hall: <span className="font-semibold">{cinemaHall.name}</span>
          </p>
        </div>

        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-800">{movie.title}</h2>
          <p className="text-gray-600">
            Genre: <span className="font-semibold">{movie.genre}</span>
          </p>
          <p className="text-gray-600">
            Duration: <span className="font-semibold">{movie.duration} minutes</span>
          </p>
          <p className="text-gray-600">
            Rating: <span className="font-semibold">{movie.rating}</span>
          </p>
          <p className="mt-2 text-gray-700">Description: {movie.description}</p>
          <p className="mt-2 text-gray-600">
            Director: <span className="font-semibold">{movie.director}</span>
          </p>
          <p className="mt-2 text-gray-600">
            Cast:
            <span className="font-semibold">{movie.cast.join(', ')}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ShowTimeCard;
