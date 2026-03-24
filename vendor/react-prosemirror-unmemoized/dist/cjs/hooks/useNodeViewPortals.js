"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useNodeViewPortals", {
    enumerable: true,
    get: ()=>useNodeViewPortals
});
const _react = require("react");
const _reactDom = require("react-dom");
function useNodeViewPortals() {
    const [portals, setPortals] = (0, _react.useState)([]);
    const registerPortal = (0, _react.useCallback)((child, container, key)=>{
        const portal = (0, _reactDom.createPortal)(child, container, key);
        setPortals((oldPortals)=>oldPortals.concat(portal));
        return ()=>{
            setPortals((oldPortals)=>oldPortals.filter((p)=>p !== portal));
        };
    }, []);
    return {
        portals,
        registerPortal
    };
}
