import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  id?: string | undefined;
  variant?: "orange" | "brown" | undefined;
  className?: string | undefined;
  children: ReactNode;
}

export function Section({ id, variant, className, children }: Props) {
  return (
    <section
      id={id}
      className={twMerge(
        "bg-canvas md:text-md flex flex-col px-3 py-0 md:px-10 lg:text-lg",
        variant === "orange" && "bg-orange text-brown",
        variant === "brown" && "bg-brown text-white [--color-blueprint:white]",
        className,
      )}
    >
      {children}
    </section>
  );
}
