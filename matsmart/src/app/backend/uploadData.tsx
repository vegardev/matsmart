"use server";
import { z } from "zod";
import { Recipe_CreateType } from "@/src/app/backend/definitions";
import { query } from "@/src/app/backend/db";
import { RowDataPacket } from "mysql2";

const Recipe_Create = z.object({
  title: z.string(),
  recipe_method: z.string(),
  recipe_nutritions: z.string(),
  recipe_image: z.string(),
  recipe_time: z.string(),
  recipe_ingredients: z.array(
    z.object({
      item_name: z.string(),
      item_quantity: z.number(),
      item_quantity_type: z.string(),
    }),
  ),
  recipe_tags: z.array(z.string()),
});

export async function createRecipe(recipeContent: Recipe_CreateType) {
  const recipe = Recipe_Create.parse(recipeContent);
  try {
    await query({
      query:
        "INSERT INTO recipes (title, recipe_method, recipe_nutritions, recipe_image, recipe_time) VALUES (?, ?, ?, ?, ?)",
      values: [
        recipe.title,
        recipe.recipe_method,
        recipe.recipe_nutritions,
        recipe.recipe_image,
        recipe.recipe_time,
      ],
    });

    console.log("Recipe created");

    // Get the recipe_id of the recipe you just created
    const recipe_id = await query({
      query:
        "SELECT recipe_id FROM recipes WHERE title = ? ORDER BY recipe_id DESC LIMIT 1",
      values: [recipe.title],
    });
    let recipe_id_packet: RowDataPacket[] = recipe_id as RowDataPacket[];
    console.log("Got recipe id: " + recipe_id_packet[0].recipe_id);

    // Insert the recipe_ingredients into the recipe_items table
    for (const ingredient of recipe.recipe_ingredients) {
      let item_id = await query({
        query: "Select item_id FROM item_database WHERE item_name = ?",
        values: [ingredient.item_name],
      });

      if (item_id == null || (Array.isArray(item_id) && item_id.length === 0)) {
        item_id = await query({
          query:
            "INSERT INTO item_database (item_name, item_quantity_type) VALUES (?, ?)",
          values: [ingredient.item_name, ingredient.item_quantity_type],
        });

        let item_id_number: number | null = null;

        if ("insertId" in item_id) {
          item_id_number = item_id.insertId;
        }

        await query({
          query:
            "INSERT INTO recipe_items (recipe_id, item_id, item_quantity, item_quantity_type) VALUES (?, ?, ?, ?)",
          values: [
            recipe_id_packet[0].recipe_id,
            item_id_number,
            ingredient.item_quantity,
            ingredient.item_quantity_type,
          ],
        });
      } else {
        let item_id_packet: RowDataPacket[] = item_id as RowDataPacket[];

        await query({
          query:
            "INSERT INTO recipe_items (recipe_id, item_id, item_quantity, item_quantity_type) VALUES (?, ?, ?, ?)",
          values: [
            recipe_id_packet[0].recipe_id,
            item_id_packet[0].item_id,
            ingredient.item_quantity,
            ingredient.item_quantity_type,
          ],
        });
      }
    }

    console.log("Ingredients inserted");

    // Insert the recipe_tags into the recipe_tags table
    for (const tag of recipe.recipe_tags) {
      let tag_id = await query({
        query: "Select tag_id FROM tags WHERE tag_name = ?",
        values: [tag],
      });

      if (tag_id == null || (Array.isArray(tag_id) && tag_id.length === 0)) {
        tag_id = await query({
          query: "INSERT INTO tags (tag_name) VALUES (?)",
          values: [tag],
        });

        let tag_id_number: number | null = null;

        if ("insertId" in tag_id) {
          tag_id_number = tag_id.insertId;
        }

        await query({
          query: "INSERT INTO recipe_tags (recipe_id, tag_id) VALUES (?, ?)",
          values: [recipe_id_packet[0].recipe_id, tag_id_number],
        });
      } else {
        await query({
          query: "INSERT INTO recipe_tags (recipe_id, tag) VALUES (?, ?)",
          values: [recipe_id_packet[0].recipe_id, tag_id],
        });
      }
    }

    console.log("Tags inserted");
    console.log("Recipe created");
    return recipe_id_packet[0].recipe_id;
  } catch (error) {
    throw Error((error as Error).message);
  }
}
