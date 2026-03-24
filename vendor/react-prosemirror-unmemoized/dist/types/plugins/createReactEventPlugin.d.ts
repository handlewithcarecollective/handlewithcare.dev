import { Plugin } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
export interface DOMEventMap extends HTMLElementEventMap {
    [event: string]: Event;
}
export type EventHandler<EventType extends keyof DOMEventMap = keyof DOMEventMap> = (view: EditorView, event: DOMEventMap[EventType]) => boolean | void;
export declare function createReactEventPlugin(eventHandlerRegistry: Map<keyof DOMEventMap, Set<EventHandler>>): Plugin<any>;
