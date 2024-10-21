import Link from "next/link";
import React from "react";
import { hasAuth } from "@/helpers/token";
import BookingButtonWithDialog from "./BookingButtonWithDialog";

const ShowTimeCard = async ({ showTimeInfo }) => {
  const auth = await hasAuth();
  const { movie, cinemaHall, seats, id } = showTimeInfo;

  return (
    <div className="h-fit w-full rounded-2xl border border-gray-300 bg-white p-3 shadow-md">
      <div className="flex justify-between">
        <h2 className="pb-1 text-2xl font-bold">{movie.title}</h2>
        {auth && (
          <BookingButtonWithDialog showtime={{ cinemaHall, seats, id }} />
        )}
      </div>
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
          <span className="font-semibold">Cinema Hall: </span>
          {cinemaHall.name}
        </p>
      </div>

      <footer>
        <Link href={`/showtimes/${showTimeInfo.id}`}>
          <button className="mt-2 w-full rounded-lg border-2 border-black py-1 text-lg font-semibold shadow-md hover:bg-black hover:text-white">
            More Info...
          </button>
        </Link>
      </footer>
    </div>
  );
};

export default ShowTimeCard;
