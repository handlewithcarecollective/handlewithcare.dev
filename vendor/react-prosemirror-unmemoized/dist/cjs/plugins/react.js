"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    ROOT_NODE_KEY: ()=>ROOT_NODE_KEY,
    createNodeKey: ()=>createNodeKey,
    reactPluginKey: ()=>reactPluginKey,
    react: ()=>react
});
const _prosemirrorState = require("prosemirror-state");
const ROOT_NODE_KEY = Symbol("@nytimes/react-prosemirror/root-node-key");
function createNodeKey() {
    return Math.floor(Math.random() * 0xffffff).toString(16);
}
const reactPluginKey = new _prosemirrorState.PluginKey("@nytimes/react-prosemirror/react");
function react() {
    return new _prosemirrorState.Plugin({
        key: reactPluginKey,
        state: {
            init (_, state) {
                const next = {
                    posToKey: new Map(),
                    keyToPos: new Map()
                };
                state.doc.descendants((node, pos)=>{
                    if (node.isText) return false;
                    const key = createNodeKey();
                    next.posToKey.set(pos, key);
                    next.keyToPos.set(key, pos);
                    return true;
                });
                return next;
            },
            /**
       * Keeps node keys (mostly) stable across transactions.
       *
       * To accomplish this, we map each node position backwards
       * through the transaction to identify its previous position,
       * and thereby retrieve its previous key.
       */ apply (tr, value, _, newState) {
                if (!tr.docChanged) return value;
                const next = {
                    posToKey: new Map(),
                    keyToPos: new Map()
                };
                for (const [pos, key] of value.posToKey.entries()){
                    const { pos: newPos , deleted  } = tr.mapping.mapResult(pos);
                    if (deleted) continue;
                    next.posToKey.set(newPos, key);
                    next.keyToPos.set(key, newPos);
                }
                newState.doc.descendants((node, pos)=>{
                    if (node.isText) return false;
                    if (next.posToKey.has(pos)) return true;
                    const key = createNodeKey();
                    next.posToKey.set(pos, key);
                    next.keyToPos.set(key, pos);
                    return true;
                });
                return next;
            }
        }
    });
}
