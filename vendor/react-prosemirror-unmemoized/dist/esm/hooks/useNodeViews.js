import React, { useCallback, useMemo, useState } from "react";
import { NodeViews } from "../components/NodeViews.js";
import { createReactNodeViewConstructor, findNodeKeyUp } from "../nodeViews/createReactNodeViewConstructor.js";
export function useNodeViews(nodeViews) {
    const [portals, setPortals] = useState({});
    const registerPortal = useCallback((view, getPos, portal)=>{
        const nearestAncestorKey = findNodeKeyUp(view, getPos());
        setPortals((oldPortals)=>{
            const oldChildPortals = oldPortals[nearestAncestorKey] ?? [];
            const newChildPortals = oldChildPortals.concat({
                getPos,
                portal
            });
            return {
                ...oldPortals,
                [nearestAncestorKey]: newChildPortals
            };
        });
        return ()=>{
            setPortals((oldPortals)=>{
                const oldChildPortals = oldPortals[nearestAncestorKey] ?? [];
                const newChildPortals = oldChildPortals.filter((param)=>{
                    let { portal: p  } = param;
                    return p !== portal;
                });
                return {
                    ...oldPortals,
                    [nearestAncestorKey]: newChildPortals
                };
            });
        };
    }, []);
    const reactNodeViews = useMemo(()=>{
        const nodeViewEntries = Object.entries(nodeViews);
        const reactNodeViewEntries = nodeViewEntries.map((param)=>{
            let [name, constructor] = param;
            return [
                name,
                createReactNodeViewConstructor(constructor, registerPortal)
            ];
        });
        return Object.fromEntries(reactNodeViewEntries);
    }, [
        nodeViews,
        registerPortal
    ]);
    return {
        nodeViews: reactNodeViews,
        renderNodeViews: ()=>/*#__PURE__*/ React.createElement(NodeViews, {
                portals: portals
            })
    };
}
