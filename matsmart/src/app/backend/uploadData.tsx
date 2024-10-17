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

/**
 * Creates a new recipe in the database.
 * @param recipeContent - The content of the recipe to be created.
 * @returns The ID of the newly created recipe.
 * @throws Error if there is an error creating the recipe.
 */
export async function createRecipe(recipeContent: Recipe_CreateType) {
  const recipe = Recipe_Create.parse(recipeContent);
  try {
    // Insert the new recipe into the 'recipes' table in the database.
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

    // Retrieve the ID of the recipe that was just created.
    const recipe_id = await query({
      query:
        "SELECT recipe_id FROM recipes WHERE title = ? ORDER BY recipe_id DESC LIMIT 1",
      values: [recipe.title],
    });
    let recipe_id_packet: RowDataPacket[] = recipe_id as RowDataPacket[];
    console.log("Got recipe id: " + recipe_id_packet[0].recipe_id);

    // For each ingredient in the recipe, insert it into the 'recipe_items' table.
    for (const ingredient of recipe.recipe_ingredients) {
      // Check if the ingredient already exists in the 'item_database' table.
      let item_id = await query({
        query: "Select item_id FROM item_database WHERE item_name = ?",
        values: [ingredient.item_name],
      });

      // If the ingredient does not exist, create a new entry in the 'item_database' table.
      if (item_id == null || (Array.isArray(item_id) && item_id.length === 0)) {
        item_id = await query({
          query:
            "INSERT INTO item_database (item_name, item_quantity_type) VALUES (?, ?)",
          values: [ingredient.item_name, ingredient.item_quantity_type],
        });

        let item_id_number: number | null = null;

        // Get the ID of the newly created ingredient.
        if ("insertId" in item_id) {
          item_id_number = item_id.insertId;
        }

        // Insert the ingredient into the 'recipe_items' table.
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
        // If the ingredient already exists, just insert it into the 'recipe_items' table.
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

    // For each tag in the recipe, insert it into the 'recipe_tags' table.
    for (const tag of recipe.recipe_tags) {
      // Check if the tag already exists in the 'tags' table.
      let tag_id = await query({
        query: "Select tag_id FROM tags WHERE tag_name = ?",
        values: [tag],
      });

      // If the tag does not exist, create a new entry in the 'tags' table.
      if (tag_id == null || (Array.isArray(tag_id) && tag_id.length === 0)) {
        tag_id = await query({
          query: "INSERT INTO tags (tag_name) VALUES (?)",
          values: [tag],
        });

        let tag_id_number: number | null = null;

        // Get the ID of the newly created tag.
        if ("insertId" in tag_id) {
          tag_id_number = tag_id.insertId;
        }

        // Insert the tag into the 'recipe_tags' table.
        await query({
          query: "INSERT INTO recipe_tags (recipe_id, tag_id) VALUES (?, ?)",
          values: [recipe_id_packet[0].recipe_id, tag_id_number],
        });
      } else {
        // If the tag already exists, just insert it into the 'recipe_tags' table.
        let tag_id_packet: RowDataPacket[] = tag_id as RowDataPacket[];

        await query({
          query: "INSERT INTO recipe_tags (recipe_id, tag_id) VALUES (?, ?)",
          values: [recipe_id_packet[0].recipe_id, tag_id_packet[0].tag_id],
        });
      }
    }

    console.log("Tags inserted");
    console.log("Recipe insert complete");
    // Return the ID of the newly created recipe.
    return recipe_id_packet[0].recipe_id;
  } catch (error) {
    throw Error((error as Error).message);
  }
}

/**
 * Retrieves recipes based on the provided query and tags.
 * If no query is provided, all recipes are fetched.
 * If tags are provided, only recipes that have all the specified tags are returned.
 * @param queryFetch - The query to search for recipes by title.
 * @param tagsFetch - The tags to filter recipes by.
 * @returns An array of Recipe_Preview objects that match the query and tags.
 * @throws Error if there is an error during the database query.
 */
export async function getRecipes(queryFetch: string, tagsFetch: string) {
  try {
    let recipes: Recipe_Preview[];

    // If the queryFetch is empty or just whitespace, select all recipes
    if (!queryFetch || queryFetch.trim() === "") {
      recipes = (await query({
        query: "SELECT * FROM recipes",
        values: [],
      })) as Recipe_Preview[];
    } else {
      // If the queryFetch is not empty, select recipes where the title matches the queryFetch
      recipes = (await query({
        query: "SELECT * FROM recipes WHERE title LIKE ?",
        values: ["%" + queryFetch + "%"],
      })) as Recipe_Preview[];
    }

    // For each recipe, select the tags associated with it
    for (const recipe of recipes) {
      const tags = (await query({
        query:
          "SELECT tag_name FROM tags INNER JOIN recipe_tags ON tags.tag_id = recipe_tags.tag_id WHERE recipe_tags.recipe_id = ?",
        values: [recipe.recipe_id],
      })) as RowDataPacket[];

      // Map the tags to the recipe
      recipe.recipe_tags = tags.map((tag) => tag.tag_name);
    }

    // If tagsFetch is not empty, filter the recipes to only include those with the specified tags
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

/**
 * Retrieves all tags from the database.
 * @returns {Promise<Tags[]>} A promise that resolves to an array of Tags objects.
 * @throws {Error} If there is an error retrieving the tags.
 */
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

/**
 * Retrieves an array of recipe IDs from the database.
 * @returns {Promise<number[]>} An array of recipe IDs.
 * @throws {Error} If the query result is not an array or if a row does not have the recipe_id property.
 */
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

/**
 * Makes a dish by retrieving necessary ingredients for the given recipe
 * and updating the remaining quantity for each ingredient.
 *
 * @param recipe_id - The ID of the recipe
 */
export async function makeDish(recipe_id: number) {
  // Fetches necessary ingredients for the current recipe
  const recipe_items = (await query({
    query: "SELECT * FROM recipe_items WHERE recipe_id = ?",
    values: [recipe_id],
  })) as RowDataPacket[];

  console.log(recipe_items);
  console.log("started making dish");

  // For each ingredient, the remaining quantity is updated
  for (const recipe_item of recipe_items) {
    await dishUsesIngredients(recipe_item.item_id, recipe_item.item_quantity);
  }
}

/**
 * Uses ingredients from the inventory to fulfill a dish.
 * @param item_id - The ID of the item to be used.
 * @param required_quantity - The required quantity of the item.
 * @throws {Error} - If there is not enough of the item in the inventory.
 */
export async function dishUsesIngredients(
  item_id: number,
  required_quantity: number,
) {
  // Important to sort by expiration date
  const inventory_items = (await query({
    query:
      "SELECT * FROM inventory WHERE item_id = ? ORDER BY expiration_date ASC",
    values: [item_id],
  })) as RowDataPacket[];

  console.log(inventory_items);
  console.log("started using ingredients");

  let remaining_quantity = required_quantity;

  // Loop that checks each row of a specific ingredient and the quantity of it
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
        values: [inventory_item.item_quantity, inventory_item.item_id],
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

/**
 * Retrieves a recipe by its ID from the database.
 * @param recipe_id - The ID of the recipe to retrieve.
 * @returns The recipe object with the specified ID.
 * @throws If the recipe is not found or an error occurs during the retrieval process.
 */
export async function getRecipeByIdFetch(recipe_id: number) {
  try {
    // Query the database for a recipe with the given id
    const recipe = (await query({
      query: "SELECT * FROM recipes WHERE recipe_id = ?",
      values: [recipe_id],
    })) as Recipe_Page[];

    // If the recipe is not found, throw an error
    if (recipe.length === 0) {
      throw new Error("Recipe not found");
    }

    // Query the database for tags associated with the recipe
    const tags = (await query({
      query:
        "SELECT tag_name FROM tags INNER JOIN recipe_tags ON tags.tag_id = recipe_tags.tag_id WHERE recipe_tags.recipe_id = ?",
      values: [recipe_id],
    })) as RowDataPacket[];

    // Add the tags to the recipe object
    recipe[0].recipe_tags = tags.map((tag) => tag.tag_name);

    // Query the database for ingredients associated with the recipe
    const ingredients = (await query({
      query:
        "SELECT item_name, item_quantity, recipe_items.item_quantity_type FROM recipe_items INNER JOIN item_database ON recipe_items.item_id = item_database.item_id WHERE recipe_id = ?",
      values: [recipe_id],
    })) as RowDataPacket[];

    // Add the ingredients to the recipe object
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

/**
 * Adds an item to the shopping list.
 * If the item_id is not provided, it will be retrieved from the item_database based on the item_name.
 * If the item_id already exists in the shopping_list, the item_quantity will be updated.
 * If the item_id does not exist in the shopping_list, a new record will be inserted.
 * @param {Object} params - The parameters for adding an item to the shopping list.
 * @param {number} params.item_id - The ID of the item (optional).
 * @param {number} params.item_quantity - The quantity of the item.
 * @param {string} params.item_quantity_type - The type of quantity for the item.
 * @param {string} params.item_name - The name of the item (optional).
 * @throws {Error} If the item with the provided name is not found in the database.
 */
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
    // If item_id is not provided, it tries to fetch it from the item_database using the item_name.
    if (!item_id) {
      const result = (await query({
        query: "SELECT item_id FROM item_database WHERE item_name = ?",
        values: [item_name],
      })) as RowDataPacket[];

      // If the item is found in the database, it sets the item_id.
      if (result.length > 0) {
        item_id = result[0].item_id;
      } else {
        throw new Error(`Item with name ${item_name} not found in database`);
      }
    }

    // It checks if the item_id already exists in the shopping_list.
    const existingItem = (await query({
      query: "SELECT item_quantity FROM shopping_list WHERE item_id = ?",
      values: [item_id],
    })) as RowDataPacket[];

    // If the item_id exists in the shopping_list, it updates the item_quantity.
    if (existingItem.length > 0) {
      await query({
        query:
          "UPDATE shopping_list SET item_quantity = item_quantity + ? WHERE item_id = ?",
        values: [item_quantity, item_id],
      });
    } else if (item_quantity > 0) {
      // If the item_id does not exist in the shopping_list and the item_quantity is greater than 0, it inserts a new record.
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
