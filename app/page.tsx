import ShowTimeCard from "@/components/ShowTimeCard";

export default async function Home() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/showtimes`);
  const showtimes = await response.json();

  return (
    <div className="flex w-full flex-wrap gap-3 px-3 py-3">
      {showtimes.map((showtime) => (
        <ShowTimeCard key={showtime.id} showTimeInfo={showtime} />
      ))}
    </div>
  );
}
