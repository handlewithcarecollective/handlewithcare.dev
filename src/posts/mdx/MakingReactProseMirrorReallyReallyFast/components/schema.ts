import { Schema } from "prosemirror-model";

export const schema = new Schema({
  nodes: {
    doc: { content: "block+" },
    text: { group: "inline" },
    paragraph: {
      group: "block",
      content: "inline*",
      toDOM() {
        return ["p", 0];
      },
      parseDOM: [{ tag: "p" }],
    },
    heading: {
      group: "block",
      content: "inline*",
      attrs: {
        level: { default: 1, validate: "number" },
      },
      toDOM(node) {
        return [`h${node.attrs.level}`, 0];
      },
      parseDOM: [
        { tag: "h1", attrs: { level: 1 } },
        { tag: "h2", attrs: { level: 2 } },
        { tag: "h3", attrs: { level: 3 } },
        { tag: "h4", attrs: { level: 4 } },
        { tag: "h5", attrs: { level: 5 } },
        { tag: "h6", attrs: { level: 6 } },
      ],
    },
    blockquote: {
      group: "block",
      content: "paragraph+",
      defining: true,
      toDOM() {
        return ["blockquote", 0];
      },
      parseDOM: [{ tag: "blockquote" }],
    },
  },
  marks: {
    em: {
      toDOM() {
        return ["em"];
      },
      parseDOM: [
        {
          tag: "em",
        },
      ],
    },
    strong: {
      toDOM() {
        return ["strong"];
      },
      parseDOM: [
        {
          tag: "strong",
        },
      ],
    },
  },
});
