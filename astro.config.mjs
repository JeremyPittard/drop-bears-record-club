// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  output: "server",
  experimental: {
    fonts: [
      {
        provider: fontProviders.bunny(),
        name: "Atkinson Hyperlegible",
        cssVariable: "--font-atkinson",
      },
    ],
  },

  adapter: cloudflare(),
});
