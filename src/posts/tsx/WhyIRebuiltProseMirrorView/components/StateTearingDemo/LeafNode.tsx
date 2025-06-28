import {
  NodeViewComponentProps,
  ReactNodeViewConstructor,
  useEditorEventCallback,
  useNodePos,
} from "@nytimes/react-prosemirror";
import { ChangeEvent } from "react";

function LeafNode({ node }: NodeViewComponentProps) {
  const pos = useNodePos();
  const handleTextChange = useEditorEventCallback(
    (view, event: ChangeEvent<HTMLInputElement>) => {
      view.dispatch(
        view.state.tr.setNodeAttribute(pos, "text", event.target.value),
      );
    },
  );

  return (
    <div
      contentEditable={false}
      className="my-2 flex flex-col items-start gap-2 rounded bg-gray-800 p-2 text-white"
    >
      <p>{node.attrs.text || <br />}</p>
      <div className="flex gap-4 text-black">
        <input
          className="bg-white"
          value={node.attrs.text}
          onChange={handleTextChange}
        />
      </div>
    </div>
  );
}

export const leaf: ReactNodeViewConstructor = () => {
  const dom = document.createElement("div");
  return {
    dom,
    component: LeafNode,
    stopEvent() {
      return true;
    },
  };
};
