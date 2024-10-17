import ShowTimeCard from "@/components/ShowTimeCard";
import { hasAuth } from "@/helpers/token";

export default async function Home() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/showtimes`);
  const showtimes = await response.json();

  const auth = await hasAuth();

  return (
    <div className="flex w-full flex-wrap gap-3 px-3 py-3">
      {showtimes.map((showtime) => (
        <ShowTimeCard auth={!!auth} key={showtime.id} showTimeInfo={showtime} />
      ))}
    </div>
  );
}
