import { Node } from "prosemirror-model";
import { EditorView, NodeViewConstructor } from "prosemirror-view";
import { createRoot } from "react-dom/client";
import cx from "classnames";

import { AlignmentButton } from "./AlignmentButton";

interface Props {
  node: Node;
  view: EditorView;
  getPos: () => number | undefined;
}

function ImageNode({ node, view, getPos }: Props) {
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
        <AlignmentButton alignment="left" view={view} getPos={getPos} />
        <AlignmentButton alignment="center" view={view} getPos={getPos} />
        <AlignmentButton alignment="right" view={view} getPos={getPos} />
      </div>
    </div>
  );
}

export const image: NodeViewConstructor = (node, view, getPos) => {
  const dom = document.createElement("div");
  const root = createRoot(dom);
  root.render(<ImageNode node={node} view={view} getPos={getPos} />);
  return {
    dom,
    update(updatedNode) {
      if (updatedNode.type !== node.type) {
        return false;
      }
      root.render(<ImageNode node={updatedNode} view={view} getPos={getPos} />);
      return true;
    },
    destroy() {
      root.unmount();
    },
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
