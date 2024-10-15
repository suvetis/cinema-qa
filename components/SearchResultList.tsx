import PokemonList, { Pokemon } from './PokemonList';
import BackToHome from './BackToHome';

const SearchResultList = async ({ searchTerm }: { searchTerm: string }) => {
  async function fetchPokemons() {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1000`, { cache: 'force-cache' });
    const pokemons = await response.json();

    return pokemons.results.filter((pokemon: Pokemon) => pokemon.name.toLowerCase().startsWith(searchTerm.toLowerCase()));
  }

  return (
    <>
      <div className="flex justify-center pt-8 pb-4">
        <BackToHome />
      </div>
      <PokemonList fetchData={fetchPokemons} />
    </>
  );
};

export default SearchResultList;
