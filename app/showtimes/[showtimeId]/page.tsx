import BookingButtonWithDialog from "@/components/BookingButtonWithDialog";
import { formatDateTime } from "@/helpers/formats";
import { hasAuth } from "@/helpers/token";

export default async function ShowTimePage({
  params,
}: {
  params: { showtimeId: string };
}) {
  const showtimeId = params.showtimeId;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/showtimes/${showtimeId}`,
  );
  const showtime = await response.json();
  const auth = await hasAuth();
  const { movie, startTime, cinemaHall } = showtime;

  return (
    <div className="m-3 h-fit rounded-2xl border border-gray-300 bg-white p-3 shadow-md">
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
          <span className="font-semibold">Cinema Hall: </span>
          {cinemaHall.name}
        </p>
      </div>

      <p>
        <span className="font-semibold"> Rating: </span>
        {movie.rating}
      </p>
      <p>
        <span className="font-semibold">Showtime: </span>
        {formatDateTime(startTime)}
      </p>
      <p>
        <span className="font-semibold">Director: </span>
        {movie.director}
      </p>
      <p>
        <span className="font-semibold">Cast: </span> {movie.cast.join(", ")}
      </p>

      {auth && (
        <div className="w-full text-right">
          <BookingButtonWithDialog showtime={showtime} />
        </div>
      )}
    </div>
  );
}
