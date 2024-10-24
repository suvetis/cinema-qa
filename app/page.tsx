import ShowTimeCard from "@/components/ShowTimeCard";

export const revalidate = 0;

export default async function Home({
  searchParams,
}: {
  searchParams: { hall: string };
}) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/showtimes`, { cache: 'no-store', next: { revalidate: 0 } });
  const showtimes = await response.json();
  console.log("Showtimes", JSON.stringify(showtimes, null, 2))
  const filteredShowtimes = !searchParams.hall
    ? showtimes
    : showtimes.filter(
        (shwtm) => shwtm.cinemaHall.id === Number(searchParams.hall),
      );

  return (
    <div className="flex w-full flex-col gap-3 bg-gradient-to-t from-black via-[#180101] to-black p-3">
      {filteredShowtimes.map((showtime) => (
        <ShowTimeCard key={showtime.id} showTimeInfo={showtime} />
      ))}
    </div>
  );
}
