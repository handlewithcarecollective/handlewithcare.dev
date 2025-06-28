"use client";

import { ProseMirror, useNodeViews } from "@nytimes/react-prosemirror";

import { useState } from "react";
import { EditorState } from "prosemirror-state";
import { doc } from "./doc";
import { plugins } from "./plugins";
import { leaf } from "./LeafNode";

const reactNodeViews = {
  leaf,
};

export function Editor() {
  const [mount, setMount] = useState<HTMLDivElement | null>(null);
  const { nodeViews, renderNodeViews } = useNodeViews(reactNodeViews);
  const [editorState, setEditorState] = useState(() =>
    EditorState.create({
      doc,
      plugins,
    }),
  );

  return (
    <ProseMirror
      mount={mount}
      state={editorState}
      dispatchTransaction={(tr) => {
        setEditorState((prev) => prev.apply(tr));
      }}
      nodeViews={nodeViews}
    >
      <div ref={setMount} />
      {renderNodeViews()}
    </ProseMirror>
  );
}
