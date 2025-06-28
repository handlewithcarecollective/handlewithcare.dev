import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function BlogLayout({ children }: Props) {
  return (
    <div className="border-x-blueprint m-2 h-full px-3 md:m-8 md:px-10">
      <header className="py-8">
        <h1 className="font-headings text-[1.825rem] leading-[0.9] font-extralight uppercase md:text-[2.825rem]">
          <Link href="/">
            Handle <br />
            with Care
          </Link>
        </h1>
      </header>
      {children}
    </div>
  );
}
