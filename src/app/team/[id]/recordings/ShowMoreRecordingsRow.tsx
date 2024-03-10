"use client";

import { PAGE_SIZE } from "@/app/team/[id]/recordings/shared";
import { useNextLink } from "@/hooks/useNextLink";
import { useSearchParamLink } from "@/hooks/useSearchParamLink";
import Link from "next/link";

export function ShowMoreRecordingsRow({ maxLimit }: { maxLimit: number }) {
  const href = useSearchParamLink("limit", (limitString) => {
    const limit = limitString ? parseInt(limitString, 10) : PAGE_SIZE;
    if (limit >= maxLimit) {
      return null;
    }

    const newLimit = Math.min(limit + PAGE_SIZE, maxLimit);

    return "" + newLimit;
  });

  const { isPending, onClick } = useNextLink();

  if (href === null) {
    return null;
  }

  return (
    <Link
      className={`flex flex-row items-center justify-center gap-4 px-4 py-2 bg-slate-800 font-bold text-white ${
        isPending ? "text-gray-500" : ""
      }`}
      onClick={onClick}
      href={href}
    >
      Show More
    </Link>
  );
}