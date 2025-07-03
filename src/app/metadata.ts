import { Metadata } from "next";

export const openGraph = {
  title: "Handle with Care Collective",
  description: "A worker-owned product development cooperative.",
  locale: "en_US",
  type: "website",
  url: "https://handlewithcare.dev",
  images: [
    {
      url: "https://handlewithcare.dev/images/og-image.png",
      alt: "The Handle with Care wordmark",
    },
  ],
} satisfies Metadata["openGraph"];
