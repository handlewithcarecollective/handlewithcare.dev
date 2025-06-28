import { focus } from "@/brightExtensions/focus";
import { tabs } from "@/brightExtensions/tabs/extension";
import { ProseMirror as AttemptOne } from "./components/AttemptOne/ProseMirror";
import { ProseMirror as AttemptTwo } from "./components/AttemptTwo/ProseMirror";
import { ProseMirror as AttemptThree } from "./components/AttemptThree/ProseMirror";
import { ProseMirror as AttemptFour } from "./components/AttemptFour/ProseMirror";
import { ProseMirror as AttemptFive } from "./components/AttemptFive/ProseMirror";
import { ProseMirror as AttemptSix } from "./components/AttemptSix/ProseMirror";
import { Editor as AttemptSeven } from "./components/AttemptSeven/Editor";
import { Editor as StateTearingDemo } from "./components/StateTearingDemo/Editor";
import { Editor as Finale } from "./components/Finale/Editor";
import { ProseMirrorDemo } from "./components/ProseMirrorDemo";
import { Code } from "bright";
import { Heading4 } from "@/components/blog/Heading4";
import { Heading3 } from "@/components/blog/Heading3";
import { PostProps } from "@/posts/Props";
import { BlockQuote } from "@/components/blog/BlockQuote";
import { InlineCode } from "@/components/blog/InlineCode";
import { ToDo } from "./components/ToDo";
import { LeadIn } from "@/components/blog/LeadIn";
import { Schema } from "@/posts/schema";
import { z } from "zod";
import { Link } from "@/components/blog/Link";
import { NumberedList } from "@/components/blog/NumberedList";
import { ReactNode } from "react";
import { BlogSection } from "@/components/blog/Section";

Code.theme = "dracula";

Code.className = "text-sm md:text-base";

export const WhyIRebuiltProseMirrorView: Omit<
  z.infer<typeof Schema>,
  "sections"
> & {
  Component: (props: PostProps) => ReactNode;
} = {
  title: "Why I rebuilt ProseMirror’s renderer in React",
  slug: "why_i_rebuilt_prosemirror_view",
  date: "Feb. 6, 2025",
  author: "Shane Friedman",
  canonical: "https://smoores.dev/post/why_i_rebuilt_prosemirror_view",
  snippet:
    "For the past year and a half, I’ve been re-writing the renderer for ProseMirror, the popular rich text editing library. This new renderer has finally been marked as stable and published as part of @handlewithcare/react-prosemirror, a library that integrates React and ProseMirror. Here’s a very deep dive into the journey I took, and why it led me where it did!",
  Component,
};

function Component({ serverOnly }: PostProps) {
  Code.extensions = serverOnly ? [focus] : [focus, tabs];

  return (
    <>
      <BlogSection id="intro">
        <p>
          <LeadIn>For almost five years</LeadIn>, I worked on the New York
          Times’ rich text editor, Oak. It’s used by over a thousand journalists
          at the Times to author nearly every story that’s published to the
          site. It needed to support Google Docs-style collaborative editing and
          a “what you see is what you get” (WYSIWYG) experience, so that
          journalists could work together and see how their writing was actually
          going to appear to readers.
        </p>
        <p>
          As you might imagine, this was not a simple application. Setting aside
          the complexity incurred from building on top of a content management
          system that was over a decade old, Oak was software built for
          professionals, and it showed. It supported complex workflows and had a
          practically uncountable number of features. And, honestly, it was
          still very usable, and it even looked nice!
        </p>
        <p>
          The Times’ website is written with React, which is one of the big
          reasons that Oak was written in React. We were able to author React
          components that could be used by both the reader-facing website{" "}
          <em>and</em> Oak, which meant that journalists were working in an
          editor that looked quite a lot like the reader-facing website.
        </p>
        <p>
          But even without that advantage, React would have been a good choice
          for Oak. It was an app with a large amount of state, and that state
          drove a very complex user interface. In many ways, it was exactly the
          type of application that React was designed for.
        </p>
        <p>
          The other library that Oak was written with was ProseMirror. Nowadays,
          there are really wonderful libraries like Lexical and Slate.js for
          building rich text editors with React, but back in 2017, ProseMirror
          was basically the only game in town. And besides, ProseMirror is a
          brilliant library. ProseMirror documents are modeled around the notion
          of a Schema — a kind of blueprint for a document — that allows
          developers to declaratively define what kinds of content their editor
          can edit, and how that content can fit together. If you’re not
          familiar with ProseMirror, it may be worth taking a moment to read
          through{" "}
          <Link href="https://prosemirror.net/docs/guide/">
            the Library Guide
          </Link>{" "}
          to get a better sense of how it works.
        </p>
      </BlogSection>
      <BlogSection id="the-problem">
        <p>
          <LeadIn>Unfortunately for us</LeadIn>, React and ProseMirror do not
          play nicely together. When I first joined the Oak team, in 2019, my
          onboarding included a several-hour whiteboarding session on Oak’s
          frontend architecture. This included a deep dive into “The Seam,” the
          adapter layer that we’d built between React and ProseMirror. The Seam
          was… gnarly. Everyone had their suspicions that it wasn’t{" "}
          <em>quite</em> correct, in the formal sense, and that the transient,
          hard-to-reproduce editing bugs that users often reported were probably
          due to something in its implementation. I remember this whiteboarding
          session clearly, because it was in that session, on my second day at
          the Times, that I decided what I was going to do. I was going to fix
          The Seam.
        </p>
        <p>
          It turned out, this was very much not a one-engineer kind of job.
          Instead, over the next four years, our whole team learned the ins and
          outs of both React and ProseMirror. We deepened our knowledge, even
          going as far as to produce{" "}
          <Link href="https://nytimes.github.io/oak-byo-react-prosemirror-redux/">
            educational materials for new team members
          </Link>
          . And over time, we became able to pinpoint precisely where React and
          ProseMirror disagreed, and started to come up with plans for better
          solutions.
        </p>
        <p>
          As it happens, React and ProseMirror actually have very similar
          philosophies about how to manage the DOM. Both libraries maintain a
          sort of “virtual DOM”, a tree structure that’s very efficient to
          update, which maps to the actual DOM that the browser uses to render
          the web page. Both libraries also separate state from the view, and
          use that state to drive the view unidirectionally. The differences
          between how they implement these philosophies are small, but they’re
          very important.
        </p>
        <p>
          React separates updates into two phases. Phase one is the “render”
          phase, and phase two is the “commit” phase. In the render phase, React
          traverses the component tree to update the virtual DOM. Because
          updating the virtual DOM is very fast (at least, relative to updating
          the actual DOM), the entire virtual DOM is computed from scratch (with
          some exceptions) during each render phase. Then, during the commit
          phase, React traverses the virtual DOM, finds places where it differs
          from the actual DOM, and uses this diff to make minimal updates the
          actual DOM.
        </p>
        <p>
          This flow is strictly unidirectional — React expects all changes to
          happen to state first, and then it will translate those state updates
          into view updates. If React-managed DOM is directly modified outside
          the React lifecycle, React will revert those changes during the commit
          phase.
        </p>
        <p>
          ProseMirror renders and commits all at once. Because it’s common to
          dispatch a transaction (a description of a change) and then
          immediately inspect the document to, e.g., update the placement of a
          widget, all updates to the ProseMirror synchronously update the DOM.
          Also, the relationship between ProseMirror state and the view is not{" "}
          <em>strictly</em> unidirectional — because of how complex and
          underspecified text editing behavior is in web browsers, ProseMirror
          often allows the browser to handle a change, then inspects the
          document to determine what change happened.
        </p>
      </BlogSection>
      <BlogSection id="first-attempt">
        <Heading3>v1</Heading3>
        <p>
          <LeadIn>Let’s walk through</LeadIn> a first approach at integrating
          React and ProseMirror, so that we can feel out the issues at play. The
          first thing that we want to be able to do is render the ProseMirror
          EditorView, the component responsible for managing the actual
          interactive text editor, from within a React component. We’ll need to
          construct the EditorView in an effect hook for two reasons:
        </p>
        <NumberedList>
          <li>
            <p>
              The EditorView needs to be provided with a DOM node to mount the
              editor on, just like ReactDOM’s{" "}
              <InlineCode>createRoot</InlineCode> function. That means we need
              to hold off on creating it until after React has committed changes
              to the DOM.
            </p>
          </li>
          <li>
            <p>
              Creating and updating the EditorView will produce “side effects.”
              Specifically, the EditorView will modify the real DOM.
            </p>
          </li>
        </NumberedList>
        <Code
          lang="tsx"
          title="ProseMirror.tsx"
          subProps={[
            {
              code: `"use client";

import { useLayoutEffect, useRef } from "react";
import { EditorView } from "prosemirror-view";
import { EditorState } from "prosemirror-state";
import { doc } from "./doc";
import { plugins } from "./plugins";

export function ProseMirror() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const viewRef = useRef<EditorView | null>(null);

  useLayoutEffect(() => {
    if (!mountRef.current) {
      viewRef.current?.destroy();
      viewRef.current = null;
      return;
    }

    viewRef.current = new EditorView(mountRef.current, {
      state: EditorState.create({
        doc,
        plugins,
      }),
    });
  }, []);

  return <div ref={mountRef} />;
}
`,
              lang: "tsx",
              title: "ProseMirror.tsx",
            },
            {
              code: `import { schema } from "prosemirror-schema-basic";

export const doc = schema.nodes.doc.create({}, [
  schema.nodes.paragraph.create({}, [
    schema.text("This is a "),
    schema.text("rich text editor", [schema.marks.strong.create()]),
    schema.text(". You can type in it!"),
  ]),
  schema.nodes.paragraph.create({}, schema.text("Not bad, right?")),
]);
`,
              lang: "ts",
              title: "doc.ts",
            },
            {
              code: `import { baseKeymap, toggleMark } from "prosemirror-commands";
import { keymap } from "prosemirror-keymap";
import { schema } from "prosemirror-schema-basic";
import { history, redo, undo } from "prosemirror-history";

export const plugins = [
  keymap({
    ...baseKeymap,
    "Mod-i": toggleMark(schema.marks.em),
    "Mod-b": toggleMark(schema.marks.strong),
    "Mod-Shift-c": toggleMark(schema.marks.code),
    "Mod-z": undo,
    "Mod-y": redo,
    "Mod-Shift-z": redo,
  }),
  history(),
];
`,
              lang: "ts",
              title: "plugins.ts",
            },
          ]}
        />
        {!serverOnly && (
          <ProseMirrorDemo>
            <AttemptOne />
          </ProseMirrorDemo>
        )}
        <p>
          This actually works fairly well! And indeed, many React/ProseMirror
          integrations look just like this. It works just fine for simple
          editors, but things start to get more complex as we add features.
          Let’s try adding a simple tooltip that shows the user what position
          they’re at in the document.
        </p>
        <p className="text-sm">
          Note: if we were building this feature without React, we would use a
          ProseMirror plugin that implemented a widget decoration or a plugin
          view for this tooltip. But, as mentioned earlier, in any other
          context, this is exactly the kind of feature it makes sense to reach
          for React to build, and the premise of this integration is that we
          should be able to use React to add more complex features to our
          editor.
        </p>
        <Code
          subProps={[
            {
              title: "PositionTooltip.tsx",
              lang: "tsx",
              code: `import { EditorView } from "prosemirror-view";

interface Props {
  view: EditorView | null;
}

export function PositionTooltip({ view }: Props) {
  const position = view?.state.selection.anchor;
  const coords =
    position !== undefined ? view?.coordsAtPos(position) : undefined;

  if (!coords) return null;

  return (
    <div
      className="absolute bg-white p-1 shadow-md"
      style={{ top: coords.top, left: coords.left }}
    >
      pos: {position}
    </div>
  );
}
`,
            },
            {
              title: "ProseMirror.tsx",
              lang: "tsx",
              code: `"use client";

import { useLayoutEffect, useRef } from "react";
import { EditorView } from "prosemirror-view";
import { EditorState } from "prosemirror-state";
import { doc } from "./doc";
import { plugins } from "./plugins";
import { PositionTooltip } from "./PositionTooltip";

export function ProseMirror() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const viewRef = useRef<EditorView | null>(null);

  useLayoutEffect(() => {
    if (!mountRef.current) {
      viewRef.current?.destroy();
      viewRef.current = null;
      return;
    }

    viewRef.current = new EditorView(mountRef.current, {
      state: EditorState.create({
        doc,
        plugins,
      }),
    });
  }, []);

  return (
    <>
      <div ref={mountRef} />
      {/* focus(1:1) */}
      <PositionTooltip view={viewRef.current} />
    </>
  );
}
`,
            },
          ]}
        />
        {!serverOnly && (
          <ProseMirrorDemo>
            <AttemptTwo />
          </ProseMirrorDemo>
        )}
        <p>
          … Huh. That didn’t work at all! At the moment, the entire ProseMirror
          integration lives in a ref (<InlineCode>viewRef</InlineCode>), so it
          doesn’t trigger a render when it updates. To fix this, we need to{" "}
          <em>lift</em> the EditorState out of the EditorView and into React
          state, so that it will trigger a re-render when it’s updated. Let’s
          give that a shot. We’ll create a new React state hook to hold the
          EditorState, and use ProseMirror’s `view.updateState()` API to update
          the editor after the EditorState changes.
        </p>
        <Code
          subProps={[
            {
              title: "ProseMirror.tsx",
              lang: "tsx",
              code: `"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { EditorView } from "prosemirror-view";
import { EditorState } from "prosemirror-state";
import { doc } from "./doc";
import { plugins } from "./plugins";
import { PositionTooltip } from "./PositionTooltip";

export function ProseMirror() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const viewRef = useRef<EditorView | null>(null);

  // focus(1:6)
  const [editorState, setEditorState] = useState(() =>
    EditorState.create({
      doc,
      plugins,
    }),
  );

  useLayoutEffect(() => {
    if (!mountRef.current) {
      viewRef.current?.destroy();
      viewRef.current = null;
      return;
    }

    if (!viewRef.current) {
      viewRef.current = new EditorView(mountRef.current, {
        // focus(1:4)
        state: editorState,
        dispatchTransaction(tr) {
          setEditorState(this.state.apply(tr));
        },
      });
      return;
    }

    // focus(1:1)
    viewRef.current.updateState(editorState);
  }, [editorState]);

  return (
    <>
      <div ref={mountRef} />
      {/* focus(1:1) */}
      <PositionTooltip view={viewRef.current} state={editorState} />
    </>
  );
}
`,
            },
            {
              title: "PositionTooltip.tsx",
              lang: "tsx",
              code: `import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";

interface Props {
  view: EditorView | null;
  // focus(1:1)
  state: EditorState;
}

// focus(1:2)
export function PositionTooltip({ view, state }: Props) {
  const position = state.selection.anchor;
  const coords =
    position !== undefined ? view?.coordsAtPos(position) : undefined;

  if (!coords) return null;

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-full transform rounded bg-white p-1 text-xs shadow-md"
      style={{ top: coords.top + window.scrollY, left: coords.left }}
    >
      pos: {position}
    </div>
  );
}
`,
            },
          ]}
        />
        {!serverOnly && (
          <ProseMirrorDemo>
            <AttemptThree />
          </ProseMirrorDemo>
        )}
        <p>
          This is much better! The tooltip actually renders, for one thing. And
          as you move your cursor around, the tooltip follows, just like we
          intended. There’s a pretty big issue, though. Try typing something at
          the end of the last sentence. The cursor positioning totally breaks!
        </p>
        <p>
          We’re again running into React’s two-phase update cycle. We call{" "}
          <InlineCode>view.coordsAtPos(position)</InlineCode> during the{" "}
          <em>render</em> phase, but that method inspects the DOM to determine
          its coordinates. Because we’re in the render phase, the DOM hasn’t
          been updated yet! Just like when we set up the EditorView, we need to
          move this call into an effect hook so that it executes at the end of
          the commit phase, after the DOM has been updated.
        </p>
        <Code
          subProps={[
            {
              title: "PositionTooltip.tsx",
              lang: "tsx",
              code: `import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { useLayoutEffect, useState } from "react";

interface Props {
  view: EditorView | null;
  state: EditorState;
}

export function PositionTooltip({ view, state }: Props) {
  const position = state.selection.anchor;
  // focus(1:11)
  const [top, setTop] = useState<number | null>(null);
  const [left, setLeft] = useState<number | null>(null);

  useLayoutEffect(() => {
    if (position === undefined || !view) return;

    const coords = view.coordsAtPos(position);

    setTop(coords.top);
    setLeft(coords.left);
  }, [position, view]);

  if (top === null || left === null) return null;

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-full transform rounded bg-white p-1 text-xs shadow-md"
      style={{ top: top + window.scrollY, left: left }}
    >
      pos: {position}
    </div>
  );
}
`,
            },
          ]}
        />
        {!serverOnly && (
          <ProseMirrorDemo>
            <AttemptFour />
          </ProseMirrorDemo>
        )}
        <p>
          Still no dice. The positioning still breaks when the document changes!
          The issue here is that the DOM that{" "}
          <InlineCode>view.coordsAtPos()</InlineCode> is inspecting isn’t owned
          by React at all — it’s owned by ProseMirror! We update ProseMirror’s
          state and DOM in a layout effect in the{" "}
          <InlineCode>&lt;ProseMirror /&gt;</InlineCode> component, which is
          executed <em>after</em> the layout effect in the{" "}
          <InlineCode>&lt;PositionTooltip /&gt;</InlineCode> component.
        </p>
        <p>
          Fixing this is going to take some thinking, so we’ll just take note of
          it for now and come back to it later. We may as well start a list, as
          we’re going to run into a few of these.
        </p>
        <Heading4>To-do list</Heading4>
        <ToDo>
          Devise a system for deferring layout effects in child components until{" "}
          <em>after</em> the EditorView has updated its DOM
        </ToDo>
      </BlogSection>
      <BlogSection id="state-tearing">
        <p>
          <LeadIn>Before we move on</LeadIn>, there’s one more subtle issue here
          that’s worth exploring. When moved the EditorState into React state,
          we updated our <InlineCode>&lt;PositionTooltip /&gt;</InlineCode>{" "}
          component to read the current selection from this new state value,
          instead of from the EditorView. What would have happened if we’d left
          it as is, reading from the EditorView’s state?
        </p>
        <Code
          subProps={[
            {
              title: "PositionTooltip.tsx",
              lang: "tsx",
              code: `import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { useLayoutEffect, useState } from "react";

interface Props {
  view: EditorView | null;
  state: EditorState;
}

export function PositionTooltip({ view }: Props) {
  // focus(1:1)
  const position = view?.state.selection.anchor;
  const [top, setTop] = useState<number | null>(null);
  const [left, setLeft] = useState<number | null>(null);

  useLayoutEffect(() => {
    if (position === undefined || !view) return;

    const coords = view.coordsAtPos(position);

    setTop(coords.top);
    setLeft(coords.left);
  }, [position, view]);

  if (top === null || left === null) return null;

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-full transform rounded bg-white p-1 text-xs shadow-md"
      style={{ top: top + window.scrollY, left: left }}
    >
      pos: {position}
    </div>
  );
}
`,
            },
          ]}
        />
        {!serverOnly && (
          <ProseMirrorDemo>
            <AttemptFive />
          </ProseMirrorDemo>
        )}
        <p>
          Funky, right? The tooltip only moves after every <em>other</em>{" "}
          selection change. The underlying issue here is one of{" "}
          <strong>state tearing</strong>. During the render phase of this
          component, depending on where you look, you can find two different
          versions of the EditorState. If you look in React state, you’ll find
          the newest version — the state that’s about to be committed to the
          DOM. But if you look in ProseMirror state, you’ll find the previous
          version — the state that matches most recent DOM commit.
        </p>
        <p>
          This is going to be another challenge to address, and one that will
          show up in slightly different forms throughout this journey. Let’s add
          it to our to-do list:
        </p>
        <Heading4>To-do list</Heading4>
        <ToDo>
          Devise a system for deferring layout effects in child components until{" "}
          <em>after</em> the EditorView has updated its DOM
        </ToDo>
        <ToDo>
          Ensure that ProseMirror’s state can only be accessed when it matches
          React’s state
        </ToDo>
      </BlogSection>
      <BlogSection id="node-views">
        <p>
          <LeadIn>Assuming we can address these issues</LeadIn>, we have a rough
          idea of how to render a ProseMirror editor within React. What about
          rendering a React component within a ProseMirror editor? The ability
          to develop custom, stateful node views is one of ProseMirror’s biggest
          draws for the Oak team. It allowed us to build an editor where the
          controls were always local to the part of the document that they
          controlled, which in turn made the editor much more intuitive to use
          for our journalists.
        </p>
        <p>
          As an example, let’s build a simple custom node view for an image node
          that allows us to choose whether an image is left-aligned,
          right-aligned, or centered. We want the interface for controlling the
          image alignment to live right below the actual image it applies to, so
          that it’s clear to the user what will happen when they take an action.
        </p>
        <Code
          subProps={[
            {
              title: "ImageNode.tsx",
              lang: "tsx",
              code: `import { Node } from "prosemirror-model";
import { EditorView, NodeViewConstructor } from "prosemirror-view";
import { createRoot } from "react-dom/client";
import cx from "classnames";

import { AlignmentButton } from "./AlignmentButton";

interface Props {
  node: Node;
  view: EditorView;
  getPos: () => number | undefined;
}

function ImageNode({ node, view, getPos }: Props) {
  return (
    <div className="my-4 flex flex-col gap-2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={cx("shrink grow-0", {
          "self-start":
            node.attrs.alignment === "left" || !node.attrs.alignment,
          "self-center": node.attrs.alignment === "center",
          "self-end": node.attrs.alignment === "right",
        })}
        src={node.attrs.src}
        alt=""
      />
      <div
        data-pm-controls
        className="flex gap-4 self-center"
        contentEditable={false}
      >
        <AlignmentButton alignment="left" view={view} getPos={getPos} />
        <AlignmentButton alignment="center" view={view} getPos={getPos} />
        <AlignmentButton alignment="right" view={view} getPos={getPos} />
      </div>
    </div>
  );
}

export const image: NodeViewConstructor = (node, view, getPos) => {
  const dom = document.createElement("div");
  const root = createRoot(dom);
  root.render(<ImageNode node={node} view={view} getPos={getPos} />);
  return {
    dom,
    update(updatedNode) {
      if (updatedNode.type !== node.type) {
        return false;
      }
      root.render(<ImageNode node={updatedNode} view={view} getPos={getPos} />);
      return true;
    },
    destroy() {
      root.unmount();
    },
    // Prevent ProseMirror from handling events from within the
    // node view's buttons
    stopEvent(e) {
      if (!(e instanceof MouseEvent)) return false;
      if (!(e.target instanceof HTMLElement)) return false;
      let el = e.target.parentElement;
      while (el) {
        if (el.dataset.pmControls) return true;
        el = el.parentElement;
      }
      return false;
    },
  };
};
`,
            },
            {
              title: "AlignmentButton.tsx",
              lang: "tsx",
              code: `import { EditorView } from "prosemirror-view";

interface Props {
  alignment: string;
  view: EditorView;
  getPos: () => number | undefined;
}

export function AlignmentButton({ alignment, view, getPos }: Props) {
  return (
    <button
      className="rounded bg-gray-100 px-2 py-1"
      type="button"
      onClick={() => {
        view.dispatch(
          view.state.tr.setNodeAttribute(getPos()!, "alignment", alignment),
        );
      }}
    >
      {alignment[0].toUpperCase() + alignment.slice(1)}
    </button>
  );
}
`,
            },
          ]}
        />
        {!serverOnly && (
          <ProseMirrorDemo>
            <AttemptSix />
          </ProseMirrorDemo>
        )}
        <p>
          Let’s break that down a bit. First of all, we’re creating a custom
          ProseMirror node view. That looks like a function that takes the node
          and EditorView as arguments, along with a few others, and returns an
          object that implements the <InlineCode>NodeView</InlineCode> API.
          Importantly, this NodeView object must have a{" "}
          <InlineCode>dom</InlineCode> property that is synchronously set to a
          valid DOM node. This introduces a challenge right off the bat:
          ReactDOM’s <InlineCode>render</InlineCode> function isn’t synchronous!
        </p>
        <p>
          Essentially all React/ProseMirror integrations work around this
          constraint the way we do here: by producing a wrapping{" "}
          <InlineCode>&lt;div&gt;</InlineCode> element to hand to ProseMirror,
          and then asynchronously mounting the React component into that
          element. This turns out to be surprisingly fraught, as default browser
          editing behavior{" "}
          <Link href="https://github.com/nytimes/react-prosemirror/issues/42">
            tends to delete these wrapping elements in some cases
          </Link>
          , but we’re going to stick with it for now!
        </p>
        <p>
          We should also take a look at how we’re actually rendering our React
          component. This approach creates a new React tree, rooted at our
          wrapper div, for each node. So if there are thirty images in our
          document, we have thirty React trees. These trees are disjointed —
          their updates aren’t tied together in any way, and we can’t share
          context between them. This means that if we wanted to use a global
          state management library, like Redux or React Query, we would have to
          wrap each node view in its own top-level provider.
        </p>
        <p>
          It also means that DOM updates happen asynchronously, and we can’t
          predict when they’ll be committed. If we have some widget that we’d
          like to position in the corner of our image node, there’s no clear
          place to call <InlineCode>view.coordsToPos()</InlineCode> where we can
          be sure that a newly inserted image has been rendered to the DOM.
          Let’s walk through the sequence of events to understand why this is:
        </p>
        <NumberedList>
          <li>
            <p>A user clicks a button to insert a new image.</p>
          </li>
          <li>
            <p>
              The event handler runs, which calls{" "}
              <InlineCode>view.dispatch()</InlineCode>, passing a transaction
              that inserts the new image into the document.
            </p>
          </li>
          <li>
            <p>The EditorView dispatch method calls the React state setter.</p>
          </li>
          <li>
            <p>
              React executes its render phase, calling our component’s render
              functions. We know from earlier that it’s not yet safe to check
              the coordinates here, as the EditorView hasn’t been updated with
              the new state yet.
            </p>
          </li>
          <li>
            <p>
              React executes its commit phase. Changes are committed to the DOM,
              and effect hooks are run. This does <em>not</em> include the
              ProseMirror document updates, as those are handled entirely by
              ProseMirror, and won’t be kicked off until the ProseMirror
              component’s layout effect runs.
            </p>
          </li>
          <li>
            <p>
              React runs the layout effects for our widget component. Again,
              we’ve already learned that we can’t check for coordinates safely
              here, because the layout effect for our ProseMirror component runs{" "}
              <em>after</em> all of its children’s layout effects, so it hasn’t
              updated the EditorView with the new state yet.
            </p>
          </li>
          <li>
            <p>
              React runs the layout effect for our ProseMirror component, which
              updates the EditorView with the new EditorState, and commits its
              updates to the DOM. Earlier, we decided that this was where it
              would be safe to check coordinates, because the ProseMirror DOM is
              now updated. However, the new React-based image node view throws a
              wrench in this understanding, because its contents are rendered
              asynchronously. This means that even after{" "}
              <InlineCode>view.updateState()</InlineCode> finishes executing,
              the contents of the <InlineCode>&lt;Image /&gt;</InlineCode>{" "}
              component may not have been committed to the DOM yet.
            </p>
          </li>
        </NumberedList>
        <p>
          So we have a new to-do to add to our list: we need to find a way to
          keep our React-based node views in the same tree as our ProseMirror
          component. This will inevitably involve{" "}
          <Link href="https://react.dev/reference/react-dom/createPortal">
            Portals
          </Link>{" "}
          — React’s approach to rendering a component’s children somewhere else
          in the browser DOM tree.
        </p>
        <Heading4>To-do list</Heading4>
        <ToDo>
          Devise a system for deferring layout effects in child components until{" "}
          <em>after</em> the EditorView has updated its DOM
        </ToDo>
        <ToDo>
          Ensure that ProseMirror’s state can only be accessed when it matches
          React’s state
        </ToDo>
        <ToDo>
          Use React Portals to keep React-based node views in the same tree as
          their parent ProseMirror component.
        </ToDo>
      </BlogSection>
      <BlogSection id="v1">
        <p>
          <LeadIn>This is the set of requirements</LeadIn> that we armed
          ourselves with when we set out to implement the first version of our
          React ProseMirror library,{" "}
          <InlineCode>@nytimes/react-prosemirror</InlineCode>. We met our first
          two requirements by hiding the EditorView away in a context, and only
          exposing it via React hooks. These hooks (
          <InlineCode>useEditorEffect</InlineCode>,{" "}
          <InlineCode>useEditorEventCallback</InlineCode>, and{" "}
          <InlineCode>useEditorEventListener</InlineCode>) only ran{" "}
          <em>after</em> the EditorView was updated with the latest state, when
          it was safe to both access the EditorView’s state and inspect the DOM
          with methods like <InlineCode>view.coordsAtPos()</InlineCode>.
        </p>
        <p>
          The final requirement was somewhat more challenging, but in the end we
          managed to construct a system for mounting node view components with
          portals. We even managed to ensure that child node view components
          were always rendered as children of their parent’s node view
          components, allowing parents to pass context to their children, which
          other React/ProseMirror integrations don’t support.
        </p>
        <p>
          Here’s how we’re able to implement our two basic editor features from
          earlier with <InlineCode>@nytimes/react-prosemirror</InlineCode>:
        </p>
        <Code
          subProps={[
            {
              title: "Editor.tsx",
              lang: "tsx",
              code: `"use client";

import { ProseMirror, useNodeViews } from "@nytimes/react-prosemirror";

import { useLayoutEffect, useRef, useState } from "react";
import { EditorView } from "prosemirror-view";
import { EditorState } from "prosemirror-state";
import { doc } from "./doc";
import { plugins } from "./plugins";
import { image } from "./ImageNode";
import { PositionTooltip } from "./PositionTooltip";

const reactNodeViews = {
  image,
};

export function Editor() {
  const [mount, setMount] = useState<HTMLDivElement | null>(null);
  const { nodeViews, renderNodeViews } = useNodeViews(reactNodeViews);
  const [editorState, setEditorState] = useState(() =>
    EditorState.create({
      doc,
      plugins,
    }),
  );

  return (
    <ProseMirror
      mount={mount}
      state={editorState}
      dispatchTransaction={(tr) => {
        setEditorState((prev) => prev.apply(tr));
      }}
      nodeViews={nodeViews}
    >
      <div ref={setMount} />
      {renderNodeViews()}
      <PositionTooltip />
    </ProseMirror>
  );
}
`,
            },
            {
              title: "PositionTooltip.tsx",
              lang: "tsx",
              code: `import { useEditorEffect, useEditorState } from "@nytimes/react-prosemirror";
import { useState } from "react";

export function PositionTooltip() {
  const editorState = useEditorState();
  const position = editorState.selection.anchor;
  const [top, setTop] = useState<number | null>(null);
  const [left, setLeft] = useState<number | null>(null);

  useEditorEffect(
    (view) => {
      if (position === undefined) return;

      const coords = view.coordsAtPos(position);

      setTop(coords.top);
      setLeft(coords.left);
    },
    [position],
  );

  if (top === null || left === null) return null;

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-full transform rounded bg-white p-1 text-xs shadow-md"
      style={{ top: top + window.scrollY, left: left }}
    >
      pos: {position}
    </div>
  );
}
`,
            },
            {
              title: "ImageNode.tsx",
              lang: "tsx",
              code: `import { Node } from "prosemirror-model";
import { EditorView } from "prosemirror-view";
import cx from "classnames";

import { AlignmentButton } from "./AlignmentButton";
import {
  NodeViewComponentProps,
  ReactNodeViewConstructor,
} from "@nytimes/react-prosemirror";

interface Props {
  node: Node;
  view: EditorView;
  getPos: () => number | undefined;
}

function ImageNode({ node }: NodeViewComponentProps) {
  return (
    <div className="my-4 flex flex-col gap-2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={cx("shrink grow-0", {
          "self-start":
            node.attrs.alignment === "left" || !node.attrs.alignment,
          "self-center": node.attrs.alignment === "center",
          "self-end": node.attrs.alignment === "right",
        })}
        src={node.attrs.src}
        alt=""
      />
      <div
        data-pm-controls
        className="flex gap-4 self-center"
        contentEditable={false}
      >
        <AlignmentButton alignment="left" />
        <AlignmentButton alignment="center" />
        <AlignmentButton alignment="right" />
      </div>
    </div>
  );
}

export const image: ReactNodeViewConstructor = () => {
  const dom = document.createElement("div");
  return {
    dom,
    component: ImageNode,
    // Prevent ProseMirror from handling events from within the
    // node view's buttons
    stopEvent(e) {
      if (!(e instanceof MouseEvent)) return false;
      if (!(e.target instanceof HTMLElement)) return false;
      let el = e.target.parentElement;
      while (el) {
        if (el.dataset.pmControls) return true;
        el = el.parentElement;
      }
      return false;
    },
  };
};
`,
            },
            {
              title: "AlignmentButton.tsx",
              lang: "tsx",
              code: `import { useEditorEventCallback, useNodePos } from "@nytimes/react-prosemirror";
import { EditorView } from "prosemirror-view";

interface Props {
  alignment: string;
}

export function AlignmentButton({ alignment }: Props) {
  const pos = useNodePos();

  const handleClick = useEditorEventCallback((view) => {
    view.dispatch(view.state.tr.setNodeAttribute(pos, "alignment", alignment));
  });

  return (
    <button
      className="rounded bg-gray-100 px-2 py-1"
      type="button"
      onClick={handleClick}
    >
      {alignment[0].toUpperCase() + alignment.slice(1)}
    </button>
  );
}
`,
            },
            {
              title: "plugins.ts",
              lang: "ts",
              code: `
import { baseKeymap, toggleMark } from "prosemirror-commands";
import { keymap } from "prosemirror-keymap";
import { history, redo, undo } from "prosemirror-history";
import { schema } from "./doc";
import { react } from "@nytimes/react-prosemirror";

export const plugins = [
  keymap({
    ...baseKeymap,
    "Mod-i": toggleMark(schema.marks.em),
    "Mod-b": toggleMark(schema.marks.strong),
    "Mod-Shift-c": toggleMark(schema.marks.code),
    "Mod-z": undo,
    "Mod-y": redo,
    "Mod-Shift-z": redo,
  }),
  history(),
  react(),
];
`,
            },
            {
              title: "doc.ts",
              lang: "ts",
              code: `import { Schema } from "prosemirror-model";
import { nodes, marks } from "prosemirror-schema-basic";

export const schema = new Schema({
  nodes: {
    ...nodes,
    image: {
      ...nodes.image,
      group: "block",
      inline: false,
      attrs: {
        ...nodes.image.attrs,
        alignment: { default: "left", validate: "string" },
      },
    },
  },
  marks,
});

export const doc = schema.nodes.doc.create({}, [
  schema.nodes.paragraph.create({}, [
    schema.text("This is a "),
    schema.text("rich text editor", [schema.marks.strong.create()]),
  ]),
  schema.nodes.image.create({ src: "/favicon.ico" }),
  schema.nodes.paragraph.create(
    {},
    schema.text("And it has align-able images!"),
  ),
]);
`,
            },
          ]}
        />
        {!serverOnly && (
          <ProseMirrorDemo>
            <AttemptSeven />
          </ProseMirrorDemo>
        )}
        <p>
          This resolves all of our most glaring issues from earlier. The tooltip
          is always in the correct place, even when you add new content to the
          document. The image component is rendered in the main React tree,
          which means that the tooltip renders in the correct place when it’s
          selected, too (you can test that out by double-clicking the image to
          select it).
        </p>
        <Heading4>To-do list</Heading4>
        <ToDo checked>
          Devise a system for deferring layout effects in child components until{" "}
          <em>after</em> the EditorView has updated its DOM
        </ToDo>
        <ToDo checked>
          Ensure that ProseMirror’s state can only be accessed when it matches
          React’s state
        </ToDo>
        <ToDo checked>
          Use React Portals to keep React-based node views in the same tree as
          their parent ProseMirror component.
        </ToDo>
        <p>
          Unfortunately, as we found when we released the library to the public,
          there were still a few subtle bugs that proved very challenging to
          address with this architecture.
        </p>
      </BlogSection>
      <BlogSection id="v2">
        <Heading3>v2</Heading3>
        <p>
          <LeadIn>It turned out</LeadIn>, we’d walked head-first into a
          variation on ninety-ninety rule. Normally, the ninety-ninety rule is
          stated as follows:
        </p>
        <BlockQuote>
          <p>
            The first 90 percent of the code accounts for the first 90 percent
            of the development time. The remaining 10 percent of the code
            accounts for the other 90 percent of the development time.
          </p>
          <p>— Tom Cargill, Bell Labs</p>
        </BlockQuote>
        <p>
          In our case, it’s more like “The first 90 percent of the solution
          accounts for the first 90 percent of the code. The remaining 10
          percent of the solution accounts for the other 90 percent of the
          code.” We were <em>so close</em> to a robust integration between React
          and ProseMirror, but I was becoming increasingly convinced that our
          approach was fundamentally flawed. Let’s take a look at{" "}
          <Link href="https://github.com/nytimes/react-prosemirror/issues/69">
            one of the bugs
          </Link>{" "}
          that was reported against the{" "}
          <InlineCode>@nytimes/react-prosemirror</InlineCode> library as an
          example.
        </p>
        <Code
          subProps={[
            {
              title: "LeafNode.tsx",
              lang: "tsx",
              code: `import {
  NodeViewComponentProps,
  ReactNodeViewConstructor,
  useEditorEventCallback,
  useNodePos,
} from "@nytimes/react-prosemirror";
import { ChangeEvent } from "react";

function LeafNode({ node }: NodeViewComponentProps) {
  const pos = useNodePos();
  const handleTextChange = useEditorEventCallback(
    (view, event: ChangeEvent<HTMLInputElement>) => {
      view.dispatch(
        view.state.tr.setNodeAttribute(pos, "text", event.target.value),
      );
    },
  );

  return (
    <div
      contentEditable={false}
      className="my-2 flex flex-col items-start gap-2 rounded bg-gray-800 p-2 text-white"
    >
      <p>{node.attrs.text || <br />}</p>
      <div className="flex gap-4 text-black">
        <input value={node.attrs.text} onChange={handleTextChange} />
      </div>
    </div>
  );
}

export const leaf: ReactNodeViewConstructor = () => {
  const dom = document.createElement("div");
  return {
    dom,
    component: LeafNode,
    stopEvent(e) {
      return true;
    },
  };
};
`,
            },
            {
              title: "Editor.tsx",
              lang: "tsx",
              code: `"use client";

import { ProseMirror, useNodeViews } from "@nytimes/react-prosemirror";

import { useState } from "react";
import { EditorState } from "prosemirror-state";
import { doc } from "./doc";
import { plugins } from "./plugins";
import { leaf } from "./LeafNode";

const reactNodeViews = {
  leaf,
};

export function Editor() {
  const [mount, setMount] = useState<HTMLDivElement | null>(null);
  const { nodeViews, renderNodeViews } = useNodeViews(reactNodeViews);
  const [editorState, setEditorState] = useState(() =>
    EditorState.create({
      doc,
      plugins,
    }),
  );

  return (
    <ProseMirror
      mount={mount}
      state={editorState}
      dispatchTransaction={(tr) => {
        setEditorState((prev) => prev.apply(tr));
      }}
      nodeViews={nodeViews}
    >
      <div ref={setMount} />
      {renderNodeViews()}
    </ProseMirror>
  );
}
`,
            },
            {
              title: "doc.ts",
              lang: "ts",
              code: `import { Schema } from "prosemirror-model";
import { nodes, marks } from "prosemirror-schema-basic";

export const schema = new Schema({
  nodes: {
    ...nodes,
    leaf: {
      group: "block",
      attrs: {
        text: { default: "", validate: "string" },
      },
      toDOM(node) {
        return ["p", { class: "bg-gray-700 text-white" }, node.attrs.text];
      },
    },
  },
  marks,
});

export const doc = schema.nodes.doc.create({}, [
  schema.nodes.paragraph.create({}, [
    schema.text("This is a "),
    schema.text("rich text editor", [schema.marks.strong.create()]),
  ]),
  schema.nodes.leaf.create({ text: "This is a leaf node" }),
  schema.nodes.paragraph.create(
    {},
    schema.text("And it has align-able images!"),
  ),
]);
`,
            },
            {
              title: "plugins.ts",
              lang: "ts",
              code: `import { baseKeymap, toggleMark } from "prosemirror-commands";
import { keymap } from "prosemirror-keymap";
import { history, redo, undo } from "prosemirror-history";
import { schema } from "./doc";
import { react } from "@nytimes/react-prosemirror";

export const plugins = [
  keymap({
    ...baseKeymap,
    "Mod-i": toggleMark(schema.marks.em),
    "Mod-b": toggleMark(schema.marks.strong),
    "Mod-Shift-c": toggleMark(schema.marks.code),
    "Mod-z": undo,
    "Mod-y": redo,
    "Mod-Shift-z": redo,
  }),
  history(),
  react(),
];
`,
            },
          ]}
        />
        {!serverOnly && (
          <ProseMirrorDemo>
            <StateTearingDemo />
          </ProseMirrorDemo>
        )}
        <p>
          We’ve introduced a new (somewhat contrived) node type. It’s a leaf
          node, so it doesn’t have any children, but it has an attribute called
          “text”. Whatever is in the text attribute will be rendered as text
          within the node view. Since this node doesn’t have any editable
          children, it renders a text input — when you edit the text input, it
          updates the node’s text attribute, and therefore updates the node’s
          rendered text.
        </p>
        <p>
          Depending on how you tested out this node view, you may not have
          noticed the issue. As long as you make changes with your cursor at the
          end of the text input, everything works great! But try to make a
          change somewhere in the middle of the input. Did you see it? Your
          cursor will always get snapped to the end of the input after the first
          keypress!
        </p>
        <p>
          In order to understand what’s happening here, we’ll need to walk
          through the sequence of events again.
        </p>
        <NumberedList>
          <li>
            <p>A user types something into the input.</p>
          </li>
          <li>
            <p>
              <InlineCode>onChange</InlineCode> is called, which calls{" "}
              <InlineCode>dispatchTransaction</InlineCode>, which updates the
              state of the ProseMirror component.
            </p>
          </li>
          <li>
            <p>
              The React tree renders because of the state update, but the
              EditorView’s state has not been updated yet, so all the node views
              still have references to the nodes from the previous render.
            </p>
          </li>
          <li>
            <p>
              The input, which is a descendant of the ProseMirror component, is
              rendered with the node from the old state, so its value is
              forcibly reset to the previous value (this resets the selection
              because React doesn’t really have any other good options).
            </p>
          </li>
          <li>
            <p>
              The <InlineCode>useLayoutEffect</InlineCode> in the ProseMirror
              component runs, updating the state on the EditorView.
            </p>
          </li>
          <li>
            <p>
              The EditorView calls the update methods on all of its node views,
              which triggers state updates for their nodes, and so the Image
              component and its input are re-rendered with the new, updated node
              value.
            </p>
          </li>
        </NumberedList>
        <p>
          This was pretty disappointing — even after all that work, there was
          still <strong>state tearing</strong> happening! It was more subtle
          than before, because the state always settled immediately after the
          tear, and because the resolution occurred in a layout effect, the user
          never saw the torn state in the view. But there were still bugs like
          this that occurred in the edge cases.
        </p>
      </BlogSection>
      <BlogSection id="the-way-out">
        <p>
          <LeadIn>It seemed like there was only one way out</LeadIn>: to
          re-write ProseMirror’s rendering engine with React. At their core, all
          the state tearing issues that we’ve discussed are due to our usage of
          a layout effect to update the EditorView. We have to do it this way,
          or basic React functionality like Suspense will be broken. The only
          way to make it safe to update the EditorView in the render function
          would be if that update didn’t produce any side effects. But if the
          update doesn’t produce any side effects, what’s responsible for
          actually updating the view? Well, I thought, maybe the answer is
          React!
        </p>
        <p>
          ProseMirror is a very modular framework, and{" "}
          <InlineCode>prosemirror-view</InlineCode> is the library responsible
          for actually rendering the editable document in the browser. At first,
          I thought that I could simply write an alternative{" "}
          <InlineCode>prosemirror-view</InlineCode>, but that turned out to be
          an immense undertaking. <InlineCode>prosemirror-view</InlineCode> does
          a <em>lot</em>. The selection management code alone could be its own
          library, full of browser-specific workarounds and handlers for dozens
          of edge cases.
        </p>
        <p>
          There was another issue with re-writing{" "}
          <InlineCode>prosemirror-view</InlineCode>, too. Because ProseMirror’s
          EditorView is a JavaScript class, there is code throughout the
          ProseMirror-verse that occasionally checks to see whether something is
          an EditorView like this:{" "}
          <InlineCode>maybeView instanceof EditorView</InlineCode>. Even more
          commonly, developers that use Typescript will type arguments to, e.g.,
          ProseMirror commands using <InlineCode>EditorView</InlineCode> as a
          type. Any solution that involved a fork of the EditorView class would
          break all of these cases, and I really, really wanted to create
          something that was compatible with as much existing ProseMirror code
          as possible.
        </p>
        <p>
          So I needed to reuse the actual <InlineCode>EditorView</InlineCode>{" "}
          class from <InlineCode>prosemirror-view</InlineCode>, but I needed to
          change its functionality. What about a subclass? A subclass would
          allow me to override method implementations from the EditorView class
          with my own, but it would still pass{" "}
          <InlineCode>instanceof</InlineCode> checks and Typescript type checks.
        </p>
        <p>
          Let’s give that a shot. The goal is to prevent any side effects from
          occurring within the constructor and the setProps method, so that we
          can safely call these during the render function.
        </p>
        <p>
          To prevent side effects within the constructor, we’ll pass a stub
          document and empty mount to the superclass constructor, which will
          result in creating a few DOM nodes that aren’t attached to the HTML
          document. Technically this is a side effect, too, but it’s one that
          doesn’t have any user-facing impact, and it can be done any number of
          times safely. Then, we can clear out that stub DOM, and replace it
          with the DOM produced by our React renderer.
        </p>
        <p>
          The setProps method will be more challenging. In this subclass, the
          goal will be to split up the functionality of setProps into two parts:
        </p>
        <NumberedList>
          <li>
            <p>
              A “pure” method, cleverly named{" "}
              <InlineCode>pureSetProps</InlineCode>, which will set the new
              props on the EditorView instance, but will not trigger any side
              effects.
            </p>
          </li>
          <li>
            <p>
              An “effectful” method, <InlineCode>runPendingEffects</InlineCode>,
              which will execute the side effects that are due from the latest{" "}
              <InlineCode>pureSetProps</InlineCode> call.
            </p>
          </li>
        </NumberedList>
        <p>
          Notably, these pending side effects executed by{" "}
          <InlineCode>runPendingEffects</InlineCode> will not include DOM
          updates, because that will be handled by React! That means that, in
          addition to subclassing the EditorView, we’ll need to modify
          ProseMirror’s virtual DOM implementation, called the “view descriptor
          tree.” We’ll get to that in a minute!
        </p>
        <Code
          subProps={[
            {
              title: "ReactEditorView.ts",
              lang: "ts",
              code: `export class ReactEditorView extends EditorView {
  private shouldUpdatePluginViews = false;

  private oldProps: DirectEditorProps;

  private _props: DirectEditorProps;

  constructor(
    place: { mount: HTMLElement } | null,
    props: DirectEditorProps & { docView: NodeViewDesc }
  ) {
    // Call the superclass constructor with an empty
    // document and limited props. We'll set everything
    // else ourselves.
    super(place, {
      state: EditorState.create({
        schema: props.state.schema,
        plugins: props.state.plugins,
      }),
      plugins: props.plugins,
    });

    this.shouldUpdatePluginViews = true;

    this._props = props;
    this.oldProps = { state: props.state };
    this.state = props.state;

    this.domObserver.stop();
    this.domObserver = new SelectionDOMObserver(this);
    this.domObserver.start();

    this.editable = getEditable(this);

    // Destroy the DOM created by the default
    // ProseMirror ViewDesc implementation; we
    // have a NodeViewDesc from React instead.
    this.docView.dom.replaceChildren();
    this.docView = props.docView;
  }

  /**
    * Like setProps, but without executing any side effects.
    * Safe to use in a component render method.
    */
  pureSetProps(props: Partial<DirectEditorProps>) {
    this._props = {
      ...this._props,
      ...props,
    };
    this.state = this._props.state;

    this.editable = getEditable(this);
  }

  /**
    * Triggers any side effects that have been queued by previous
    * calls to pureSetProps.
    */
  runPendingEffects() {
    if (changedProps(this.props, this.oldProps)) {
      const newProps = this.props;
      this._props = this.oldProps;
      this.state = this._props.state;
      this.update(newProps);
    }
  }

  update(props: DirectEditorProps) {
    super.update(props);
    // Ensure that side effects aren't re-triggered until
    // pureSetProps is called again
    this.oldProps = props;
  }

  updatePluginViews(prevState?: EditorState) {
    if (this.shouldUpdatePluginViews) {
      super.updatePluginViews(prevState);
    }
  }

  // We want to trigger the default EditorView cleanup, but without
  // the actual view.dom cleanup (which React will have already handled).
  // So we give the EditorView a dummy DOM element and ask it to clean up
  destroy() {
    this.dom = document.createElement("div");
    super.destroy();
  }
}
          `,
            },
          ]}
        />
        <p>
          Our subclass’s constructor takes a “docView” prop as an argument. This
          isn’t something that the superclass takes as an argument — the
          superclass is responsible for constructing and managing its own
          docView. The docView is the view descriptor tree that we mentioned
          earlier — ProseMirror’s virtual DOM implementation. A big difference
          between ProseMirror’s virtual DOM and React’s is that when ProseMirror
          updates its virtual DOM, each individual view descriptor updates its
          own corresponding DOM nodes immediately. Since our goal is to have
          those DOM nodes managed by React, we need to prevent that behavior. So
          we produce our own view descriptor tree, compatible with the
          ProseMirror view descriptor API, but with a no-op update
          implementation.
        </p>
        <p>
          The view descriptor implementations are somewhat complex and verbose,
          but here’s a relatively simple one (the view descriptor for a given
          ProseMirror node) to demonstrate the principle.
        </p>
        <Code
          subProps={[
            {
              title: "viewdesc.ts",
              lang: "ts",
              code: `// Node view descs are the main, most common type of view desc, and
// correspond to an actual node in the document. Unlike mark descs,
// they populate their child array themselves.
export class NodeViewDesc extends ViewDesc {
  constructor(
    parent: ViewDesc | undefined,
    children: ViewDesc[],
    getPos: () => number,
    public node: Node,
    public outerDeco: readonly Decoration[],
    public innerDeco: DecorationSource,
    dom: DOMNode,
    contentDOM: HTMLElement | null,
    public nodeDOM: DOMNode,
    public stopEvent: (event: Event) => boolean,
    public selectNode: () => void,
    public deselectNode: () => void
  ) {
    super(parent, children, getPos, dom, contentDOM);
  }

  // This always does nothing and returns true. The actual
  // DOM updates are handled by React.
  update(
    _node: Node,
    _outerDeco: readonly Decoration[],
    _innerDeco: DecorationSource,
    _view: EditorView
  ) {
    return true;
  }

  updateOuterDeco() {
    // pass
  }

  matchesNode(
    node: Node,
    outerDeco: readonly Decoration[],
    innerDeco: DecorationSource
  ) {
    return (
      this.dirty == NOT_DIRTY &&
      node.eq(this.node) &&
      sameOuterDeco(outerDeco, this.outerDeco) &&
      (innerDeco as InternalDecorationSource).eq(this.innerDeco)
    );
  }

  get size() {
    return this.node.nodeSize;
  }

  get border() {
    return this.node.isLeaf ? 0 : 1;
  }

  get domAtom() {
    return this.node.isAtom;
  }
}`,
            },
          ]}
        />
        <p className="text-sm font-bold">
          Why not just drop the view descriptors? Doesn’t React have it’s own
          virtual DOM?
        </p>
        <p className="text-sm">
          At one point, I looked into abandoning ProseMirror’s view descriptor
          tree. It turns out, a very significant amount of ProseMirror’s view
          functionality is baked deeply into the view descriptors, and
          ProseMirror view code assumes that it’s there. This is integral to how
          ProseMirror’s selection management works, as well as methods like{" "}
          <InlineCode>view.coordsAtPos</InlineCode>.
        </p>
      </BlogSection>
      <BlogSection id="react-renderer">
        <p>
          <LeadIn>Then came the true challenge</LeadIn>: re-implementing
          ProseMirror’s DOM update algorithm in React. For each view descriptor
          type (doc node, node, mark, widget, and text), we needed a React
          component that would implement the same behavior as the default
          EditorView. Then, we needed a series of components for rendering
          widget decorations in the correct place and wrapping nodes in marks
          and decorators. I ended up porting the entire{" "}
          <InlineCode>prosemirror-view</InlineCode> test suite over to ensure I
          hadn’t missed anything (spoiler alert: I had, there are more tests
          now).
        </p>
        <p>
          Walking through this new React implementation is too deep for even
          this <em>very</em> deep blog post, but anyone interested should take a
          look at{" "}
          <Link href="https://github.com/handlewithcarecollective/react-prosemirror/tree/main/src/components">
            the implementation on GitHub
          </Link>
          . For now, let’s just take a look at how we can use this new approach,
          published as{" "}
          <InlineCode>@handlewithcare/react-prosemirror</InlineCode>, to
          implement all of our previously problematic features without any state
          tearing!
        </p>
        {!serverOnly && (
          <ProseMirrorDemo>
            <Finale />
          </ProseMirrorDemo>
        )}
        <p className="text-sm">
          Want to see more? Check out{" "}
          <Link href="https://handlewithcarecollective.github.io/react-prosemirror">
            the full editor demo on GitHub Pages
          </Link>
          !
        </p>
        <p>
          This new library has some additional wins over the old one. It has
          support for server-side rendering, for one thing. It’s also very
          performant, even for very long documents with large numbers of custom
          node views. That was its own set of challenges, and will likely earn
          its own blog post some day soon! For now, give{" "}
          <InlineCode>@handlewithcare/react-prosemirror</InlineCode> a shot, and
          let me know what you think!
        </p>
      </BlogSection>
    </>
  );
}
