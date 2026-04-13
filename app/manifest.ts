import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GTA Funding",
    short_name: "GTA Funding",
    description:
      "Canada's fastest business funding — flexible capital in as little as 24 hours.",
    start_url: "/",
    display: "standalone",
    background_color: "#09090b",
    theme_color: "#0ea5e9",
    icons: [
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
