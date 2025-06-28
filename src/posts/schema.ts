import { Block } from "codehike/blocks";
import { z } from "zod";

export const Schema = Block.extend({
  title: z.string(),
  date: z.string(),
  updated: z.optional(z.string()),
  author: z.string(),
  canonical: z.optional(z.string()),
  snippet: z.string(),
  slug: z.string(),
  sections: z.array(Block),
});
