"use client";

import { useCallback, useRef } from "react";
import { twMerge } from "tailwind-merge";

export function ContributeDirectlyButton({
  className,
}: {
  className?: string | undefined;
}) {
  const buttonRef = useRef<null | HTMLButtonElement>(null);

  const handleClick = useCallback(async () => {
    // TODO
  }, []);

  return (
    <button
      ref={buttonRef}
      type="button"
      className={twMerge(
        "group text-brown bg-canvas font-headings relative flex cursor-pointer content-center items-center gap-3 rounded-[3.75rem] px-4 py-2 text-xl transition-colors duration-300 active:opacity-80 md:px-6 md:text-[1.5rem]",
        className,
      )}
      onClick={handleClick}
    >
      <span>CONTRIBUTE DIRECTLY</span>
    </button>
  );
}
