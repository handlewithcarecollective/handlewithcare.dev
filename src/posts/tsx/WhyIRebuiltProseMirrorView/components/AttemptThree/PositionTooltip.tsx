import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";

interface Props {
  view: EditorView | null;
  state: EditorState;
}

export function PositionTooltip({ view, state }: Props) {
  const position = state.selection.anchor;
  const coords =
    position !== undefined ? view?.coordsAtPos(position) : undefined;

  if (!coords) return null;

  return (
    <div
      className="absolute hidden -translate-x-1/2 -translate-y-full transform rounded bg-white p-1 text-xs shadow-md group-focus-within/demo:block"
      style={{ top: coords.top + window.scrollY, left: coords.left }}
    >
      pos: {position}
    </div>
  );
}
