import { z } from "zod";
import NoSuchThingIsomorphicLayoutEffect from "./mdx/NoSuchThingIsomorphicLayoutEffect.mdx";

import { Block, parseRoot } from "codehike/blocks";

const Schema = Block.extend({
  title: z.string(),
  date: z.string(),
  author: z.string(),
  canonical: z.optional(z.string()),
  snippet: z.string(),
  slug: z.string(),
  sections: z.array(Block),
});

export const posts = [parseRoot(NoSuchThingIsomorphicLayoutEffect, Schema)];
