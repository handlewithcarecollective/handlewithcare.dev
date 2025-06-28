import { Schema } from "prosemirror-model";
import { nodes, marks } from "prosemirror-schema-basic";

export const schema = new Schema({
  nodes: {
    ...nodes,
    leaf: {
      group: "block",
      attrs: {
        text: { default: "", validate: "string" },
      },
      toDOM(node) {
        return ["p", node.attrs.text];
      },
    },
  },
  marks,
});

export const doc = schema.nodes.doc.create({}, [
  schema.nodes.paragraph.create({}, [
    schema.text("This is a "),
    schema.text("rich text editor", [schema.marks.strong.create()]),
  ]),
  schema.nodes.leaf.create({ text: "This is a leaf node" }),
]);
