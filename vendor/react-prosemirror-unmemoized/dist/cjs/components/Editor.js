"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Editor", {
    enumerable: true,
    get: ()=>Editor
});
const _react = /*#__PURE__*/ _interopRequireDefault(require("react"));
const _editorContextJs = require("../contexts/EditorContext.js");
const _useEditorViewJs = require("../hooks/useEditorView.js");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function Editor(param) {
    let { mount , children , ...options } = param;
    const value = (0, _useEditorViewJs.useEditorView)(mount, options);
    return /*#__PURE__*/ _react.default.createElement(_editorContextJs.EditorContext.Provider, {
        value: value
    }, children);
}
