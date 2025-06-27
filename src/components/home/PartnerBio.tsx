import { ReactNode } from "react";
import { HomeHeading } from "./Heading";
import { HomeParagraph } from "./Paragraph";
import { twMerge } from "tailwind-merge";

interface Props {
  className?: string | undefined;
  firstName: string;
  lastName: string;
  title: string;
  children: ReactNode;
}

export function PartnerBio({
  className,
  firstName,
  lastName,
  title,
  children,
}: Props) {
  return (
    <div
      className={twMerge(
        "border-x-blueprint grow basis-1/2 px-4 pb-4 md:border-none md:pb-20",
        className,
      )}
    >
      <HomeHeading order={3} className="mb-2 md:mb-4">
        {firstName} <br className="hidden md:block" />
        {lastName}
      </HomeHeading>
      <HomeParagraph className="font-headings mb-4 uppercase md:mb-12">
        {title}
      </HomeParagraph>
      {children}
    </div>
  );
}
