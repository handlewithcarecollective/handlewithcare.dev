import { useEditorEventCallback, useNodePos } from "@nytimes/react-prosemirror";

interface Props {
  alignment: string;
}

export function AlignmentButton({ alignment }: Props) {
  const pos = useNodePos();

  const handleClick = useEditorEventCallback((view) => {
    view.dispatch(view.state.tr.setNodeAttribute(pos, "alignment", alignment));
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
