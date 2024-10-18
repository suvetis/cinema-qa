import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import CinemaSeats from "./CinemaSeats";

const ShowTimeCard = ({ showTimeInfo, auth }: any) => {
  const { movie, startTime, cinemaHall, seats, id } = showTimeInfo;

  return (
    <div className="h-fit w-full rounded-2xl border border-gray-300 bg-white p-3 shadow-md">
      <div className="flex justify-between">
        <h2 className="pb-1 text-2xl font-bold">{movie.title}</h2>
        {auth && (
          <Dialog>
            <DialogTrigger asChild>
              <Button>Book Seats</Button>
            </DialogTrigger>
            <DialogContent className="max-w-fit">
              <DialogHeader>
                <DialogTitle>Book seats</DialogTitle>
                <DialogDescription>
                  Select seats and then click book to confirm your booking.
                </DialogDescription>
              </DialogHeader>
              <CinemaSeats
                showTimeId={id}
                cinemaHall={cinemaHall}
                seats={seats}
              />
            </DialogContent>
          </Dialog>
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
      <footer className="text-right">
        <Link href={`/showtimes/${showTimeInfo.id}`}>
          <button className="mt-5 w-full rounded-lg border-2 border-black py-1 text-lg font-semibold shadow-md hover:bg-black hover:text-white">
            More Info...
          </button>
        </Link>
      </footer>
    </div>
  );
};

export default ShowTimeCard;
