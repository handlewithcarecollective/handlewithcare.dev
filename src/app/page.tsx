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
import { Testimonial } from "@/components/home/Testimonial";
import Link from "next/link";
import { posts } from "@/posts/posts";
import { PostSnippet } from "@/components/blog/PostSnippet";

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
                Morgan has spent over a decade in product leadership building
                everything from publishing platforms to e-commerce sites and
                audience experiences that scale. With experience at places like
                The New York Times and Vox Media, she brings deep expertise in
                both transforming legacy systems and building entirely new
                products from the ground up, with a proven track record of
                taking ambitious ideas and translating them into sustainable,
                high-impact solutions. Her approach combines strategic product
                vision with hands-on execution, leading cross-functional teams
                through complex technical challenges while maintaining focus on
                user outcomes and business goals.
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
            <Spacer direction="right" className="mb-8" />
          </HomeSectionArticle>
        </HomeSectionWrapper>
      </HomeSection>
      <HomeSection>
        <HomeSectionWrapper className="border-x-blueprint flex flex-row pb-8">
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
      <HomeSection variant="orange">
        <HomeSectionWrapper>
          <HomeSectionHeader>
            <HomeHeading order={2}>Testimonials</HomeHeading>
          </HomeSectionHeader>
          <Rules />
          <HomeSectionArticle className="flex flex-col gap-4 md:flex-row">
            <Testimonial name="Alex Ulmer" title="Co-founder, dskrpt">
              Working with Handle with Care might be the best thing you can do
              for your project! Shane is a brilliant engineer whose virtually
              endless knowledge of ProseMirror and React helped us realise
              things we thought to be impossible. His library —
              react-prosemirror — was our missing link for building a modern,
              text editing application. But even more importantly, Handle with
              Care has always kept the project as a whole in mind. Shane is the
              type of engineer who you can explain the business problem, who
              will ask the right questions, and who will help you find the best
              solution ranging from a single feature to the application’s
              architecture. The quality of Handle with Care’s work is beyond
              reproach and will in fact help your team to become better.
            </Testimonial>
            <Rule vertical />
            <Testimonial
              name="Alex Clemmer"
              title="Co-founder & CEO, Moment Technologies"
            >
              Handle with Care is the best team in the world at what they do. We
              came to them when our product was a prototype with huge missing
              piece: collaborative text editing in a highly customized editor,
              well-known to be one of the hardest problems in computer science.
              There is no one-size-fits-all solution to this problem, and
              solving it requires the very best from all parts of the product
              team—architecture, boots-on-the-ground engineering, ops, etc.
              Handle was an enormous benefit at each of these steps, helping us
              break the problem into something that could be implemented and
              maintained by a small team of mostly infrastructure engineers.
              Within a few weeks we had completely retooled the frontend
              architecture, and had a production-grade build. Without Handle, I
              think this would have taken 10x longer, and we would have ended up
              with a noticeably worse experience.
            </Testimonial>
          </HomeSectionArticle>
        </HomeSectionWrapper>
      </HomeSection>
      <HomeSection>
        <HomeSectionWrapper>
          <HomeSectionHeader>
            <div className="flex flex-row justify-between">
              <HomeHeading order={2}>Writing</HomeHeading>
              <Link href="/blog" className="text-base underline md:text-xl">
                Read it all
              </Link>
            </div>
          </HomeSectionHeader>
          <Rule />
          <HomeSectionArticle className="min-h-0 gap-10">
            {posts.slice(0, 2).map((post) => (
              <PostSnippet
                key={post.slug}
                title={post.title}
                date={post.date}
                author={post.author}
                snippet={post.snippet}
                slug={post.slug}
              />
            ))}
          </HomeSectionArticle>
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
