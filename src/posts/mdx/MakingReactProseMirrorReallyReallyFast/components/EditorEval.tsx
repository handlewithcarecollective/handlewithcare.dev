import { EditorState, Plugin } from "prosemirror-state";
import { createContext, ReactNode, useState } from "react";
import { parseDoc } from "./parseMarkdown";

interface Props {
  children: ReactNode;
  reactKeysPlugin: () => Plugin;
}

export function EditorEval({ children, reactKeysPlugin }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState<EditorState | null>(null);
  const [editing, setEditing] = useState(false);

  if (!state) {
    return (
      <div>
        <button
          type="button"
          onClick={async () => {
            setIsLoading(true);
            const res = await fetch(
              "/static/making-react-prosemirror-really-really-fast-doc-content.md",
            );

            if (!res.ok) {
              setIsLoading(false);
            }

            const content = await res.text();
            const doc = await parseDoc(content);
            setState(EditorState.create({ doc, plugins: [reactKeysPlugin()] }));
            setIsLoading(false);
            setEditing(true);
          }}
          disabled={isLoading}
          className="border-brown hover:bg-brown/10 h-96 w-full overflow-auto rounded-2xl border-2 p-4 [&_p]:my-4"
        >
          {isLoading ? "Loading..." : "Load editor"}
        </button>
      </div>
    );
  }

  if (!editing) {
    return (
      <button
        onClick={() => {
          setEditing(true);
        }}
        className="[&_h1,&_h2,&_h3]:font-headings border-brown hover:bg-brown/10 max-h-96 overflow-auto rounded-2xl border-2 p-4 text-left opacity-70 [&_p]:my-4"
      >
        {state.doc.children.map((child) => {
          if (child.type.name === "paragraph") {
            return <p>{child.textContent}</p>;
          }
          if (child.type.name === "heading") {
            const Component = `h${child.attrs.level}`;
            // @ts-expect-error
            return <Component>{child.textContent}</Component>;
          }
          if (child.type.name === "blockquote") {
            return (
              <blockquote>
                <p>{child.textContent}</p>
              </blockquote>
            );
          }
        })}
      </button>
    );
  }

  return (
    <StateContext value={state}>
      <div
        onBlur={(event) => {
          setEditing(false);
        }}
        className="border-brown focus-within:border-green hover:bg-brown/10 max-h-96 overflow-auto rounded-2xl border-2 p-4 [&_.ProseMirror]:outline-none [&_p]:my-4"
      >
        {children}
      </div>
    </StateContext>
  );
}

export const StateContext = createContext(null as unknown as EditorState);
