"use client";

import { useEffect, useState } from "react";

export function Times() {
  const [princeton, setPrinceton] = useState("");
  const [losAngelos, setLosAngelos] = useState("");

  useEffect(() => {
    const id = setInterval(() => {
      const now = Date.now();

      setPrinceton(
        new Intl.DateTimeFormat("en-US", {
          timeStyle: "short",
          timeZone: "America/New_York",
        }).format(now),
      );

      setLosAngelos(
        new Intl.DateTimeFormat("en-US", {
          timeStyle: "short",
          timeZone: "America/Los_Angeles",
        }).format(now),
      );
    }, 1000);
  }, []);

  return (
    <div className="font-headings relative top-0 flex justify-between px-4 uppercase md:top-4">
      <p className="text-xl">
        {princeton}
        <br className="block md:hidden" /> Princeton
      </p>
      <p className="text-xl">
        {losAngelos}
        <br className="block md:hidden" /> Los Angelos
      </p>
    </div>
  );
}
