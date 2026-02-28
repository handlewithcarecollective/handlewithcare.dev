import { Cursor } from "@/components/pitterPatter/Cursor";

export default function PitterPatterPage() {
  return (
    <main>
      <header className="pt-10 md:pt-20">
        <h1 className="font-headings mx-auto w-max text-6xl leading-[0.9] font-extralight uppercase md:text-8xl">
          Pitter Pa
          <span id="pp-autofill" className="opacity-50">
            tter
          </span>
          <Cursor targetId="pp-autofill" />
        </h1>
      </header>
    </main>
  );
}
