import { ReactNode } from "react";

interface Props {
  href: string;
  children: ReactNode;
}

export function PillLink({ href, children }: Props) {
  return (
    <a
      href={href}
      className="text-brown flex translate-y-0 flex-row items-center self-start rounded-[1.25rem] bg-white px-5 py-2 text-base transition-shadow hover:shadow-md active:translate-y-1 active:bg-white/50 active:shadow-none md:text-2xl"
    >
      {children}
    </a>
  );
}