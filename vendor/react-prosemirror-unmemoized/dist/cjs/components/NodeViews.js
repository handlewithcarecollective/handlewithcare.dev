"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "NodeViews", {
    enumerable: true,
    get: ()=>NodeViews
});
const _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
const _nodeViewsContextJs = require("../contexts/NodeViewsContext.js");
const _useEditorEffectJs = require("../hooks/useEditorEffect.js");
const _reactJs = require("../plugins/react.js");
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interopRequireWildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
function NodeViews(param) {
    let { portals  } = param;
    const rootRegisteredPortals = portals[_reactJs.ROOT_NODE_KEY];
    const [rootPortals, setRootPortals] = (0, _react.useState)(rootRegisteredPortals?.map((param)=>{
        let { portal  } = param;
        return portal;
    }) ?? []);
    // `getPos` is technically derived from the EditorView
    // state, so it's not safe to call until after the EditorView
    // has been updated
    (0, _useEditorEffectJs.useEditorEffect)(()=>{
        setRootPortals(rootRegisteredPortals?.sort((a, b)=>a.getPos() - b.getPos()).map((param)=>{
            let { portal  } = param;
            return portal;
        }) ?? []);
    }, [
        rootRegisteredPortals
    ]);
    return /*#__PURE__*/ _react.default.createElement(_nodeViewsContextJs.NodeViewsContext.Provider, {
        value: portals
    }, rootPortals);
}
