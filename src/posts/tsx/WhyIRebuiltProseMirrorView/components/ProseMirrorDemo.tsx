import { type ReactNode } from "react";
import ErrorBoundary from "./ErrorBoundary";

interface Props {
  children?: ReactNode;
}

export function ProseMirrorDemo({ children }: Props) {
  return (
    <>
      <p>Try it out!</p>
      <div className="group/demo rounded-sm border bg-gray-200 p-4 focus-within:border-black">
        <ErrorBoundary>{children}</ErrorBoundary>
      </div>
    </>
  );
}
