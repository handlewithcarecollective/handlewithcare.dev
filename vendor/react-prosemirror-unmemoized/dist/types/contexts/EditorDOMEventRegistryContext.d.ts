import { DependencyList } from "react";
import { DOMEventMap, EventHandler } from "../plugins/createReactEventPlugin";
/**
 * Produces a plugin that can be used with ProseMirror to handle DOM
 * events at the EditorView.dom element.
 *
 * - `reactEventsPlugin` is a ProseMirror plugin for handling DOM events
 * at the EditorView.dom element. It should be passed to `useEditorView`,
 * along with any other plugins.
 *
 * - 'registry' should be passed as the value to
 * `EditorDOMEventRegistryContext`.
 */
export declare function useReactEventPlugin(): {
    editorDOMEventRegistry: {
        register: (eventType: keyof DOMEventMap, handler: EventHandler) => void;
        unregister: (eventType: keyof DOMEventMap, handler: EventHandler) => void;
    };
    reactEventPlugin: import("prosemirror-state").Plugin<any>;
};
interface EditorDOMEventRegistryContextValue {
    register<EventType extends keyof DOMEventMap>(eventType: EventType, handler: EventHandler<EventType>): void;
    unregister<EventType extends keyof DOMEventMap>(eventType: EventType, handler: EventHandler<EventType>): void;
}
export declare const EditorDOMEventsProvider: import("react").Provider<EditorDOMEventRegistryContextValue>;
export declare function useEditorDOMEvent<EventType extends keyof DOMEventMap>(eventType: EventType, handler: EventHandler<EventType>, deps?: DependencyList): void;
export {};
