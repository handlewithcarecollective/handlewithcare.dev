import { Rule } from "@/components/home/Rule";
import { HomeSectionArticle } from "@/components/home/SectionArticle";
import { HomeSectionWrapper } from "@/components/home/SectionWrapper";
import { Cursor } from "@/components/pitterPatter/Cursor";
import { Paragraph } from "@/components/pitterPatter/Paragraph";
import { PitterPatterLogo } from "@/components/pitterPatter/PitterPatterLogo";
import { PageHeader } from "@/components/pitterPatter/PageHeader";
import { Section } from "@/components/pitterPatter/Section";
import { TaglineDescription } from "@/components/pitterPatter/TaglineDescription";
import { SectionHeader } from "@/components/pitterPatter/SectionHeader";
import { HomeHeading } from "@/components/home/Heading";
import { SectionContent } from "@/components/pitterPatter/SectionContent";
import { FundingStatus } from "@/components/pitterPatter/FundingStatus";
import { CopyEmailButton } from "@/components/home/CopyEmailButton";
import { ContributeDirectlyButton } from "@/components/pitterPatter/ContributeDirectlyButton";
import { StayConnectedForm } from "@/components/pitterPatter/StayConnectedForm";

export default function PitterPatterPage() {
  return (
    <main>
      <Section className="pt-4 md:pt-10">
        <HomeSectionWrapper>
          <Rule className="border-b-green border-b-1 lg:border-b-2" />
          <PageHeader className="flex flex-col justify-center pt-0.5">
            <h1 className="font-headings mx-auto text-[1.6875rem] font-extralight md:text-3xl lg:text-4xl">
              <div className="justify-self-center">
                <PitterPatterLogo id="pp-logo" height="1em" className="w-fit" />
                <Cursor targetId="pp-logo" />
              </div>
            </h1>
            <p className="font-headings justify-self-center text-center text-[1.6875rem] leading-[105%] opacity-60 md:text-3xl lg:text-4xl">
              better collaborative editing
            </p>
          </PageHeader>
          <Rule className="border-b-green border-b-1 lg:border-b-2" />
        </HomeSectionWrapper>
        <HomeSectionArticle className="border-l-green mb-4 items-center border-r-0 border-l-1 pt-10 md:mb-8 md:px-8 md:pt-4 lg:border-l-2 lg:pt-20">
          <SectionContent>
            <Paragraph className="mb-4">
              Over the past two years, the appetite for collaborative rich text
              editing has grown dramatically. More products need it, but the
              available solutions are either expensive, opaque, or both.
              Development teams get stuck with solutions where they have limited
              control over how collaboration actually works in their
              applications.
            </Paragraph>
            <Paragraph className="font-bold">
              We know there’s a better way. And we’re in a good position to
              build it.
            </Paragraph>
          </SectionContent>
          <SectionContent className="my-9 md:my-13 lg:my-28">
            <SectionHeader>what we're building</SectionHeader>
            <Paragraph>
              Pitter Patter is an ecosystem of ProseMirror-native libraries.
              Each piece is useful on its own, and you can use what you need,
              when you need it. Every library is built directly on ProseMirror's
              APIs, not on top of an abstraction layer. You always have full
              access to the thing underneath. This includes:
            </Paragraph>
          </SectionContent>
          <div className="flex flex-col flex-wrap gap-y-10 px-4 md:flex-row md:px-10 lg:max-w-[1030px]">
            <TaglineDescription
              heading="Collaboration server"
              content="Self-hosted real-time co-editing with presence, version history, and no conflicts."
            />
            <TaglineDescription
              heading="Presence indicators"
              content="Cursor positions, text selections, join/leave events, and user metadata, surfaced cleanly for whatever UI you want to build on top."
            />
            <TaglineDescription
              heading="Annotations"
              content="Comments with threading, resolution, and persistence. We're working through the right approach to keep comment marks coherent when the content beneath them changes (or is deleted!)."
            />
            <TaglineDescription
              heading="Suggest changes"
              content="A full suggest/review/accept workflow with authorship tracking"
            />
            <TaglineDescription
              heading="Drag and drop"
              content="A first-class library for reordering, resizing, and repositioning content within the editor, being accelerated by one of our early funders."
            />
            <TaglineDescription
              heading="Markdown"
              content="Fully customizable serialization to and parsing from markdown, with support for custom directives, HTML, and more."
            />
            <TaglineDescription
              heading="Code blocks"
              content="A really, really good code block. Built on top of React CodeMirror, with full support for a wide array of programming languages, custom key maps, autocomplete, and multiple cursors."
            />
            <TaglineDescription
              heading="Embedded media"
              content="Drag & drop or pick and upload. Use with any media storage backend."
            />
            <TaglineDescription
              light
              heading="More to come"
              content="We’ve got a roadmap to build the best developer experience for rich text editors, ever."
            />
          </div>
          <SectionContent className="py-12 md:py-16 lg:py-24">
            <SectionHeader>why now?</SectionHeader>
            <Paragraph className="pb-2">
              The ProseMirror ecosystem is mature. The underlying primitives are
              excellent. What's been missing is a suite of libraries that treats
              the ecosystem — and the developers building on it — with the same
              respect. Something you can adopt incrementally, without buying
              into a stack you didn't choose.
            </Paragraph>
            <Paragraph className="pt-4">
              We've spent years close enough to these problems to know what that
              looks like, and we have a track record of shipping things that
              other developers actually use.
            </Paragraph>
          </SectionContent>
        </HomeSectionArticle>
      </Section>
      <Section variant="orange" className="w-full">
        <HomeSectionWrapper className="flex-col lg:flex-row">
          <div className="flex grow flex-col lg:basis-1/2">
            <div className="border-x-brown mb-4 flex h-30 grow items-center justify-center border-x-1 px-4 md:my-8 lg:border-r-0 lg:border-l-2">
              <SectionHeader className="mb-0 flex flex-col justify-center lg:text-4xl">
                who we are
              </SectionHeader>
            </div>
            <Rule className="border-b-1 lg:border-b-2" />
            <div className="border-x-brown my-4 flex h-30 grow items-center justify-center border-x-1 px-4 md:my-8 md:h-38 lg:border-r-0 lg:border-l-2 lg:text-[4.825rem]">
              <HomeHeading
                order={2}
                className="text-[2.325rem] leading-[0.9] md:text-[3rem] lg:text-[4rem]"
              >
                Handle
                <br />
                with Care
              </HomeHeading>
            </div>
          </div>
          <Rule className="border-b-1 lg:hidden" />
          <div className="border-x-brown my-2 flex grow flex-col gap-4 border-x-1 px-3 pt-6 md:my-8 md:px-16 lg:basis-1/2 lg:border-x-2 lg:px-24 lg:py-34">
            <Paragraph className="mb-2">
              At Handle With Care, we’ve built text editors for the most
              demanding publishing platforms, and we’ve seen quite a lot of
              limitations and challenges in this space.
            </Paragraph>
            <Paragraph className="mb-2">
              We built{" "}
              <a
                href="/blog/why_i_rebuilt_prosemirror_view/"
                className="underline"
              >
                React ProseMirror
              </a>{" "}
              because the other solutions (including ours!) just weren’t
              correct. They relied on antipatterns, often in both React and
              ProseMirror, which had real consequences for both development and
              user experience. This wasn’t enough for us. We wanted to build
              something that did it right.
            </Paragraph>
            <Paragraph className="mb-8">
              Pitter Patter is that same philosophy applied at a larger scale.{" "}
              <strong>And we need your help to build it.</strong>
            </Paragraph>
          </div>
        </HomeSectionWrapper>
      </Section>
      <Section>
        <HomeSectionArticle className="border-x-green my-4 items-center border-x-1 py-3 pb-10 md:my-8 md:px-8 md:py-5">
          <SectionContent>
            <SectionHeader>funding</SectionHeader>
            <Paragraph>
              <strong>
                We're raising $80,000/mo for six months to fund focused
                development on Pitter Patter.
              </strong>{" "}
              Following initial commitments from two companies, we’re opening
              this round to additional funders now.
            </Paragraph>
            <FundingStatus
              className="my-7 md:my-12"
              value="$21,000"
              sponsorCount={2}
            />
            <Paragraph>
              After hitting our goal, we'll transition to a sustainable
              enterprise support model for teams building on the ecosystem.
            </Paragraph>
          </SectionContent>
          <SectionContent className="pt-14 md:py-16">
            <SectionHeader>why sponsor?</SectionHeader>
            <Paragraph>
              Sponsors will get regular updates about development progress,
              including previews of upcoming features.
            </Paragraph>
            <Paragraph className="pt-4">
              Sponsors will also get priority in getting issues addressed as we
              start releasing features, and will have a direct line of
              communication to us for support.
            </Paragraph>
            <Paragraph className="pt-4">
              Funders above a certain threshold join our steering committee — a
              lightweight governance model where significant contributors help
              shape our roadmap priorities.
            </Paragraph>
          </SectionContent>
        </HomeSectionArticle>
      </Section>
      <Section variant="brown" className="gap-0 pt-10">
        <Rule className="border-b-green border-b-1" />
        <HomeSectionArticle className="border-l-green my-4 h-80 items-center justify-center border-r-0 border-l-1 pb-0 md:my-8">
          <SectionContent>
            <SectionHeader>become a sponsor</SectionHeader>
            <Paragraph>
              If you're building on ProseMirror and want to help shape this, or
              if you're a company that would benefit from having genuine
              influence over the future of open-source collaborative editing
              infrastructure, we'd like to talk.
            </Paragraph>
          </SectionContent>
        </HomeSectionArticle>
        <Rule className="border-b-green border-b-1" />
      </Section>
      <Section variant="brown" className="gap-0">
        <HomeSectionArticle className="border-r-green mb-4 h-80 items-center justify-center gap-8 border-r-1 border-l-0 pb-0 lg:flex-row lg:gap-16">
          <div className="flex flex-col items-center justify-center">
            <SectionHeader className="text-xl lg:text-2xl">
              REACH OUT
            </SectionHeader>
            <CopyEmailButton short />
          </div>
          <div className="mb-4 flex flex-col items-center justify-center">
            <SectionHeader className="mb-10 text-xl md:mb-12 lg:text-2xl">
              OR
            </SectionHeader>
            <ContributeDirectlyButton />
          </div>
        </HomeSectionArticle>
        <Rule className="border-b-green mb-8 border-b-1" />
      </Section>
      <Section
        variant="brown"
        className="flex-col-reverse justify-between gap-0 pb-14 md:pb-14 lg:flex-row"
      >
        <div className="ml-4 flex items-center justify-center gap-3 lg:ml-8">
          <PitterPatterLogo height="1em" color="white" />
          <span className="text-md lg:text-md">by</span>
          <span className="font-headings">HANDLE WITH CARE</span>
        </div>
        <Rule className="border-b-green my-4 block border-b-1 md:my-8 lg:hidden" />

        <StayConnectedForm />
      </Section>
    </main>
  );
}
