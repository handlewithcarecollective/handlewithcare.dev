import { AnchorHTMLAttributes } from "react";
import cx from "classnames";

export function Link({
  className,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a {...props} className={cx("font-bold underline", className)} />;
}
