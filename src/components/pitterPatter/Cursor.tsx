"use client";

import { useLayoutEffect, useRef, useState } from "react";

interface Props {
  targetId: string;
}

export function Cursor({ targetId }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);

  useLayoutEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;

    const rect = target.getBoundingClientRect();

    setLeft(rect.left);
    setTop(rect.top);
  }, []);

  return (
    <div
      style={{ top, left }}
      className="bg-brown absolute h-[1em] w-1"
      ref={ref}
    />
  );
}
