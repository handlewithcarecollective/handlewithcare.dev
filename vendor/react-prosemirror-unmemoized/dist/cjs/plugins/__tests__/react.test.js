/* eslint-disable @typescript-eslint/no-non-null-assertion */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _prosemirrorModel = require("prosemirror-model");
const _prosemirrorState = require("prosemirror-state");
const _prosemirrorTransform = require("prosemirror-transform");
const _reactJs = require("../react.js");
const schema = new _prosemirrorModel.Schema({
    nodes: {
        doc: {
            content: "block+"
        },
        paragraph: {
            group: "block",
            content: "inline*"
        },
        list: {
            group: "block",
            content: "list_item+"
        },
        list_item: {
            content: "paragraph+"
        },
        text: {
            group: "inline"
        }
    }
});
describe("reactNodeViewPlugin", ()=>{
    it("should create a unique key for each node", ()=>{
        const editorState = _prosemirrorState.EditorState.create({
            doc: schema.topNodeType.create(null, [
                schema.nodes.paragraph.create(),
                schema.nodes.paragraph.create(),
                schema.nodes.paragraph.create()
            ]),
            plugins: [
                (0, _reactJs.react)()
            ]
        });
        const pluginState = _reactJs.reactPluginKey.getState(editorState);
        expect(pluginState.posToKey.size).toBe(3);
    });
    it("should maintain key stability when possible", ()=>{
        const initialEditorState = _prosemirrorState.EditorState.create({
            doc: schema.topNodeType.create(null, [
                schema.nodes.paragraph.create(),
                schema.nodes.paragraph.create(),
                schema.nodes.paragraph.create()
            ]),
            plugins: [
                (0, _reactJs.react)()
            ]
        });
        const initialPluginState = _reactJs.reactPluginKey.getState(initialEditorState);
        const nextEditorState = initialEditorState.apply(initialEditorState.tr.insertText("Hello, world!", 1));
        const nextPluginState = _reactJs.reactPluginKey.getState(nextEditorState);
        expect(Array.from(nextPluginState.keyToPos.keys())).toEqual(Array.from(initialPluginState.keyToPos.keys()));
    });
    it("should create unique keys for new nodes", ()=>{
        const initialEditorState = _prosemirrorState.EditorState.create({
            doc: schema.topNodeType.create(null, [
                schema.nodes.paragraph.create(),
                schema.nodes.paragraph.create(),
                schema.nodes.paragraph.create()
            ]),
            plugins: [
                (0, _reactJs.react)()
            ]
        });
        const initialPluginState = _reactJs.reactPluginKey.getState(initialEditorState);
        const nextEditorState = initialEditorState.apply(initialEditorState.tr.insert(0, schema.nodes.list.createAndFill()));
        const nextPluginState = _reactJs.reactPluginKey.getState(nextEditorState);
        // Adds new keys for new nodes
        expect(nextPluginState.keyToPos.size).toBe(6);
        // Maintains keys for previous nodes that are still there
        Array.from(initialPluginState.keyToPos.keys()).forEach((key)=>{
            expect(Array.from(nextPluginState.keyToPos.keys())).toContain(key);
        });
    });
    it("should maintain key stability when splitting a node", ()=>{
        const initialEditorState = _prosemirrorState.EditorState.create({
            doc: schema.topNodeType.create(null, [
                schema.nodes.list.create(null, [
                    schema.nodes.list_item.create(null, [
                        schema.nodes.paragraph.create(null, [
                            schema.text("first")
                        ])
                    ])
                ])
            ]),
            plugins: [
                (0, _reactJs.react)()
            ]
        });
        const initialPluginState = _reactJs.reactPluginKey.getState(initialEditorState);
        const nextEditorState = initialEditorState.apply(initialEditorState.tr.insert(1, schema.nodes.list_item.create(null, [
            schema.nodes.paragraph.create(null, [
                schema.text("second")
            ])
        ])));
        const nextPluginState = _reactJs.reactPluginKey.getState(nextEditorState);
        // The new list item was inserted before the original one,
        // pushing it further into the document. The original list
        // item should keep its original key, and the new list item
        // should be assigned a new one
        expect(nextPluginState.posToKey.get(11)).toBe(initialPluginState.posToKey.get(1));
        expect(nextPluginState.posToKey.get(1)).not.toBe(initialPluginState.posToKey.get(1));
    });
    it("should maintain key stability when wrapping a node", ()=>{
        const initialEditorState = _prosemirrorState.EditorState.create({
            doc: schema.topNodeType.create(null, [
                schema.nodes.paragraph.create(null, [
                    schema.text("content")
                ])
            ]),
            plugins: [
                (0, _reactJs.react)()
            ]
        });
        const initialPluginState = _reactJs.reactPluginKey.getState(initialEditorState);
        const start = 1;
        const end = 9;
        const tr = initialEditorState.tr.delete(start, end);
        const $start = tr.doc.resolve(start);
        const range = $start.blockRange();
        const wrapping = range && (0, _prosemirrorTransform.findWrapping)(range, schema.nodes.list, null);
        tr.wrap(range, wrapping);
        const nextEditorState = initialEditorState.apply(tr);
        const nextPluginState = _reactJs.reactPluginKey.getState(nextEditorState);
        // The new list and list item nodes were wrapped around the
        // paragraph, pushing it further into the document. The paragraph
        // should keep its original key, and the new nodes
        // should be assigned a new one
        expect(nextPluginState.posToKey.get(2)).toBe(initialPluginState.posToKey.get(0));
        expect(nextPluginState.posToKey.get(0)).not.toBe(initialPluginState.posToKey.get(0));
    });
});
