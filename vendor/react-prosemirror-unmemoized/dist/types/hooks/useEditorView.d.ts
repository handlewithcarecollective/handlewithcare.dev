import { EditorState } from "prosemirror-state";
import type { Plugin, Transaction } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import type { EditorProps } from "prosemirror-view";
import type { EditorContextValue } from "../contexts/EditorContext.js";
export interface UseEditorViewOptions extends EditorProps {
    defaultState?: EditorState;
    state?: EditorState;
    plugins?: Plugin[];
    dispatchTransaction?(this: EditorView, tr: Transaction): void;
}
/**
 * Creates, mounts, and manages a ProseMirror `EditorView`.
 *
 * All state and props updates are executed in a layout effect.
 * To ensure that the EditorState and EditorView are never out of
 * sync, it's important that the EditorView produced by this hook
 * is only accessed through the provided hooks.
 */
export declare function useEditorView<T extends HTMLElement = HTMLElement>(mount: T | null, options: UseEditorViewOptions): EditorContextValue;
