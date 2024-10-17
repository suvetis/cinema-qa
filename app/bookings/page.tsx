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
    <div className="flex w-full justify-center">
      {bookings.length === 0 ? (
        <h1>No Bookings</h1>
      ) : (
        bookings.map((bkng: any) => <div>{bkng?.userId}</div>)
      )}
    </div>
  );
};

export default BookingsPage;
