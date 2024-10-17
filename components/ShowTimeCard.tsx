import Link from "next/link";
import React from "react";

const ShowTimeCard = ({ showTimeInfo }: any) => {
  const { movie, startTime, cinemaHall } = showTimeInfo;

  return (
    <Link href={`/showtimes/${showTimeInfo.id}`}>
      <div className="rounded-2xl border border-gray-300 bg-white px-3 py-3 shadow-md">
        <h2 className="pb-1 text-2xl font-bold">{movie.title}</h2>
        <p> {movie.description}</p>

        <div className="py-2">
          <p>
            <span className="font-semibold">Genre: </span> {movie.genre}
          </p>
          <p>
            <span className="font-semibold"> Duration: </span>
            {movie.duration} minutes
          </p>
          <p>
            <span className="font-semibold"> Rating: </span>
            {movie.rating}
          </p>
        </div>

        <p>
          <span className="font-semibold">Cinema Hall: </span>
          {cinemaHall.name}
        </p>
        <p>
          <span className="font-semibold">Showtime: </span>
          {new Date(startTime).toLocaleString()}
        </p>

        <p>
          <span className="font-semibold">Director: </span>
          {movie.director}
        </p>
        <p>
          <span className="font-semibold">Cast: </span> {movie.cast.join(", ")}
        </p>
      </div>
    </Link>
  );
};

export default ShowTimeCard;
