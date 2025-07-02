import { HTMLAttributes } from "react";
import cx from "classnames";

export function BulletList(props: HTMLAttributes<HTMLUListElement>) {
  return <ul {...props} className={cx("ml-4 list-disc", props.className)} />;
}
