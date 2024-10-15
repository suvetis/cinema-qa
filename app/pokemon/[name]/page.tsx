import Image from 'next/image';
import BackToHome from '@/components/BackToHome';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';

interface Ability {
  ability: {
    name: string;
  };
}

const PokemonPage = async ({ params }: { params: { name: string } }) => {
  const session = await auth();
  if (!session) redirect('/login');

  const { name } = params;

  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const pokemon = await response.json();

  const formatMeasurement = (value: number, unit: string): string => {
    return `${value} ${unit}`;
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <BackToHome />
      <div key={pokemon.name} className="border border-gray-400 mt-2 p-4 px-6 rounded-md max-w-[400px]">
        <Image src={pokemon.sprites.other['home'].front_shiny} width={220} height={220} alt="pokemon image" />
        <div className="text-white flex flex-col gap-2 mt-2">
          <p className="bg-blue-400 px-2 rounded-md">Name: {pokemon.name}</p>
          <p className="bg-blue-400 px-2 rounded-md">Height: {pokemon?.height && formatMeasurement(pokemon.height / 10, 'meters')}</p>
          <p className="bg-blue-400 px-2 rounded-md">Weight: {pokemon?.weight && formatMeasurement(pokemon.weight / 10, 'meters')}</p>
          <div className="flex flex-col text-center text-black">
            <h3 className="font-bold text-xl underline">Abilities</h3>
            {pokemon?.abilities && pokemon.abilities.map((ab: Ability) => <span key={ab.ability.name}>{ab.ability.name}</span>)}
          </div>
        </div>
      </div>
    </main>
  );
};

export default PokemonPage;
