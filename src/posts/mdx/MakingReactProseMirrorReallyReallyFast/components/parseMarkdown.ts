import { unified } from "unified";
import remarkParse from "remark-parse";
import {
  remarkProseMirror,
  RemarkProseMirrorOptions,
  toPmMark,
  toPmNode,
} from "@handlewithcare/remark-prosemirror";
import { schema } from "./schema";

const remarkProseMirrorOptions: RemarkProseMirrorOptions = {
  schema,
  handlers: {
    paragraph: toPmNode(schema.nodes.paragraph),
    heading: toPmNode(schema.nodes.heading, (node) => ({
      level: node.depth,
    })),
    code(node) {
      return schema.nodes.blockquote.create(
        {},
        schema.nodes.paragraph.create({}, schema.text(node.value)),
      );
    },
    emphasis: toPmMark(schema.marks.em),
    strong: toPmMark(schema.marks.strong),

    thematicBreak: toPmNode(schema.nodes.paragraph),
  },
};

export async function parseDoc(content: string) {
  return await unified()
    .use(remarkParse)
    .use(remarkProseMirror, remarkProseMirrorOptions)
    .process(content)
    .then(({ result }) => result);
}
