import { AnchorHTMLAttributes } from "react";

export function Link(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a className="font-bold underline" {...props} />;
}
