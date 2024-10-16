import React from 'react';
import Link from 'next/link';
import LogoSvg from '@/components/svgs/Logo';

interface Hall {
  id: number;
  name: string;
}

const Header = async () => {
  const response = await fetch('https://cinema.xdatagroup.dev/api/v1/cinema/halls');
  const halls: Hall[] = await response.json();

  return (
    <div className="flex justify-between bg-[#000000]">
      <Link href="/" className="border-r-[1px] border-gray-300 py-1 ">
        <LogoSvg />
      </Link>
      <ul className="flex w-full items-stretch px-5 ">
        {halls.map((hall: Hall, index: number) => (
          <li
            key={hall.id}
            className={`flex-grow font-semibold text-xl text-gray-200 ${
              index < halls.length - 1 ? 'border-r-[1px] border-gray-300' : ''
            } flex items-center justify-center`}
          >
            {hall.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Header;
