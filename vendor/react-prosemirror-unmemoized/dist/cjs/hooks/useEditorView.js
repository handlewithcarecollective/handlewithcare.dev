"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useEditorView", {
    enumerable: true,
    get: ()=>useEditorView
});
const _prosemirrorModel = require("prosemirror-model");
const _prosemirrorState = require("prosemirror-state");
const _prosemirrorView = require("prosemirror-view");
const _react = require("react");
const _reactDom = require("react-dom");
const _useComponentEventListenersJs = require("./useComponentEventListeners.js");
const EMPTY_SCHEMA = new _prosemirrorModel.Schema({
    nodes: {
        doc: {
            content: "text*"
        },
        text: {
            inline: true
        }
    }
});
const EMPTY_STATE = _prosemirrorState.EditorState.create({
    schema: EMPTY_SCHEMA
});
let didWarnValueDefaultValue = false;
function useEditorView(mount, options) {
    if (process.env.NODE_ENV !== "production") {
        if (options.defaultState !== undefined && options.state !== undefined && !didWarnValueDefaultValue) {
            console.error("A component contains a ProseMirror editor with both value and defaultValue props. " + "ProseMirror editors must be either controlled or uncontrolled " + "(specify either the state prop, or the defaultState prop, but not both). " + "Decide between using a controlled or uncontrolled ProseMirror editor " + "and remove one of these props. More info: " + "https://reactjs.org/link/controlled-components");
            didWarnValueDefaultValue = true;
        }
    }
    const defaultState = options.defaultState ?? EMPTY_STATE;
    const [_state, setState] = (0, _react.useState)(defaultState);
    const state = options.state ?? _state;
    const { componentEventListenersPlugin , registerEventListener , unregisterEventListener  } = (0, _useComponentEventListenersJs.useComponentEventListeners)();
    const plugins = (0, _react.useMemo)(()=>[
            ...options.plugins ?? [],
            componentEventListenersPlugin
        ], [
        options.plugins,
        componentEventListenersPlugin
    ]);
    function dispatchTransaction(tr) {
        (0, _reactDom.flushSync)(()=>{
            if (!options.state) {
                setState((s)=>s.apply(tr));
            }
            if (options.dispatchTransaction) {
                options.dispatchTransaction.call(this, tr);
            }
        });
    }
    const directEditorProps = {
        ...options,
        state,
        plugins,
        dispatchTransaction
    };
    const [view, setView] = (0, _react.useState)(null);
    (0, _react.useLayoutEffect)(()=>{
        return ()=>{
            if (view) {
                view.destroy();
            }
        };
    }, [
        view
    ]);
    // This effect runs on every render and handles the view lifecycle.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    (0, _react.useLayoutEffect)(()=>{
        if (view) {
            if (view.dom === mount) {
                view.setProps(directEditorProps);
            } else {
                setView(null);
            }
        } else if (mount) {
            setView(new _prosemirrorView.EditorView({
                mount
            }, directEditorProps));
        }
    });
    return (0, _react.useMemo)(()=>({
            editorState: state,
            editorView: view,
            registerEventListener,
            unregisterEventListener
        }), [
        state,
        view,
        registerEventListener,
        unregisterEventListener
    ]);
}
