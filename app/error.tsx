"use client";

import Spinner from "@/components/Spinner";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <h2>Something went wrong!</h2>
      <h3 className="text-sm">{error?.message}</h3>
      <button
        className="flex items-center rounded-md border-2 p-2"
        onClick={() => {
          startTransition(() => {
            router.refresh();
            reset();
          });
        }}
      >
        {isPending && <Spinner className="mr-2 h-5 w-5" />} Try again
      </button>
    </div>
  );
}
