'use client';

import Spinner from '@/components/Spinner';
import { useRouter } from 'next/navigation';
import { useEffect, useTransition } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2>Something went wrong!</h2>
      <button
        className="flex border-2 rounded-md p-2 items-center"
        onClick={() => {
          startTransition(() => {
            router.refresh();
            reset();
          });
        }}
      >
        {isPending && <Spinner className="h-5 w-5 mr-2" />} Try again
      </button>
    </div>
  );
}
