import ShowTimeCard from '@/components/ShowTimeCard';
import Link from 'next/link';

export default async function Home() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/showtimes`);
  const showtimes = await response.json();

  return (
    <div className="flex w-full flex-wrap gap-3 justify-center border-2 border-red-200">
      {showtimes.map((showtime: any) => (
        <ShowTimeCard key={showtime.id} showTimeInfo={showtime} />
      ))}
    </div>
  );
}
