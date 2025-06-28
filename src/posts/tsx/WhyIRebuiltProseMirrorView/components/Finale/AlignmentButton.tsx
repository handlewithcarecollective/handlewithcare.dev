import { useEditorEventCallback } from "@handlewithcare/react-prosemirror";

interface Props {
  alignment: string;
  getPos: () => number;
}

export function AlignmentButton({ alignment, getPos }: Props) {
  const handleClick = useEditorEventCallback((view) => {
    view.dispatch(
      view.state.tr.setNodeAttribute(getPos(), "alignment", alignment),
    );
  });

  return (
    <button
      className="rounded bg-gray-100 px-2 py-1"
      type="button"
      onClick={handleClick}
    >
      {alignment[0].toUpperCase() + alignment.slice(1)}
    </button>
  );
}
