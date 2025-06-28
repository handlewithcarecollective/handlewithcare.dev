import { HTMLAttributes } from "react";
import cx from "classnames";

export function NumberedList(props: HTMLAttributes<HTMLOListElement>) {
  return <ol {...props} className={cx("ml-4 list-decimal", props.className)} />;
}
