"use server";
import { z } from "zod";
import { Recipe_createTest } from "@/src/app/backend/definitions";
//import { query } from "@/src/app/backend/db";

const Recipe_Create = z.object({
  title: z.string(),
  recipe_method: z.string(),
  recipe_nutritions: z.string(),
  image: z.string(),
});

export async function createRecipe(recipeContent: Recipe_createTest) {
  const recipe = Recipe_Create.parse(recipeContent);
  /*try {
    const dbquery = await query({
      query:
        "INSERT INTO recipes (title, recipe_method, recipe_nutritions, image, recipe_time) VALUES (?, ?, ?, ?, ?)",
      values: [
        recipe.title,
        recipe.recipe_method,
        recipe.recipe_nutritions,
        recipe.image,
        recipe.recipe_time,
      ],
    });
    return dbquery;
  } catch (error) {
    throw Error((error as Error).message);
  }*/
  console.log(recipe);
}
