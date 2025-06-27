"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

class Xor {
  constructor(private key: number) {
    this.key = key;
  }
  encode(input: string) {
    let output = "";

    for (let i = 0; i < input.length; ++i) {
      const hexInput = input.charCodeAt(i);
      const hexOutput = hexInput ^ this.key;

      output += this.fromHex(hexOutput);
    }

    return output;
  }
  decode(input: string) {
    let output = "";

    for (let i = 0; i < input.length; i += 2) {
      const hexInput = this.toHex(input, i);
      const hexOutput = hexInput ^ this.key;

      output += String.fromCharCode(hexOutput);
    }

    return output;
  }
  fromHex(hex: number) {
    let text = hex.toString(16);

    if (hex < 16) {
      text = "0" + text;
    }

    return text;
  }
  toHex(text: string, i: number) {
    const sequence = text.substr(i, 2);

    return parseInt(sequence, 16);
  }
}

export function CopyEmailButton() {
  const [contents, setContents] = useState(
    "171a1313103f171e111b131a08160b171c1e0d1a511b1a09",
  );
  const [description, setDescription] = useState("Copy");
  const buttonRef = useRef<null | HTMLButtonElement>(null);
  const [forceHover, setForceHover] = useState(false);

  useLayoutEffect(() => {
    const key = 127;
    const xor = new Xor(key);
    setContents(xor.decode(contents));
  }, []);

  const handleClick = useCallback(async () => {
    await navigator.clipboard.writeText(contents);
    setForceHover(true);
    setDescription("Copied");

    setTimeout(() => {
      setForceHover(false);
      if (buttonRef.current?.matches(":hover")) {
        function handleMouseOut() {
          setTimeout(() => {
            setDescription("Copy");
          }, 300);

          buttonRef.current?.removeEventListener("mouseout", handleMouseOut);
        }
        buttonRef.current.addEventListener("mouseout", handleMouseOut);
      } else {
        setTimeout(() => {
          setDescription("Copy");
        }, 300);
      }
    }, 1000);
  }, []);

  return (
    <button
      ref={buttonRef}
      type="button"
      className={`group hover:text-brown hover:bg-canvas before:bg-green relative flex content-center items-center gap-3 rounded-[3.75rem] px-6 py-3 text-xl transition-colors duration-300 before:block before:h-3 before:w-3 before:rounded-full before:content-[""] active:opacity-80 md:px-8 md:py-4 md:text-[2.5rem] md:before:h-6 md:before:w-6`}
      onClick={handleClick}
    >
      <p
        className={twMerge(
          "font-headings absolute -top-8 left-1/2 -translate-x-1/2 text-base text-white uppercase transition-opacity duration-300 group-hover:opacity-100 md:-top-12 md:text-2xl",
          forceHover ? "opacity-100" : "opacity-0",
        )}
      >
        {description}
      </p>
      <span>{contents}</span>
    </button>
  );
}
