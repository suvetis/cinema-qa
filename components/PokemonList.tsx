import Image from 'next/image';
import Link from 'next/link';
import NoPokemonFound from './NoPokemonFound';

export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonListProps {
  fetchData: () => Promise<Pokemon[]>;
}

const getPokemonNumberFromUrl = (url: string): string | null => {
  const matches = url.match(/\/(\d+)\/$/);
  return matches ? matches[1] : null;
};

const PokemonList = async ({ fetchData }: PokemonListProps) => {
  const pokemons = await fetchData();

  return (
    <div className="flex justify-center flex-wrap gap-2 h-full">
      {pokemons.length === 0 ? (
        <NoPokemonFound />
      ) : (
        pokemons.map((pokemon: Pokemon) => {
          const pokemonNumber = getPokemonNumberFromUrl(pokemon.url);

          return (
            <div key={pokemon.name} className="border border-gray-400 p-1 rounded-md h-fit">
              <Link className="flex flex-col items-center justify-center" href={`/pokemon/${pokemon.name}`}>
                <Image
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${pokemonNumber}.png`}
                  width={220}
                  height={220}
                  alt="pokemon image"
                  className="z-[9999]"
                />
                <span className="text-[17px] text-gray-700">{pokemon.name}</span>
              </Link>
            </div>
          );
        })
      )}
    </div>
  );
};

export default PokemonList;
