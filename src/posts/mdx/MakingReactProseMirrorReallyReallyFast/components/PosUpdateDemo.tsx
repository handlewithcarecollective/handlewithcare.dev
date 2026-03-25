"use client";

import {
  NodeViewComponentProps,
  ProseMirror,
  ProseMirrorDoc,
  useEditorState,
} from "@handlewithcare/react-prosemirror";
import { EditorState } from "prosemirror-state";
import { schema } from "./schema";
import cx from "classnames";

const doc = schema.nodes.doc.create({}, [
  schema.nodes.paragraph.create(
    {},
    schema.text(
      "This is a simple document with a few paragraphs. Each paragraph has a number next to it representing its start position.",
    ),
  ),
  schema.nodes.paragraph.create(
    {},
    schema.text("Try typing a few characters in it."),
  ),
  schema.nodes.paragraph.create(
    {},
    schema.text(
      "Notice how if you type in an early paragraph, the position of each paragraph after the one you’re typing in will update",
    ),
  ),
]);

function Paragraph({
  nodeProps,
  ref,
  children,
  ...props
}: NodeViewComponentProps) {
  useEditorState();
  const pos = nodeProps.getPos();
  return (
    <div
      ref={ref}
      {...props}
      className={cx(props.className, "flex flex-row items-baseline gap-2")}
    >
      <div className="w-6 shrink-0 text-sm opacity-85">{pos}</div>
      <p>{children}</p>
    </div>
  );
}

const nodeViews = {
  paragraph: Paragraph,
};

export function PosUpdateDemo() {
  return (
    <ProseMirror
      defaultState={EditorState.create({ doc })}
      nodeViews={nodeViews}
      attributes={{
        class:
          "border-brown focus-within:border-green max-h-96 overflow-auto rounded-2xl border-2 p-4 [&_.ProseMirror]:outline-none [&_p]:my-4 bg-white/70",
      }}
    >
      <ProseMirrorDoc />
    </ProseMirror>
  );
}
