import { parseRoot } from "codehike/blocks";
import NoSuchThingIsomorphicLayoutEffect from "./mdx/NoSuchThingIsomorphicLayoutEffect.mdx";
import { Schema } from "./schema";
import { WhyIRebuiltProseMirrorView } from "./tsx/WhyIRebuiltProseMirrorView/WhyIRebuiltProseMirrorView";
import TechDebtAsProductStrategy from "./mdx/TechDebtAsProductStrategy/TechDebtAsProductStrategy.mdx";

export const posts = [
  parseRoot(TechDebtAsProductStrategy, Schema),
  parseRoot(NoSuchThingIsomorphicLayoutEffect, Schema),
  WhyIRebuiltProseMirrorView,
];
