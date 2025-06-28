import { AlignmentButton } from "./AlignmentButton";
import {
  NodeViewComponentProps,
  useStopEvent,
} from "@handlewithcare/react-prosemirror";
import { forwardRef } from "react";
import cx from "classnames";

export const ImageNode = forwardRef<HTMLDivElement, NodeViewComponentProps>(
  function ImageNode({ nodeProps, ...props }, ref) {
    const { node, getPos } = nodeProps;

    useStopEvent((_view, e) => {
      if (!(e instanceof MouseEvent)) return false;
      if (!(e.target instanceof HTMLElement)) return false;
      let el = e.target.parentElement;
      while (el) {
        if (el.dataset.pmControls) return true;
        el = el.parentElement;
      }
      return false;
    });

    return (
      <div
        ref={ref}
        {...props}
        className={cx("my-4 flex flex-col gap-2", props.className)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={cx("shrink grow-0", {
            "self-start":
              node.attrs.alignment === "left" || !node.attrs.alignment,
            "self-center": node.attrs.alignment === "center",
            "self-end": node.attrs.alignment === "right",
          })}
          src={node.attrs.src}
          alt=""
        />
        <div
          data-pm-controls
          className="flex gap-4 self-center"
          contentEditable={false}
        >
          <AlignmentButton getPos={getPos} alignment="left" />
          <AlignmentButton getPos={getPos} alignment="center" />
          <AlignmentButton getPos={getPos} alignment="right" />
        </div>
      </div>
    );
  },
);
