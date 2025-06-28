"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { EditorView } from "prosemirror-view";
import { EditorState } from "prosemirror-state";
import { doc } from "./doc";
import { plugins } from "./plugins";
import { PositionTooltip } from "./PositionTooltip";

export function ProseMirror() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const viewRef = useRef<EditorView | null>(null);

  const [editorState, setEditorState] = useState(() =>
    EditorState.create({
      doc,
      plugins,
    }),
  );

  useLayoutEffect(() => {
    if (!mountRef.current) {
      viewRef.current?.destroy();
      viewRef.current = null;
      return;
    }

    if (!viewRef.current) {
      viewRef.current = new EditorView(mountRef.current, {
        state: editorState,
        dispatchTransaction(tr) {
          setEditorState(this.state.apply(tr));
        },
      });
      return;
    }

    viewRef.current.updateState(editorState);
  }, [editorState]);

  return (
    <>
      <div ref={mountRef} />
      <PositionTooltip view={viewRef.current} state={editorState} />
    </>
  );
}
