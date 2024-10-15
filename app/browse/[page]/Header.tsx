import { Button } from '@/components/ui/button';
import SearchInput from './SearchInput';
import * as actions from '@/actions';
import Link from 'next/link';
import PokemonBallSVG from '@/assets/svg/PokemonBallSVG';

const Header = ({ page, searchTerm }: { page: string; searchTerm: string }) => {
  return (
    <div className="flex justify-between p-2">
      <Link href="/browse/1">
        <PokemonBallSVG className="relative left-2" width={50} height={50} />
      </Link>
      <div className="flex flex-col items-center">
        <SearchInput searchTerm={searchTerm} />
        <div className={`pt-2 space-x-2 ${searchTerm ? 'hidden' : 'block'}`}>
          <Button disabled={Number(page) === 1} variant="outline" asChild={Number(page) !== 1}>
            <Link href={`/browse/${Number(page) - 1}`}>Prev</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/browse/${Number(page) + 1}`}>Next</Link>
          </Button>
        </div>
      </div>

      <form action={actions.signOut}>
        <Button variant="ghost" type="submit">
          Sign Out
        </Button>
      </form>
    </div>
  );
};

export default Header;
