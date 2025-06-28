import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { useLayoutEffect, useState } from "react";

interface Props {
  view: EditorView | null;
  state: EditorState;
}

export function PositionTooltip({ view }: Props) {
  const position = view?.state.selection.anchor;
  const [top, setTop] = useState<number | null>(null);
  const [left, setLeft] = useState<number | null>(null);

  useLayoutEffect(() => {
    if (position === undefined || !view) return;

    const coords = view.coordsAtPos(position);

    setTop(coords.top);
    setLeft(coords.left);
  }, [position, view]);

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
