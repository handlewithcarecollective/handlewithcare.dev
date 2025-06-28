import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export function BlockQuote(props: HTMLAttributes<HTMLElement>) {
  return (
    <blockquote {...props} className={twMerge(props.className, "mx-10 my-5")} />
  );
}
