"use client";

import { Schema } from "prosemirror-model";
import { CardNodeView } from "./CardNodeView";
import { useDeferredValue, useState } from "react";
import { EditorState } from "prosemirror-state";
import {
  ProseMirror,
  ProseMirrorDoc,
  reactKeys,
} from "@handlewithcare/react-prosemirror";

import "prosemirror-view/style/prosemirror.css";

const schema = new Schema({
  nodes: {
    doc: {
      content: "card+",
    },
    text: {},
    card: {
      content: "text*",
      toDOM() {
        return ["div", { "data-node-type": "card" }, 0];
      },
    },
  },
});

const doc = schema.nodes.doc.create({}, [
  schema.nodes.card.create(
    {},
    schema.text(
      "This is a demo editor that uses Transitions. Again, I've intentionally introduced ~20 ms of lag per render to imitate a complex React component with a slow render function.",
    ),
  ),
  schema.nodes.card.create(
    {},
    schema.text("As you type, every node that renders will flash."),
  ),
  schema.nodes.card.create(
    {},
    schema.text(
      "Notice how only the main editor flashes immediately on every change. If you type one character at a time, you'll see the preview editor flash a moment later. If you type several characters very quickly, you'll see that the preview editor does not flash at all until you pause for a moment.",
    ),
  ),
]);

const nodeViews = {
  card: CardNodeView,
};

export function EditorWithTransition() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.create({ schema, doc, plugins: [reactKeys()] }),
  );
  const deferredEditorState = useDeferredValue(editorState);

  return (
    <div className="flex items-center">
      <aside className="flex-1/4 text-[22%]">
        <ProseMirror static state={deferredEditorState} nodeViews={nodeViews}>
          <ProseMirrorDoc />
        </ProseMirror>
      </aside>
      <article className="flex-3/4">
        <ProseMirror
          state={editorState}
          dispatchTransaction={function (tr) {
            setEditorState((prev) => prev.apply(tr));
          }}
          nodeViews={nodeViews}
          attributes={{
            style: "outline: none;",
          }}
        >
          <ProseMirrorDoc />
        </ProseMirror>
      </article>
    </div>
  );
}
