import { parseRoot } from "codehike/blocks";
import NoSuchThingIsomorphicLayoutEffect from "./mdx/NoSuchThingIsomorphicLayoutEffect.mdx";
import { Schema } from "./schema";
import { WhyIRebuiltProseMirrorView } from "./tsx/WhyIRebuiltProseMirrorView/WhyIRebuiltProseMirrorView";
import TechDebtAsProductStrategy from "./mdx/TechDebtAsProductStrategy/TechDebtAsProductStrategy.mdx";
import TransitionLowPriorityEditorUpdates from "./mdx/TransitionLowPriorityEditorUpdates/TransitionLowPriorityEditorUpdates.mdx";
import { RicedCalculator } from "./mdx/TechDebtAsProductStrategy/components/RicedCalculator";
import { EditorWithoutTransition } from "./mdx/TransitionLowPriorityEditorUpdates/components/EditorWithoutTransition";
import { EditorWithTransition } from "./mdx/TransitionLowPriorityEditorUpdates/components/EditorWithTransition";
import MakingReactProseMirrorReallyReallyFast from "./mdx/MakingReactProseMirrorReallyReallyFast/MakingReactProseMirrorReallyReallyFast.mdx";
import { MemoizedEditor } from "./mdx/MakingReactProseMirrorReallyReallyFast/components/MemoizedEditor";
import { UnmemoizedEditor } from "./mdx/MakingReactProseMirrorReallyReallyFast/components/UnmemoizedEditor";
import { PosUpdateDemo } from "./mdx/MakingReactProseMirrorReallyReallyFast/components/PosUpdateDemo";

export function getPosts({ serverOnly }: { serverOnly?: boolean } = {}) {
  return [
    parseRoot(MakingReactProseMirrorReallyReallyFast, Schema, {
      components: {
        UnmemoizedEditor: serverOnly ? () => null : UnmemoizedEditor,
        MemoizedEditor: serverOnly ? () => null : MemoizedEditor,
        PosUpdateDemo: serverOnly ? () => null : PosUpdateDemo,
      },
    }),
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
