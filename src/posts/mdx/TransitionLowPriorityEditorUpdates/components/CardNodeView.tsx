import { NodeViewComponentProps } from "@handlewithcare/react-prosemirror";
import cx from "classnames";
import { useLayoutEffect, useRef } from "react";
import { useMergeRefs } from "react-best-merge-refs";

export function CardNodeView({
  nodeProps,
  children,
  ref,
  ...props
}: NodeViewComponentProps) {
  const innerRef = useRef<HTMLDivElement | null>(null);

  let start = Date.now();
  while (Date.now() < start + 30) {}

  useLayoutEffect(() => {
    const div = innerRef.current;
    if (!div) return;
    div.style["borderColor"] = "#ffb900";
    const timeout = setTimeout(() => {
      div.style["borderColor"] = "#162456";
    }, 50);
    return () => {
      clearTimeout(timeout);
    };
  });

  return (
    <div
      ref={useMergeRefs({ ref, innerRef })}
      {...props}
      className={cx(
        props.className,
        "m-4 rounded-lg border-2 border-blue-950 p-4",
      )}
    >
      {children}
    </div>
  );
}
