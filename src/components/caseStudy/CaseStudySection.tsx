import { ReactNode } from "react";
import { HomeHeading } from "../home/Heading";
import { Rule } from "../home/Rule";
import { Rules } from "../home/Rules";
import { HomeSection } from "../home/Section";
import { HomeSectionHeader } from "../home/SectionHeader";
import { HomeSectionWrapper } from "../home/SectionWrapper";

interface Props {
  id?: string;
  title: string;
  variant?: "orange" | "brown";
  action?: ReactNode;
  rules?: true;
  children: ReactNode;
}

export function CaseStudySection({
  id,
  title,
  variant,
  action,
  rules,
  children,
}: Props) {
  return (
    <HomeSection id={id} variant={variant}>
      <HomeSectionWrapper>
        <HomeSectionHeader className="h-auto pb-2 md:h-auto">
          {action ? (
            <div className="flex flex-row justify-between">
              <HomeHeading order={2}>{title}</HomeHeading>
              {action}
            </div>
          ) : (
            <HomeHeading order={2}>{title}</HomeHeading>
          )}
        </HomeSectionHeader>
        {rules ? <Rules /> : <Rule />}
        {children}
      </HomeSectionWrapper>
    </HomeSection>
  );
}