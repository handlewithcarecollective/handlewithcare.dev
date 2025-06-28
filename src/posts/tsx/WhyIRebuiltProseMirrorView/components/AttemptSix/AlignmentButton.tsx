import { EditorView } from "prosemirror-view";

interface Props {
  alignment: string;
  view: EditorView;
  getPos: () => number | undefined;
}

export function AlignmentButton({ alignment, view, getPos }: Props) {
  return (
    <button
      className="rounded bg-gray-100 px-2 py-1"
      type="button"
      onClick={() => {
        view.dispatch(
          view.state.tr.setNodeAttribute(getPos()!, "alignment", alignment),
        );
      }}
    >
      {alignment[0].toUpperCase() + alignment.slice(1)}
    </button>
  );
}
