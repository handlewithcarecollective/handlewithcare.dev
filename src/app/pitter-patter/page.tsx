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

export default function PitterPatterPage() {
  return (
    <main>
      <Section className="pt-4 md:pt-10">
        <HomeSectionWrapper>
          <Rule className="border-b-green border-b-3" />
          <PageHeader className="flex flex-col justify-center pt-0.5">
            <h1 className="font-headings mx-auto text-2xl leading-[0.9] font-extralight md:text-3xl">
              <div className="justify-self-center">
                <PitterPatterLogo id="pp-logo" height="1em" className="w-fit" />
                <Cursor targetId="pp-logo" />
              </div>
              <p className="justify-self-center text-center leading-normal opacity-60">
                towards new collaborative editing tools
              </p>
            </h1>
          </PageHeader>
          <Rule className="border-b-green border-b-3" />
        </HomeSectionWrapper>
        <HomeSectionArticle className="border-l-green mb-4 items-center border-r-0 border-l-3 pt-20 md:mb-8 md:pt-20 lg:pt-30">
          <SectionContent>
            <Paragraph>
              Over the past two years, the appetite for collaborative rich text
              editing has grown dramatically. More products need it, but the
              available solutions are either expensive, opaque, or both.
              Development teams get stuck with solutions where they have limited
              control over how collaboration actually works in their
              applications.
            </Paragraph>
            <Paragraph className="pt-4 font-bold">
              We know there’s a better way. And we’re in a good position to
              build it. 
            </Paragraph>
          </SectionContent>
          <SectionContent className="py-12 lg:py-24">
            <SectionHeader>what we're building</SectionHeader>
            <Paragraph>
              Pitter Patter is an ecosystem of ProseMirror-native libraries.
              Each piece is useful on its own, and you can use what you need,
              when you need it. Every library is built directly on ProseMirror's
              APIs, not on top of an abstraction layer. You always have full
              access to the thing underneath. This includes:
            </Paragraph>
          </SectionContent>
          <div className="flex flex-col flex-wrap gap-y-16 px-4 md:flex-row md:px-10 lg:max-w-[1030px]">
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
          <SectionContent className="py-12 lg:py-24">
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
        <HomeSectionWrapper className="flex-row">
          <div className="flex grow basis-1/2 flex-col">
            <div className="border-x-brown my-2 my-4 flex grow basis-1/2 items-center justify-center border-x-3 px-4 md:my-8">
              <SectionHeader className="lg:text-4xl">who we are</SectionHeader>
            </div>
            <Rule />
            <div className="border-x-brown my-2 my-4 flex grow basis-1/2 items-center justify-center border-x-3 px-4 md:my-8 lg:text-[4.825rem]">
              <HomeHeading order={2}>
                Handle
                <br />
                with Care
              </HomeHeading>
            </div>
          </div>
          <div className="border-r-brown my-2 flex grow basis-1/2 flex-col gap-4 border-r-3 px-16 py-24 md:my-4 lg:px-24 lg:py-34">
            <Paragraph>
              At Handle With Care, we’ve [quick setence about our experience and
              credentials in the space].
            </Paragraph>
            <Paragraph className="pt-4">
              We built <span className="underline">React ProseMirror</span>{" "}
              because the other solutions (including the ones we had worked on!)
              just weren’t correct. They relied on antipatterns, often in both
              React and ProseMirror, which had real consequences for both
              development and user experience. This wasn’t enough for us. We
              wanted to build something that did it right.
            </Paragraph>
            <Paragraph className="pt-4">
              Pitter Patter is that same philosophy applied at a larger scale.
              <b>And we need your help to build it.</b>
            </Paragraph>
          </div>
        </HomeSectionWrapper>
      </Section>
      <Section>
        <HomeSectionArticle className="border-x-green my-4 items-center border-x-3 pb-10 md:my-8">
          <SectionContent>
            <SectionHeader>funding</SectionHeader>
            <Paragraph>
              <b>
                We're raising $80,000/mo for six months to fund focused
                development on Pitter Patter.
              </b>{" "}
              Following initial commitments from two companies, we’re opening
              this round to additional funders now.
            </Paragraph>
            <Paragraph className="pt-4">
              After hitting our goal, we'll transition to a sustainable
              enterprise support model for teams building on the ecosystem.
            </Paragraph>
          </SectionContent>
          <SectionContent className="py-8 md:py-16">
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
        <Rule className="border-b-green border-b-3" />
        <HomeSectionArticle className="border-l-green my-4 items-center justify-center border-r-0 border-l-3 pb-10 md:my-8">
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
        <Rule className="border-b-green border-b-3" />
      </Section>
    </main>
  );
}
