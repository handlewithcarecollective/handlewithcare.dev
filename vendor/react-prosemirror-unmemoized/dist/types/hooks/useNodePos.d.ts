import type { ReactNode } from "react";
import type { NodeKey } from "../plugins/react.js";
type Props = {
    nodeKey: NodeKey;
    children: ReactNode;
};
export declare function NodePosProvider({ nodeKey, children }: Props): JSX.Element;
export declare function useNodePos(): number;
export {};
