import { parseRoot } from "codehike/blocks";
import NoSuchThingIsomorphicLayoutEffect from "./mdx/NoSuchThingIsomorphicLayoutEffect.mdx";
import { Schema } from "./schema";
import { WhyIRebuiltProseMirrorView } from "./tsx/WhyIRebuiltProseMirrorView/WhyIRebuiltProseMirrorView";
import TechDebtAsProductStrategy from "./mdx/TechDebtAsProductStrategy/TechDebtAsProductStrategy.mdx";
import TransitionLowPriorityEditorUpdates from "./mdx/TransitionLowPriorityEditorUpdates/TransitionLowPriorityEditorUpdates.mdx";
import { RicedCalculator } from "./mdx/TechDebtAsProductStrategy/components/RicedCalculator";
import { EditorWithoutTransition } from "./mdx/TransitionLowPriorityEditorUpdates/components/EditorWithoutTransition";
import { EditorWithTransition } from "./mdx/TransitionLowPriorityEditorUpdates/components/EditorWithTransition";

export function getPosts({ serverOnly }: { serverOnly?: boolean } = {}) {
  return [
    parseRoot(TransitionLowPriorityEditorUpdates, Schema, {
      components: {
        EditorWithoutTransition: serverOnly
          ? () => null
          : EditorWithoutTransition,
        EditorWithTransition: serverOnly ? () => null : EditorWithTransition,
      },
    }),
    parseRoot(TechDebtAsProductStrategy, Schema, {
      components: {
        RicedCalculator: serverOnly ? () => null : RicedCalculator,
      },
    }),
    parseRoot(NoSuchThingIsomorphicLayoutEffect, Schema),
    WhyIRebuiltProseMirrorView,
  ];
}
