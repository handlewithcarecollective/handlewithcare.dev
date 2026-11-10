import { CaseStudyHeader } from "@/components/caseStudy/CaseStudyHeader";
import { CaseStudySection } from "@/components/caseStudy/CaseStudySection";
import { CaseStudySnippet } from "@/components/caseStudy/CaseStudySnippet";
import { PillLink } from "@/components/caseStudy/PillLink";
import { SplitRow } from "@/components/caseStudy/SplitRow";
import { CopyEmailButton } from "@/components/home/CopyEmailButton";
import { HomeHeading } from "@/components/home/Heading";
import { HomeParagraph } from "@/components/home/Paragraph";
import { Rule } from "@/components/home/Rule";
import { Rules } from "@/components/home/Rules";
import { HomeSection } from "@/components/home/Section";
import { HomeSectionArticle } from "@/components/home/SectionArticle";
import { HomeSectionHeader } from "@/components/home/SectionHeader";
import { HomeSectionWrapper } from "@/components/home/SectionWrapper";
import { TaglineDescription } from "@/components/home/TaglineDescription";
import { Testimonial } from "@/components/home/Testimonial";
import { Times } from "@/components/home/Times";

export default function CaseStudyTemplate() {
  return (
    <main>
      <HomeSection className="pt-4 md:pt-10">
        <HomeSectionWrapper>
          <CaseStudyHeader
            logo={
              <span className="text-gray border-brown flex h-12 w-12 items-center justify-center border border-dashed text-center text-[10px] leading-3">
                [Logo]
              </span>
            }
            clientName="[Client name]"
            title="[Title: what we built or changed]"
          />
          <Rule />
          <HomeSectionArticle className="gap-10 px-4">
            <div className="mx-auto flex max-w-[640px] flex-col gap-4">
              <HomeParagraph>
                [Subhead: one or two sentences on who the client is and why the
                work mattered]
              </HomeParagraph>
              <HomeParagraph className="font-bold">
                [One sentence on what changed.]
              </HomeParagraph>
            </div>
            <div className="mx-auto flex w-full max-w-[640px] flex-col gap-4 md:flex-row">
              <TaglineDescription
                heading="Engagement"
                content="[Months, start to finish]"
              />
              <TaglineDescription
                heading="Built with"
                content="[ProseMirror, React, and so on]"
              />
            </div>
            <div className="border-brown text-gray flex min-h-[260px] items-center justify-center border border-dashed p-6 text-center md:min-h-[440px]">
              <HomeParagraph>
                [Hero image: the product, the team at work, or the client’s
                space]
              </HomeParagraph>
            </div>
          </HomeSectionArticle>
        </HomeSectionWrapper>
      </HomeSection>

      <CaseStudySection title="The challenge" variant="orange">
        <HomeSectionArticle className="min-h-0 px-4 md:min-h-0">
          <div className="mx-auto flex max-w-[640px] flex-col gap-4">
            <HomeParagraph>
              [This is the client and the problem that they are/we are trying
              to solve]
            </HomeParagraph>
            <ul className="flex list-disc flex-col gap-2 pl-6 text-base md:text-xl">
              <li>What they needed</li>
              <li>Another bullet point</li>
              <li>Why?</li>
            </ul>
            <HomeParagraph className="font-bold">
              [A closing sentence]
            </HomeParagraph>
          </div>
        </HomeSectionArticle>
      </CaseStudySection>

      <CaseStudySection title="Our solution">
        <HomeSectionArticle className="min-h-0 gap-10 px-4 md:min-h-0">
          <HomeHeading
            order={3}
            className="mx-auto max-w-[880px] self-center text-left md:text-center"
          >
            [A one-sentence statement of the approach and why it fit the
            client]
          </HomeHeading>
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="border-brown text-gray flex min-h-[220px] flex-1 items-center justify-center border border-dashed p-6 text-center md:min-h-[300px]">
              <HomeParagraph>[Screenshot or diagram]</HomeParagraph>
            </div>
            <div className="border-brown text-gray flex min-h-[220px] flex-1 items-center justify-center border border-dashed p-6 text-center md:min-h-[300px]">
              <HomeParagraph>[Screenshot or diagram]</HomeParagraph>
            </div>
          </div>
          <div className="mx-auto flex w-full max-w-[640px] flex-col gap-4">
            <HomeHeading order={3}>What we delivered</HomeHeading>
            <HomeParagraph>[What we shipped]</HomeParagraph>

            <div className="mt-4 flex flex-col gap-2">
              <HomeHeading
                order={4}
                className="text-xl leading-tight md:text-[1.625rem]"
              >
                [Sub-heading: how we worked with their team]
              </HomeHeading>
              <HomeParagraph>[A short paragraph.]</HomeParagraph>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <HomeHeading
                order={4}
                className="text-xl leading-tight md:text-[1.625rem]"
              >
                [Sub-heading: another thing worth calling out]
              </HomeHeading>
              <HomeParagraph>[A short paragraph.]</HomeParagraph>
            </div>
          </div>
        </HomeSectionArticle>
      </CaseStudySection>

      <CaseStudySection title="Results & impact" rules>
        <SplitRow
          left={
            <TaglineDescription
              heading="[What changed for their users]"
              content="[Describe the change in layman terms]"
            />
          }
          right={
            <TaglineDescription
              heading="[What changed for their team]"
              content="[Describe the change in layman terms]"
            />
          }
        />
        <Rules />
        <SplitRow
          left={
            <>
              <HomeHeading order={3} className="mb-2">
                [00%]
              </HomeHeading>
              <HomeParagraph>[A sentence description]</HomeParagraph>
            </>
          }
          right={
            <>
              <HomeHeading order={3} className="mb-2">
                [0x]
              </HomeHeading>
              <HomeParagraph>[A sentence description]</HomeParagraph>
            </>
          }
        />
        <Rules />
        <HomeSectionArticle className="min-h-0 flex-row flex-wrap justify-start gap-4 px-4 md:min-h-0">
          <PillLink href="#repo">[repository link]</PillLink>
          <PillLink href="#writing">Writing: [related post]</PillLink>
        </HomeSectionArticle>
      </CaseStudySection>

      <CaseStudySection title="Takeaways" variant="orange" rules>
        <HomeSectionArticle className="flex min-h-0 flex-col gap-4 md:min-h-0 md:flex-row">
          <div className="px-4 md:basis-1/2">
            <HomeParagraph>
              [What we learned from it / what we would tell the next team facing
              a similar problem.]
            </HomeParagraph>
          </div>
          <Rule vertical />
          <Testimonial name="[Name]" title="[Title, organization]">
            [Optional client quote about working with us]
          </Testimonial>
        </HomeSectionArticle>
      </CaseStudySection>

      <CaseStudySection id="all-case-studies" title="More case studies">
        <HomeSectionArticle className="min-h-0 gap-10">
          {[1, 2].map((n) => (
            <CaseStudySnippet
              key={n}
              href="#"
              segment="[Segment]"
              title="[Case study title]"
              client="[Client name]"
              summary="[One line on what we did and what changed]"
            />
          ))}
        </HomeSectionArticle>
      </CaseStudySection>

      <HomeSection
        variant="brown"
        className="h-[35rem] pt-10 pb-10 md:h-[40rem]"
      >
        <Rule className="mb-8 translate-x-4 md:w-[calc(100%-2rem)]" />
        <HomeSectionWrapper className="border-blueprint flex h-[calc(100%-4rem)] flex-col justify-between border-l-3">
          <HomeSectionHeader className="h-auto border-none md:h-auto">
            <HomeHeading id="get-in-touch" order={2}>
              Get in touch
            </HomeHeading>
          </HomeSectionHeader>
          <div className="flex items-center justify-center">
            <CopyEmailButton />
          </div>
          <Times />
        </HomeSectionWrapper>
        <Rule className="mt-8 translate-x-4 md:w-[calc(100%-2rem)]" />
      </HomeSection>
    </main>
  );
}