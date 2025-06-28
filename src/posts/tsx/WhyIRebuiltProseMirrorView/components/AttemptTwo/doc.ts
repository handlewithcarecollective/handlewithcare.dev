import { schema } from "prosemirror-schema-basic";

export { schema };

export const doc = schema.nodes.doc.create({}, [
  schema.nodes.paragraph.create({}, [
    schema.text("This is a "),
    schema.text("rich text editor", [schema.marks.strong.create()]),
    schema.text(". You can type in it!"),
  ]),
  schema.nodes.paragraph.create({}, schema.text("Not bad, right?")),
]);
