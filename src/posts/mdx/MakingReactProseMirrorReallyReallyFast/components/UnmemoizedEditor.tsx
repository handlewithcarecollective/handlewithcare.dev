"use client";

import {
  reactKeys,
  ProseMirror,
  ProseMirrorDoc,
  useEditorEffect,
} from "@nytimes/react-prosemirror-unmemoized";
import { EditorEval, StateContext } from "./EditorEval";
import { useContext } from "react";

export function UnmemoizedEditor() {
  return (
    <EditorEval reactKeysPlugin={reactKeys}>
      <Editor />
    </EditorEval>
  );
}

function Editor() {
  const state = useContext(StateContext);

  return (
    <ProseMirror defaultState={state}>
      <Doc />
    </ProseMirror>
  );
}

function Doc() {
  useEditorEffect((view) => {
    view.focus();
  }, []);

  return <ProseMirrorDoc />;
}
