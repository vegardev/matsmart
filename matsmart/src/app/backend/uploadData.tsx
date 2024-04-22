"use server";
import { z } from "zod";
import {
  Recipe_CreateType,
  Recipe_Preview,
  Tags,
  Recipe_Page,
  Inventory_items,
} from "@/src/app/backend/definitions";
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
    console.log("Recipe insert complete");
    return recipe_id_packet[0].recipe_id;
  } catch (error) {
    throw Error((error as Error).message);
  }
}

export async function getRecipes(queryFetch: string, tagsFetch: string) {
  try {
    let recipes: Recipe_Preview[];

    if (!queryFetch || queryFetch.trim() === "") {
      recipes = (await query({
        query: "SELECT * FROM recipes",
        values: [],
      })) as Recipe_Preview[];
    } else {
      recipes = (await query({
        query: "SELECT * FROM recipes WHERE title LIKE ?",
        values: ["%" + queryFetch + "%"],
      })) as Recipe_Preview[];
    }

    for (const recipe of recipes) {
      const tags = (await query({
        query:
          "SELECT tag_name FROM tags INNER JOIN recipe_tags ON tags.tag_id = recipe_tags.tag_id WHERE recipe_tags.recipe_id = ?",
        values: [recipe.recipe_id],
      })) as RowDataPacket[];

      recipe.recipe_tags = tags.map((tag) => tag.tag_name);
    }

    if (tagsFetch && tagsFetch.trim() !== "") {
      const tags = tagsFetch.split(",");
      recipes = recipes.filter((recipe) =>
        tags.every((tag) => recipe.recipe_tags.includes(tag)),
      );
    }

    return recipes;
  } catch (error) {
    throw Error((error as Error).message);
  }
}

export async function getTags() {
  try {
    return (await query({
      query: "SELECT * FROM tags",
      values: [],
    })) as Tags[];
  } catch (error) {
    throw Error((error as Error).message);
  }
}

export async function getRecipeIds() {
  const result = await query({
    query: "SELECT recipe_id FROM recipes",
    values: [],
  });

  if (Array.isArray(result)) {
    return result.map((row) => {
      if ("recipe_id" in row) {
        return row.recipe_id;
      } else {
        throw new Error("Row does not have recipe_id property");
      }
    });
  } else {
    throw new Error("Query result is not an array");
  }
}

// Bruker automatisk parameteren for å komme til recipe page(n)
export async function makeDish(recipe_id: number) {
  // Henter nødvendige ingredienser til gjeldende recipe
  const recipe_items = (await query({
    query: "SELECT * FROM recipe_items WHERE recipe_id = ?",
    values: [recipe_id],
  })) as RowDataPacket[];

  console.log(recipe_items);
  console.log("started making dish");

  // For hver ingrediens, oppdateres gjenstående kvantitet
  for (const recipe_item of recipe_items) {
    await dishUsesIngredients(recipe_item.item_id, recipe_item.item_quantity);
  }
}

// Hjelpefunksjon for å fjerne brukte ingredienser fra inventory
export async function dishUsesIngredients(
  item_id: number,
  required_quantity: number,
) {
  // Viktig å sortere etter utløpsdato
  const inventory_items = (await query({
    query:
      "SELECT * FROM inventory WHERE item_id = ? ORDER BY expiration_date ASC",
    values: [item_id],
  })) as RowDataPacket[];

  console.log(inventory_items);
  console.log("started using ingredients");

  let remaining_quantity = required_quantity;

  // Løkke som sjekker hver rad av en spesifikk ingrediens og mengden av den
  for (const inventory_item of inventory_items) {
    console.log(inventory_item);
    console.log("started checking item");
    if (inventory_item.item_quantity <= remaining_quantity) {
      remaining_quantity -= inventory_item.item_quantity;
      console.log("remaining quantity: " + remaining_quantity);

      await query({
        query: "DELETE FROM inventory WHERE item_id = ?",
        values: [inventory_item.item_id],
      });
      console.log("deleted item");
    } else {
      inventory_item.item_quantity -= remaining_quantity;

      // If the ingredient is not completely used up, the quantity is updated instead
      await query({
        query: "UPDATE inventory SET item_quantity = ? WHERE item_id = ?",
        values: [inventory_item.item_quantity, inventory_item.item_id], // Corrected order
      });
      console.log("updated item");

      remaining_quantity = 0;
    }

    if (remaining_quantity === 0) {
      break;
    }
  }

  if (remaining_quantity > 0) {
    throw new Error("Not enough of the item in the inventory");
  }
}

export async function getRecipeByIdFetch(recipe_id: number) {
  try {
    const recipe = (await query({
      query: "SELECT * FROM recipes WHERE recipe_id = ?",
      values: [recipe_id],
    })) as Recipe_Page[];

    if (recipe.length === 0) {
      throw new Error("Recipe not found");
    }

    const tags = (await query({
      query:
        "SELECT tag_name FROM tags INNER JOIN recipe_tags ON tags.tag_id = recipe_tags.tag_id WHERE recipe_tags.recipe_id = ?",
      values: [recipe_id],
    })) as RowDataPacket[];

    recipe[0].recipe_tags = tags.map((tag) => tag.tag_name);

    const ingredients = (await query({
      query:
        "SELECT item_name, item_quantity, recipe_items.item_quantity_type FROM recipe_items INNER JOIN item_database ON recipe_items.item_id = item_database.item_id WHERE recipe_id = ?",
      values: [recipe_id],
    })) as RowDataPacket[];

    recipe[0].recipe_ingredients = ingredients.map((ingredient) => {
      return {
        item_name: ingredient.item_name,
        item_quantity: ingredient.item_quantity,
        item_quantity_type: ingredient.item_quantity_type,
      };
    });

    return recipe[0];
  } catch (error) {
    throw Error((error as Error).message);
  }
}

export async function getInventory() {
  try {
    return (await query({
      query:
        "SELECT * FROM inventory INNER JOIN item_database ON inventory.item_id = item_database.item_id",
      values: [],
    })) as Inventory_items[];
  } catch (error) {
    throw Error((error as Error).message);
  }
}

export async function addItemToShoppingList({
  item_id,
  item_quantity,
  item_quantity_type,
  item_name,
}: {
  item_id?: number;
  item_quantity: number;
  item_quantity_type: string;
  item_name?: string;
}) {
  try {
    if (!item_id) {
      const result = (await query({
        query: "SELECT item_id FROM item_database WHERE item_name = ?",
        values: [item_name],
      })) as RowDataPacket[];

      if (result.length > 0) {
        item_id = result[0].item_id;
      } else {
        throw new Error(`Item with name ${item_name} not found in database`);
      }
    }

    // Check if item_id already exists in shopping_list
    const existingItem = (await query({
      query: "SELECT item_quantity FROM shopping_list WHERE item_id = ?",
      values: [item_id],
    })) as RowDataPacket[];

    if (existingItem.length > 0) {
      // If item_id exists, update the item_quantity
      await query({
        query:
          "UPDATE shopping_list SET item_quantity = item_quantity + ? WHERE item_id = ?",
        values: [item_quantity, item_id],
      });
    } else if (item_quantity > 0) {
      // If item_id does not exist, insert a new record
      console.log(
        "inserting new item " +
          item_id +
          " " +
          item_quantity +
          " " +
          item_quantity_type,
      );
      await query({
        query:
          "INSERT INTO shopping_list (item_id, item_quantity, item_quantity_type) VALUES (?, ?, ?)",
        values: [item_id, item_quantity, item_quantity_type],
      });
    }
  } catch (error) {
    throw Error((error as Error).message);
  }
}
