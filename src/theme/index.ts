import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import { brandColors } from "./colors";
import { semanticRecipes } from "./components";

const config = defineConfig({
  theme: {
    tokens: {
      colors: brandColors,
    },
    semanticTokens: {
      colors: {
        bg: { value: "{colors.gray.950}" },
        panel: { value: "{colors.gray.900}" },
        muted: { value: "{colors.gray.400}" },
        text: { value: "{colors.gray.100}" },
        border: { value: "{colors.gray.700}" },
        accent: { value: "{colors.cyan.400}" },
      },
    },
    recipes: semanticRecipes,
  },
  globalCss: {
    "html, body": {
      background: "{colors.bg}",
      color: "{colors.text}",
      minHeight: "100%",
    },
    "*::selection": {
      background: "{colors.cyan.700}",
      color: "{colors.gray.100}",
    },
  },
});

export const system = createSystem(defaultConfig, config);