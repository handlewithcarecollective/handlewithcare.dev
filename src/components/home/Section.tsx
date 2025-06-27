import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  variant?: "orange" | "brown" | undefined;
  className?: string | undefined;
  children: ReactNode;
}

export function HomeSection({ variant, className, children }: Props) {
  return (
    <section
      className={twMerge(
        "bg-canvas px-3 py-0 md:px-10",
        variant === "orange" && "bg-orange text-brown",
        variant === "brown" && "bg-brown text-white [--color-blueprint:white]",
        className,
      )}
    >
      {children}
    </section>
  );
}
