"use client";

import { useMemo, useRef, useState } from "react";
import * as actions from "@/actions";
import { Button } from "./ui/button";
import Spinner from "./Spinner";
import { DialogClose } from "./ui/dialog";
import { usePathname } from "next/navigation";

const CinemaSeats = ({
  showTimeId,
  seats,
  cinemaHall,
}: {
  showTimeId: string;
  seats: string[];
  cinemaHall: any;
}) => {
  const pathname = usePathname();
  const [bookedSeats, setBookedSeats] = useState([]);
  const [bookingErrorMessage, setBookingErrorMessage] = useState("");
  const [bookingSuccessMessage, setBookingSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const closeDialogRef = useRef<any>(null);

  const seatLayout = useMemo(() => {
    const availableSeats = new Set(
      seats.map((seat) => seat.replace(":Available", "")),
    );
    const layout = [] as any[];
    for (let row = 1; row <= cinemaHall?.maxRowNumber; row++) {
      const seatRow = [] as any[];
      for (let seat = 1; seat <= cinemaHall.maxSeatNumber; seat++) {
        const seatCode = `R${row}:S${seat}`;
        seatRow.push({
          code: seatCode,
          isAvailable: availableSeats.has(seatCode),
        });
      }
      layout.push(seatRow);
    }
    return layout;
  }, [cinemaHall.maxRowNumber, cinemaHall.maxSeatNumber, seats]);

  function handleSeatClick(rowIndex, seatIndex) {
    setBookedSeats((prev: any) => {
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
      (seat: any) => seat.rowNumber === rNumber && seat.seatNumber === sNumber,
    );

    return seatIndexInBooked !== -1;
  }

  const handleConfirm = async () => {
    try {
      setIsLoading(true);
      setBookingErrorMessage("");
      await actions.confirmBooking(
        {
          showtimeId: showTimeId,
          seats: bookedSeats,
        },
        pathname,
      );
      setBookingSuccessMessage("Booked successfully!");
      setTimeout(() => {
        closeDialogRef.current?.click();
      }, 900);
    } catch (error: any) {
      setBookingErrorMessage(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="w-full overflow-x-auto">
        <h2 className="mb-4 text-center text-xl font-bold">
          {cinemaHall.name}
        </h2>
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
      <p className="text-center text-red-500">{bookingErrorMessage}</p>
      <p className="text-center text-green-500">{bookingSuccessMessage}</p>
      <Button onClick={handleConfirm}>
        {isLoading ? <Spinner /> : "Confirm"}
      </Button>
      <DialogClose ref={closeDialogRef} className="invisible absolute" asChild>
        <Button type="button" variant="secondary">
          Close
        </Button>
      </DialogClose>
    </>
  );
};

export default CinemaSeats;
