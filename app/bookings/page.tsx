import { formatDateTime } from "@/helpers/formats";
import { hasAuth } from "@/helpers/token";
import { redirect } from "next/navigation";
import React from "react";

const BookingsPage = async () => {
  const accessToken = await hasAuth();

  if (!accessToken) {
    redirect("/");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/bookings`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch bookings");
  }

  const bookings = await response.json();

  return (
    <div className="flex w-full flex-col space-y-2 p-4 text-white">
      {bookings.length === 0 ? (
        <h1>No Bookings</h1>
      ) : (
        bookings.map((bkng) => (
          <div
            className="flex flex-col bg-white p-2 text-gray-800"
            key={bkng?.showtime.movie.id + bkng?.rowNumber + bkng?.seatNumber}
          >
            <p>
              <span className="font-semibold">Movie: </span>
              {bkng?.showtime.movie.title}
            </p>
            <p>
              <span className="font-semibold">Hall Name:</span>{" "}
              {bkng?.showtime.cinemaHall.name}
            </p>
            <p>
              <span className="font-semibold">Row: </span>
              {bkng?.rowNumber}
            </p>
            <p>
              <span className="font-semibold">Seat: </span>
              {bkng?.seatNumber}
            </p>
            <p>
              <span className="font-semibold">Start Time:</span>{" "}
              {formatDateTime(bkng?.showtime.startTime)}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default BookingsPage;
