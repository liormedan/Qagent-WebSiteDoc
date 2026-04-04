import { defineRecipe } from "@chakra-ui/react";

export const semanticRecipes = {
  card: defineRecipe({
    base: {
      background: "{colors.panel}",
      borderColor: "{colors.border}",
      borderWidth: "1px",
      borderRadius: "lg",
    },
  }),
};