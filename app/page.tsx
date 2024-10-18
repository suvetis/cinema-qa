import ShowTimeCard from "@/components/ShowTimeCard";
import { hasAuth } from "@/helpers/token";

export default async function Home() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/showtimes`);
  const showtimes = await response.json();

  const auth = await hasAuth();

  return (
    <div className="flex w-full flex-col gap-3 border border-gray-300 bg-gradient-to-t from-black via-[#180101] to-black p-3">
      {showtimes.map((showtime) => (
        <ShowTimeCard auth={!!auth} key={showtime.id} showTimeInfo={showtime} />
      ))}
    </div>
  );
}
