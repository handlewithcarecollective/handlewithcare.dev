"use client";

import { ProseMirror, ProseMirrorDoc } from "@handlewithcare/react-prosemirror";

import { useState } from "react";
import { EditorState } from "prosemirror-state";
import { doc } from "./doc";
import { plugins } from "./plugins";
import { LeafNode } from "./LeafNode";
import { PositionTooltip } from "./PositionTooltip";
import { ImageNode } from "./ImageNode";

const nodeViews = {
  leaf: LeafNode,
  image: ImageNode,
};

export function Editor() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.create({
      doc,
      plugins,
    }),
  );

  return (
    <ProseMirror
      state={editorState}
      dispatchTransaction={(tr) => {
        setEditorState((prev) => prev.apply(tr));
      }}
      nodeViews={nodeViews}
    >
      <ProseMirrorDoc />
      <PositionTooltip />
    </ProseMirror>
  );
}
