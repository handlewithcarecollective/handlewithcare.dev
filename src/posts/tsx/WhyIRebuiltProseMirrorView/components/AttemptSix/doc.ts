import { Schema } from "prosemirror-model";
import { nodes, marks } from "prosemirror-schema-basic";

export const schema = new Schema({
  nodes: {
    ...nodes,
    image: {
      ...nodes.image,
      group: "block",
      inline: false,
      attrs: {
        ...nodes.image.attrs,
        alignment: { default: "left", validate: "string" },
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
  schema.nodes.image.create({ src: "/favicon.ico" }),
  schema.nodes.paragraph.create(
    {},
    schema.text("And it has align-able images!"),
  ),
]);
