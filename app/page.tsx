import ShowTimeCard from "@/components/ShowTimeCard";

export default async function Home() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/showtimes`);
  const showtimes = await response.json();

  return (
    <div className="flex w-full flex-col gap-3 border border-gray-300 bg-gradient-to-t from-black via-[#180101] to-black p-3">
      {showtimes.map((showtime) => (
        <ShowTimeCard key={showtime.id} showTimeInfo={showtime} />
      ))}
    </div>
  );
}
