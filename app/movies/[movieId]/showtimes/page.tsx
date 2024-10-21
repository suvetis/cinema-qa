import ShowTimeCard from "@/components/ShowTimeCard";

export default async function ShowTimesForMovie({
  params,
}: {
  params: { movieId: string };
}) {
  const movieId = params.movieId;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/movies/${movieId}/showtimes`,
  );
  const showtimes = await response.json();

  return (
    <div className="flex w-full flex-col flex-wrap gap-4 bg-gradient-to-t from-black via-[#180101] to-black p-3">
      {showtimes.length === 0 ? (
        <h1 className="flex justify-center text-white">No Showtimes</h1>
      ) : (
        showtimes.map((showtime) => (
          <ShowTimeCard key={showtime.id} showTimeInfo={showtime} />
        ))
      )}
    </div>
  );
}
