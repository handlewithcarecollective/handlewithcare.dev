import { ReactPortal } from "react";
import { RegisterElement } from "../nodeViews/createReactNodeViewConstructor.js";
/**
 * Provides an array of React portals and a callback for registering
 * new portals.
 *
 * The `registerPortal` callback is meant to be passed to
 * `createNodeViewConstructor` as the `registerElement` argument. The
 * `portals` array should be passed as children to the `ProseMirror`
 * component.
 */
export declare function useNodeViewPortals(): {
    portals: ReactPortal[];
    registerPortal: RegisterElement;
};
