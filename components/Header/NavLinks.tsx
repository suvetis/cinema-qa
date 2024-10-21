"use client";
import { Hall } from ".";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const NavLinks = ({ halls }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (pathname.includes("/showtimes")) {
    return (
      <div className="text-xl font-semibold text-gray-200">Movie Details</div>
    );
  }

  if (pathname.includes("/bookings")) {
    return (
      <div className="text-xl font-semibold text-gray-200">Booking Detials</div>
    );
  }

  if (pathname.includes("/login")) {
    return (
      <div className="text-xl font-semibold text-gray-200">Login Page</div>
    );
  }

  if (pathname.includes("/signup")) {
    return (
      <div className="text-xl font-semibold text-gray-200">Sign Up Page</div>
    );
  }

  return (
    <ul className="flex w-full items-stretch px-5">
      {halls.map((hall: Hall) => (
        <li
          key={hall.id}
          className={`flex-grow cursor-pointer border-r-[1px] border-gray-300 text-xl font-semibold text-gray-200 ${hall.id === Number(searchParams.get("hall")) && "text-yellow-400"} flex items-center justify-center`}
          onClick={() => router.push(`${pathname}?hall=${hall.id}`)}
        >
          {hall.name}
        </li>
      ))}
      <li
        key="all"
        className={`flex-grow cursor-pointer text-xl font-semibold text-gray-200 ${searchParams.get("hall") === null && "text-yellow-400"} flex items-center justify-center`}
        onClick={() => router.push(pathname)}
      >
        All
      </li>
    </ul>
  );
};

export default NavLinks;
