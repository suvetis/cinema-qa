import React from "react";
import Link from "next/link";
import LogoSvg from "@/components/svgs/Logo";
import { Button } from "./ui/button";
import { CircleUser } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import * as actions from "@/actions";
import { hasAuth } from "@/helpers/token";

interface Hall {
  id: number;
  name: string;
}

const Header = async () => {
  const auth = await hasAuth();

  const response = await fetch(
    "https://cinema.xdatagroup.dev/api/v1/cinema/halls",
  );
  const halls: Hall[] = await response.json();

  return (
    <div className="flex justify-between bg-[#000000]">
      <Link href="/" className="border-r-[1px] border-gray-300 py-1">
        <LogoSvg />
      </Link>
      <ul className="flex w-full items-stretch px-5">
        {halls.map((hall: Hall, index: number) => (
          <li
            key={hall.id}
            className={`flex-grow text-xl font-semibold text-gray-200 ${
              index < halls.length - 1 ? "border-r-[1px] border-gray-300" : ""
            } flex items-center justify-center`}
          >
            {hall.name}
          </li>
        ))}
      </ul>
      {auth ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>My Bookings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <form action={actions.signOut}>
              <button className="w-full" type="submit">
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </button>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link className="text-white" href="/login">
          Login
        </Link>
      )}
    </div>
  );
};

export default Header;
