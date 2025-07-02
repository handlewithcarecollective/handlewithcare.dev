import { parseRoot } from "codehike/blocks";
import NoSuchThingIsomorphicLayoutEffect from "./mdx/NoSuchThingIsomorphicLayoutEffect.mdx";
import { Schema } from "./schema";
import { WhyIRebuiltProseMirrorView } from "./tsx/WhyIRebuiltProseMirrorView/WhyIRebuiltProseMirrorView";
import TechDebtAsProductStrategy from "./mdx/TechDebtAsProductStrategy/TechDebtAsProductStrategy.mdx";
import { RicedCalculator } from "./mdx/TechDebtAsProductStrategy/components/RicedCalculator";

export function getPosts({ serverOnly }: { serverOnly?: boolean } = {}) {
  return [
    parseRoot(TechDebtAsProductStrategy, Schema, {
      components: {
        RicedCalculator: serverOnly ? () => null : RicedCalculator,
      },
    }),
    parseRoot(NoSuchThingIsomorphicLayoutEffect, Schema),
    WhyIRebuiltProseMirrorView,
  ];
}
