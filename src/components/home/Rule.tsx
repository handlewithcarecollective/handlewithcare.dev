import { twMerge } from "tailwind-merge";

interface Props {
  className?: string | undefined;
  vertical?: true;
}

export function Rule({ className, vertical }: Props) {
  if (vertical) {
    return (
      <div
        className={twMerge(
          "border-b-blueprint md:border-blueprint h-0 w-[calc(100%-2rem)] self-center border-l-0 md:h-[initial] md:w-0 md:self-auto md:border-r-[1.5px] md:border-l-[1.5px]",
          className,
        )}
      />
    );
  }

  return (
    <hr
      className={twMerge(
        "border-b-blueprint w-[calc(100%-2rem)] self-center border-t-0 md:w-[calc(100%-4rem)]",
        className,
      )}
    />
  );
}
