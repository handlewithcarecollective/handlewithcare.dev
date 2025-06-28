import { ReactNode } from "react";

interface Props {
  id?: string | undefined;
  children: ReactNode;
}

export function BlogSection({ id, children }: Props) {
  return (
    <section id={id} className="flex flex-col gap-4 text-base md:text-xl">
      {children}
    </section>
  );
}
