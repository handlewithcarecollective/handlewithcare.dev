"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { Children, ReactNode } from "react";

export const TabsRoot = Tabs.Root;

interface Props {
  titles: string[];
  children: ReactNode;
}

export function TabsList({ titles, children }: Props) {
  const tabs = Children.toArray(children);
  return (
    <Tabs.List style={{ display: "flex" }}>
      {titles.map((title, i) => (
        <Tabs.Trigger asChild key={title} value={title}>
          {tabs[i]}
        </Tabs.Trigger>
      ))}
    </Tabs.List>
  );
}

export const TabsContent = Tabs.Content;
