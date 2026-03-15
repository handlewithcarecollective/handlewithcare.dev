import { twMerge } from "tailwind-merge";

export function ContributeDirectlyButton({
  className,
}: {
  className?: string | undefined;
}) {
  return (
    <a
      target="_blank"
      href="https://github.com/sponsors/handlewithcarecollective"
      className={twMerge(
        "group text-brown bg-canvas font-headings relative flex cursor-pointer content-center items-center gap-3 rounded-[3.75rem] px-4 py-2 text-xl transition-colors duration-300 hover:opacity-90 active:opacity-80 md:px-6 md:text-[1.5rem]",
        className,
      )}
    >
      CONTRIBUTE DIRECTLY
    </a>
  );
}
