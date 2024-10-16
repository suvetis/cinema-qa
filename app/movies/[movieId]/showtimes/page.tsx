import ShowTimeCard from '@/components/ShowTimeCard';

export default async function ShowTimesForMovie({ params }: { params: { movieId: string } }) {
  const movieId = params.movieId;
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies/${movieId}/showtimes`);
  const showtimes = await response.json();

  return (
    <div className="flex w-full flex-wrap gap-3 justify-center border border-gray-300 ">
      {showtimes.length === 0 ? (
        <h1>No Showtimes</h1>
      ) : (
        showtimes.map((showtime: any) => <ShowTimeCard key={showtime.id} showTimeInfo={showtime} />)
      )}
    </div>
  );
}
