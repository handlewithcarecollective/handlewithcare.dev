import cx from "classnames";

import { AlignmentButton } from "./AlignmentButton";
import {
  NodeViewComponentProps,
  ReactNodeViewConstructor,
} from "@nytimes/react-prosemirror";

function ImageNode({ node }: NodeViewComponentProps) {
  return (
    <div className="my-4 flex flex-col gap-2">
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
        <AlignmentButton alignment="left" />
        <AlignmentButton alignment="center" />
        <AlignmentButton alignment="right" />
      </div>
    </div>
  );
}

export const image: ReactNodeViewConstructor = () => {
  const dom = document.createElement("div");
  return {
    dom,
    component: ImageNode,
    // Prevent ProseMirror from handling events from within the
    // node view's buttons
    stopEvent(e) {
      if (!(e instanceof MouseEvent)) return false;
      if (!(e.target instanceof HTMLElement)) return false;
      let el = e.target.parentElement;
      while (el) {
        if (el.dataset.pmControls) return true;
        el = el.parentElement;
      }
      return false;
    },
  };
};
