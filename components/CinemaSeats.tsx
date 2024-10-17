"use client";

import { useState } from "react";

const CinemaSeats = ({
  seats,
  cinemaHall,
}: {
  seats: string[];
  cinemaHall: object;
}) => {
  const [bookedSeats, setBookedSeats] = useState([]);
  const availableSeats = new Set(
    seats.map((seat) => seat.replace(":Available", "")),
  );

  function handleSeatClick(rowIndex, seatIndex) {
    setBookedSeats((prev) => {
      const seatIndexInBooked = prev.findIndex(
        (seat) => seat.rowNumber === rowIndex && seat.seatNumber === seatIndex,
      );

      if (seatIndexInBooked !== -1) {
        return prev.filter((seat, index) => index !== seatIndexInBooked);
      } else {
        return [...prev, { rowNumber: rowIndex, seatNumber: seatIndex }];
      }
    });
  }

  function isSelected(rNumber, sNumber) {
    const seatIndexInBooked = bookedSeats.findIndex(
      (seat) => seat.rowNumber === rNumber && seat.seatNumber === sNumber,
    );

    return seatIndexInBooked !== -1;
  }

  const seatLayout = [];
  for (let row = 1; row <= cinemaHall.maxRowNumber; row++) {
    const seatRow = [];
    for (let seat = 1; seat <= cinemaHall.maxSeatNumber; seat++) {
      const seatCode = `R${row}:S${seat}`;
      seatRow.push({
        code: seatCode,
        isAvailable: availableSeats.has(seatCode),
      });
    }
    seatLayout.push(seatRow);
  }

  return (
    <div className="w-full overflow-x-auto">
      {JSON.stringify(bookedSeats, null, 2)}
      <h2 className="mb-4 text-center text-xl font-bold">{cinemaHall.name}</h2>
      <div className="flex flex-col items-center gap-2">
        {seatLayout.map((seatRow, rowIndex) => (
          <div className="flex w-full max-w-fit gap-2" key={rowIndex}>
            {seatRow.map(({ code, isAvailable }, seatIndex) =>
              !isAvailable ? (
                <div
                  key={code}
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500 transition-colors duration-200`}
                >
                  X
                </div>
              ) : (
                <div
                  key={code}
                  onClick={() => handleSeatClick(rowIndex + 1, seatIndex + 1)}
                  className={`h-5 w-5 shrink-0 rounded-full transition-colors duration-200 ${
                    !isSelected(rowIndex + 1, seatIndex + 1)
                      ? "bg-green-500"
                      : "bg-blue-500"
                  }`}
                  title={code}
                ></div>
              ),
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CinemaSeats;
