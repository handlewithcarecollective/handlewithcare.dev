import { HTMLProps } from "react";
import cx from "classnames";

export function ToDo({
  checked,
  children,
  ...props
}: HTMLProps<HTMLDivElement> & { checked?: boolean }) {
  return (
    <div {...props} className={cx("flex gap-2", props.className)}>
      <input
        className="mt-[1.375rem] self-start"
        disabled
        type="checkbox"
        checked={checked}
      />
      <p>{children}</p>
    </div>
  );
}
