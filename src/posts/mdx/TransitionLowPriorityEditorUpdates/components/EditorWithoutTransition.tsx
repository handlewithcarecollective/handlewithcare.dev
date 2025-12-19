"use client";

import { Schema } from "prosemirror-model";
import { CardNodeView } from "./CardNodeView";
import { useState } from "react";
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
      "This is a demo editor. I've intentionally introduced ~20 ms of lag per render to imitate a complex React component with a slow render function.",
    ),
  ),
  schema.nodes.card.create(
    {},
    schema.text("As you type, every node that renders will flash."),
  ),
  schema.nodes.card.create(
    {},
    schema.text(
      "Notice how the main and preview editors both flash immediately on every change. If you type quickly, both cards will be highlighted continuously.",
    ),
  ),
]);

const nodeViews = {
  card: CardNodeView,
};

export function EditorWithoutTransition() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.create({ schema, doc, plugins: [reactKeys()] }),
  );

  return (
    <div className="flex items-center">
      <aside className="flex-1/4 text-[22%]">
        <ProseMirror static state={editorState} nodeViews={nodeViews}>
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
