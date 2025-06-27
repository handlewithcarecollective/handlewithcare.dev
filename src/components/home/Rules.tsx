import { Rule } from "./Rule";

export function Rules() {
  return (
    <div className="flex w-[calc(100%-2rem)] gap-0 self-center md:w-[calc(100%-4rem)] md:gap-16">
      <Rule />
      <Rule />
    </div>
  );
}
