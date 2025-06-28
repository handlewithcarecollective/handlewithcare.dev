import { parseRoot } from "codehike/blocks";
import NoSuchThingIsomorphicLayoutEffect from "./mdx/NoSuchThingIsomorphicLayoutEffect.mdx";
import { Schema } from "./schema";
import { WhyIRebuiltProseMirrorView } from "./tsx/WhyIRebuiltProseMirrorView/WhyIRebuiltProseMirrorView";

export const posts = [
  parseRoot(NoSuchThingIsomorphicLayoutEffect, Schema),
  WhyIRebuiltProseMirrorView,
];
