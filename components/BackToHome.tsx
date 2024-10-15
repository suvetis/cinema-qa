import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';

const BackToHome = () => {
  return (
    <Link className="flex items-center" href="/">
      <ArrowLeftIcon className="mr-2" /> Back To Home
    </Link>
  );
};

export default BackToHome;
