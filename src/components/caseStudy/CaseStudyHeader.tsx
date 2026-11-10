import Link from "next/link";
import { ReactNode } from "react";
import { HomeHeading } from "../home/Heading";
import { HomeSectionHeader } from "../home/SectionHeader";

interface Props {
  logo: ReactNode;
  clientName: string;
  title: string;
}

export function CaseStudyHeader({ logo, clientName, title }: Props) {
  return (
    <HomeSectionHeader className="flex h-auto min-h-48 flex-col justify-between gap-8 pt-0.5 md:h-auto md:min-h-80">
      <nav>
        <Link href="/">
          <HomeHeading order={2}>
            Handle
            <br />
            with Care
          </HomeHeading>
        </Link>
        <a
          className="text-brown font-headings absolute top-44 right-8 z-50 hidden rounded-[1.25rem] bg-white px-5 py-2 text-base leading-[normal] uppercase md:fixed md:top-[2.625rem] md:right-[4.25rem] md:block md:text-xl"
          href="#get-in-touch"
        >
          Get in touch
        </a>
      </nav>
      <div className="flex flex-col items-center gap-4 pb-8">
        <p className="font-headings text-gray text-base uppercase md:text-xl">
          Case study
        </p>
        <div className="flex items-center gap-4">
          {logo}
          <p className="font-headings text-[1.625rem] font-extralight uppercase md:text-3xl">
            {clientName}
          </p>
        </div>
        <HomeHeading order={1} className="mx-auto max-w-[880px] text-center">
          {title}
        </HomeHeading>
      </div>
    </HomeSectionHeader>
  );
}