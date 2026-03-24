import React, { useState } from "react";
import { NodeViewsContext } from "../contexts/NodeViewsContext.js";
import { useEditorEffect } from "../hooks/useEditorEffect.js";
import { ROOT_NODE_KEY } from "../plugins/react.js";
export function NodeViews(param) {
    let { portals  } = param;
    const rootRegisteredPortals = portals[ROOT_NODE_KEY];
    const [rootPortals, setRootPortals] = useState(rootRegisteredPortals?.map((param)=>{
        let { portal  } = param;
        return portal;
    }) ?? []);
    // `getPos` is technically derived from the EditorView
    // state, so it's not safe to call until after the EditorView
    // has been updated
    useEditorEffect(()=>{
        setRootPortals(rootRegisteredPortals?.sort((a, b)=>a.getPos() - b.getPos()).map((param)=>{
            let { portal  } = param;
            return portal;
        }) ?? []);
    }, [
        rootRegisteredPortals
    ]);
    return /*#__PURE__*/ React.createElement(NodeViewsContext.Provider, {
        value: portals
    }, rootPortals);
}
