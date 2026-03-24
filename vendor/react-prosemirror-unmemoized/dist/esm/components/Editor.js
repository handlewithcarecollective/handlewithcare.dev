import React from "react";
import { EditorContext } from "../contexts/EditorContext.js";
import { useEditorView } from "../hooks/useEditorView.js";
export function Editor(param) {
    let { mount , children , ...options } = param;
    const value = useEditorView(mount, options);
    return /*#__PURE__*/ React.createElement(EditorContext.Provider, {
        value: value
    }, children);
}
