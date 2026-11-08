import { ReactNode } from "react";
import { Link } from "./Link";

interface Props {
  id: string;
  href: string;
  children: ReactNode;
}

export function FootnoteRef({ id, href, children }: Props) {
  return (
    <sup>
      <Link
        href={href}
        id={id}
        className="mx-0.5 scroll-mt-12 roundedmotion-reduce:target:bg-yellow-200 motion-safe:target:animate-fn-flash"
      >
        {children}
      </Link>
    </sup>
  );
}
