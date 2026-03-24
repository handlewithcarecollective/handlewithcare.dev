import type { ReactNode } from "react";
import type { UseEditorViewOptions } from "../hooks/useEditorView.js";
export interface EditorProps extends UseEditorViewOptions {
    mount: HTMLElement | null;
    children?: ReactNode | null;
}
export declare function Editor({ mount, children, ...options }: EditorProps): JSX.Element;
