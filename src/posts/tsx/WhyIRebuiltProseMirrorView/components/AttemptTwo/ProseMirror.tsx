"use client";

import { useLayoutEffect, useRef } from "react";
import { EditorView } from "prosemirror-view";
import { EditorState } from "prosemirror-state";
import { doc } from "./doc";
import { plugins } from "./plugins";
import { PositionTooltip } from "./PositionTooltip";

export function ProseMirror() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const viewRef = useRef<EditorView | null>(null);

  useLayoutEffect(() => {
    if (!mountRef.current) {
      viewRef.current?.destroy();
      viewRef.current = null;
      return;
    }

    viewRef.current = new EditorView(mountRef.current, {
      state: EditorState.create({
        doc,
        plugins,
      }),
    });
  }, []);

  return (
    <>
      <div ref={mountRef} />
      <PositionTooltip view={viewRef.current} />
    </>
  );
}
