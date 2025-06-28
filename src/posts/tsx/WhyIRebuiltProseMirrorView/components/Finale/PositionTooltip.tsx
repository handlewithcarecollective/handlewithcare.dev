import {
  useEditorEffect,
  useEditorState,
} from "@handlewithcare/react-prosemirror";
import { useState } from "react";

export function PositionTooltip() {
  const editorState = useEditorState();
  const position = editorState.selection.anchor;
  const [top, setTop] = useState<number | null>(null);
  const [left, setLeft] = useState<number | null>(null);

  useEditorEffect(
    (view) => {
      if (position === undefined) return;

      const coords = view.coordsAtPos(position);

      setTop(coords.top);
      setLeft(coords.left);
    },
    [position],
  );

  if (top === null || left === null) return null;

  return (
    <div
      className="absolute hidden -translate-x-1/2 -translate-y-full transform rounded bg-white p-1 text-xs shadow-md group-focus-within/demo:block"
      style={{ top: top + window.scrollY, left: left }}
    >
      pos: {position}
    </div>
  );
}
