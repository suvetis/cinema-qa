import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import CinemaSeats from "./CinemaSeats";

const BookingButtonWithDialog = ({ showtime }) => {
  const { cinemaHall, seats, id } = showtime;

  return (
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
        <CinemaSeats showTimeId={id} cinemaHall={cinemaHall} seats={seats} />
      </DialogContent>
    </Dialog>
  );
};

export default BookingButtonWithDialog;
