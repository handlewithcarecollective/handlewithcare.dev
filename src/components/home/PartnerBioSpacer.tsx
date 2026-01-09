import { twMerge } from "tailwind-merge";

interface Props {
  className?: string | undefined;
  direction: "right" | "left";
}

export function Spacer({ className, direction }: Props) {
  return (
    <div
      className={twMerge(
        "border-blueprint relative hidden grow basis-1/2 pt-0 md:block",
        className,
      )}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <line
          className="stroke-current stroke-3"
          x1={direction === "right" ? "100" : "0"}
          y1="0"
          x2={direction === "right" ? "0" : "100"}
          y2="100"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
