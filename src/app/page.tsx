import { CopyEmailButton } from "@/components/home/CopyEmailButton";
import { HomeHeading } from "@/components/home/Heading";
import { OrderedList } from "@/components/home/OrderedList";
import { HomeParagraph } from "@/components/home/Paragraph";
import { PartnerBio } from "@/components/home/PartnerBio";
import { Spacer } from "@/components/home/PartnerBioSpacer";
import { Rule } from "@/components/home/Rule";
import { Rules } from "@/components/home/Rules";
import { HomeSection } from "@/components/home/Section";
import { HomeSectionArticle } from "@/components/home/SectionArticle";
import { HomeSectionHeader } from "@/components/home/SectionHeader";
import { HomeSectionWrapper } from "@/components/home/SectionWrapper";
import { TaglineDescription } from "@/components/home/TaglineDescription";
import { Times } from "@/components/home/Times";

export default function HomePage() {
  return (
    <main>
      <HomeSection className="pt-4 md:pt-10">
        <HomeSectionWrapper>
          <HomeSectionHeader className="pt-0.5">
            <nav>
              <HomeHeading order={1}>
                Handle
                <br />
                with Care
              </HomeHeading>
              <a
                className="text-brown font-headings absolute top-44 right-8 z-50 rounded-[1.25rem] bg-white px-5 py-2 text-base leading-[normal] uppercase md:fixed md:top-[2.625rem] md:right-[4.25rem] md:text-xl"
                href="#get-in-touch"
              >
                Get in touch
              </a>
            </nav>
          </HomeSectionHeader>
          <Rule />
          <HomeSectionArticle>
            <HomeHeading
              order={2}
              className="mx-auto mb-24 max-w-[880px] self-center text-left md:mb-auto md:text-center"
            >
              A product development collective with years of experience bringing
              excellent ideas to life.
            </HomeHeading>
            <div className="flex flex-col gap-4 md:flex-row">
              <TaglineDescription
                heading="An end-to-end team"
                content="We know how to take your vision and build robust, reliable solutions that drive your product strategy and development further."
              />
              <TaglineDescription
                heading="For your thorniest technical systems"
                content="We specialize in solving complex, systems-level problems, using iterative processes to confidently identify product market fit."
              />
              <TaglineDescription
                heading="Any size, any stage"
                content="Whether you’re looking to reset strategy on a years-old product, address technical debt and sustainability, or start something brand new, we’re excited to work with you."
              />
            </div>
          </HomeSectionArticle>
        </HomeSectionWrapper>
      </HomeSection>
      <HomeSection variant="orange">
        <HomeSectionWrapper>
          <HomeSectionHeader>
            <HomeHeading order={2}>Who we are</HomeHeading>
          </HomeSectionHeader>
          <Rules />
          <HomeSectionArticle className="md:border-x-blueprint mb-4 flex flex-col gap-4 border-none p-0 md:flex-row md:gap-8 md:px-7 md:py-0.5 md:pb-0">
            <PartnerBio
              firstName="Morgan"
              lastName="Cohn"
              title="Product & Strategy"
            >
              <HomeParagraph>
                Morgan has worked on products for eleven years with deep
                experience in engaging user-focused experiences and end-to-end
                workflow solutions. She&rsquo;s led product for teams at places
                like New York magazine, Vox Media, and the New York Times. She
                has a strong track record of being able to translate needs into
                actionable problems with solid outcomes.
              </HomeParagraph>
            </PartnerBio>
            <Rule vertical />
            <PartnerBio
              firstName="Shane"
              lastName="Friedman"
              title="Engineering & Architecture"
            >
              <HomeParagraph>
                Shane has been architecting and building complex user-facing
                systems for his entire career. After working on content
                management systems and dashboards for Amazon Music and YouTube
                Music, he led the New York Times engineering team responsible
                for the collaborative rich text editor that the newsroom used to
                produce stories for nytimes.com. He has worked in small, rapidly
                moving startup environments as well as large tech giants, and
                knows how to work alongside product, design, and other
                stakeholders to come up with the right solution for any problem.
              </HomeParagraph>
            </PartnerBio>
          </HomeSectionArticle>
          <Rules />
          <HomeSectionArticle className="md:border-x-blueprint mb-0 flex flex-col gap-4 border-none p-0 md:flex-row md:gap-8 md:px-7 md:py-0.5 md:pb-0">
            <PartnerBio
              className="basis-1/2"
              firstName="Phillip"
              lastName="Diffley"
              title="Engineering & Architecture"
            >
              <HomeParagraph>
                Phillip has spent 12 years designing streamlined algorithmic
                solutions to ambiguous problems and implementing robust backend
                systems with unique scalability requirements across a wide
                cross-section of industries. His early work included
                implementing data visualization software for the Joint Center
                for Artificial Photosynthesis at Caltech and optimizing trade
                execution systems for options market makers. He went on to build
                developer tools at Google, real-time client/server sync systems
                for social media apps at his own start-up, and most recently led
                the replacement of the New York Times' aging video processing
                and delivery system. Phillip thrives at finding a path to
                success when there is not a black and white solution to your
                problem.
              </HomeParagraph>
            </PartnerBio>
            <Rule vertical className="hidden md:block" />
            <Spacer direction="right" />
          </HomeSectionArticle>
        </HomeSectionWrapper>
      </HomeSection>
      <HomeSection>
        <HomeSectionWrapper className="border-x-blueprint flex flex-row">
          <Spacer direction="left" className="p-8 pb-0" />
          <Rule vertical className="hidden md:block" />
          <div className="md:basis-1/2">
            <header className="p-8">
              <HomeHeading order={2}>
                How we work
                <br />
                together
              </HomeHeading>
            </header>
            <OrderedList>
              <OrderedList.Item>
                <HomeHeading
                  className="mb-4 md:text-4xl lg:text-[2.825rem]"
                  order={3}
                >
                  Discovery &amp; consultation
                </HomeHeading>
                <HomeParagraph>
                  We partner with you to deep dive into your business goals and
                  the problems that you’re trying to solve and ensure that
                  you’re investing in the best solutions possible.
                </HomeParagraph>
              </OrderedList.Item>
              <OrderedList.Item>
                <HomeHeading
                  className="mb-4 md:text-4xl lg:text-[2.825rem]"
                  order={3}
                >
                  Architecting solutions
                </HomeHeading>
                <HomeParagraph>
                  We utilize our experience and skills to design and build
                  product solutions that realize the power of your ideas,
                  whether that means building out new systems from the ground up
                  or devising plans for long term sustainability of existing
                  products.{" "}
                </HomeParagraph>
              </OrderedList.Item>
              <OrderedList.Item>
                <HomeHeading
                  className="mb-4 md:text-4xl lg:text-[2.825rem]"
                  order={3}
                >
                  Looking to the future
                </HomeHeading>
                <HomeParagraph>
                  We give you tools and strategies to be able to own and drive
                  your product forward, both in short term and long term
                  strategy.
                </HomeParagraph>
              </OrderedList.Item>
            </OrderedList>
          </div>
        </HomeSectionWrapper>
      </HomeSection>
      <HomeSection
        variant="brown"
        className="mt-10 h-[35rem] pt-10 pb-10 md:h-[40rem]"
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
