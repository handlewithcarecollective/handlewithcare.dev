import {
  NodeViewComponentProps,
  useEditorEventCallback,
  useStopEvent,
} from "@handlewithcare/react-prosemirror";
import { ChangeEvent, forwardRef } from "react";
import cx from "classnames";

export const LeafNode = forwardRef<HTMLDivElement, NodeViewComponentProps>(
  function LeafNode({ nodeProps, ...props }, ref) {
    useStopEvent(() => {
      return true;
    });

    const handleTextChange = useEditorEventCallback(
      (view, event: ChangeEvent<HTMLInputElement>) => {
        view.dispatch(
          view.state.tr.setNodeAttribute(
            nodeProps.getPos(),
            "text",
            event.target.value,
          ),
        );
      },
    );

    return (
      <div
        ref={ref}
        {...props}
        contentEditable={false}
        className={cx(
          "my-2 flex flex-col items-start gap-2 rounded bg-gray-800 p-2 text-white",
          props.className,
        )}
      >
        <p>{nodeProps.node.attrs.text || <br />}</p>
        <div className="flex gap-4 text-black">
          <input
            className="bg-white"
            value={nodeProps.node.attrs.text}
            onChange={handleTextChange}
          />
        </div>
      </div>
    );
  },
);
