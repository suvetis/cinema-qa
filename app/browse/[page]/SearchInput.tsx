'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const SearchInput = ({ searchTerm }: { searchTerm: string }) => {
  const [inputVal, setInputVal] = useState(searchTerm);

  const router = useRouter();

  useEffect(() => {
    setInputVal(searchTerm);
  }, [searchTerm]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      router.push(!inputVal ? '/browse/1' : `/browse/1?searchTerm=${inputVal}`);
    }
  };

  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input onKeyDown={handleKeyDown} value={inputVal} onChange={(e) => setInputVal(e.target.value)} placeholder="Pokemon search" />
      <Button asChild>
        <Link href={!inputVal ? '/browse/1' : `/browse/1?searchTerm=${inputVal}`}>Search</Link>
      </Button>
    </div>
  );
};

export default SearchInput;
