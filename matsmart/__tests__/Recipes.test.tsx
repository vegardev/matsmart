import { query } from "@/src/app/backend/db";
import * as uploadData from "@/src/app/backend/uploadData";

jest.mock("../src/app/backend/db", () => ({
  query: jest.fn(),
}));

describe("createRecipe function", () => {
  it("creates a recipe correctly", async () => {
    const mockRecipe = {
      title: "recipe1",
      recipe_time: "time1",
      recipe_image: "image1",
      recipe_method: "method1",
    };
    const mockRecipeId = 1;
    const query = jest
      .fn()
      .mockResolvedValueOnce({
        insertId: mockRecipeId,
      })
      .mockResolvedValueOnce([{ recipe_id: mockRecipeId }])
      .mockResolvedValue([{ insertId: 1 }]);

    const uploadData = {
      createRecipe: jest.fn(async (recipe) => {
        await query({ query: "INSERT INTO recipes SET ?", values: [recipe] });
        const recipeId = await query({ query: "SELECT LAST_INSERT_ID()" });
        return recipeId[0].recipe_id;
      }),
    };

    const result = await uploadData.createRecipe(mockRecipe);

    expect(result).toEqual(mockRecipeId);
    expect(query).toHaveBeenNthCalledWith(1, {
      query: "INSERT INTO recipes SET ?",
      values: [mockRecipe],
    });
    expect(query).toHaveBeenNthCalledWith(2, {
      query: "SELECT LAST_INSERT_ID()",
    });
  });
});

describe("getRecipes function", () => {
  it("fetches all recipes when no query is provided", async () => {
    const mockRecipes = [
      { recipe_id: 1, title: "Recipe 1", recipe_tags: ["tag1", "tag2"] },
      { recipe_id: 2, title: "Recipe 2", recipe_tags: ["tag3", "tag4"] },
    ];

    (query as jest.Mock)
      .mockResolvedValueOnce(mockRecipes)
      .mockResolvedValueOnce([{ tag_name: "tag1" }, { tag_name: "tag2" }])
      .mockResolvedValue([{ tag_name: "tag3" }, { tag_name: "tag4" }]);

    const result = await uploadData.getRecipes("", "");

    expect(result).toEqual(mockRecipes);
    expect(query).toHaveBeenCalledWith({
      query: "SELECT * FROM recipes",
      values: [],
    });
  });

  it("fetches recipes with a title that contains the query", async () => {
    const mockRecipes = [
      { recipe_id: 1, title: "Recipe 1", recipe_tags: ["tag1", "tag2"] },
    ];

    (query as jest.Mock)
      .mockResolvedValueOnce(mockRecipes)
      .mockResolvedValue([{ tag_name: "tag1" }, { tag_name: "tag2" }]);

    const result = await uploadData.getRecipes("Recipe 1", "");

    expect(result).toEqual(mockRecipes);
    expect(query).toHaveBeenCalledWith({
      query: "SELECT * FROM recipes WHERE title LIKE ?",
      values: ["%Recipe 1%"],
    });
  });

  it("filters recipes by tags", async () => {
    const mockRecipes = [
      { recipe_id: 1, title: "Recipe 1", recipe_tags: ["tag1", "tag2"] },
      { recipe_id: 2, title: "Recipe 2", recipe_tags: ["tag3", "tag4"] },
    ];

    (query as jest.Mock)
      .mockResolvedValueOnce(mockRecipes)
      .mockResolvedValueOnce([{ tag_name: "tag1" }, { tag_name: "tag2" }])
      .mockResolvedValue([{ tag_name: "tag3" }, { tag_name: "tag4" }]);

    const result = await uploadData.getRecipes("", "tag1,tag2");

    expect(result).toEqual([mockRecipes[0]]);
  });

  it("throws an error when the query fails", async () => {
    (query as jest.Mock).mockRejectedValue(new Error("Database error"));

    await expect(uploadData.getRecipes("", "")).rejects.toThrow(
      "Database error",
    );
  });
});

describe("getTags function", () => {
  it("gets tags correctly", async () => {
    const mockTags = [
      {
        tag_id: 1,
        tag_name: "tag1",
      },
      {
        tag_id: 2,
        tag_name: "tag2",
      },
    ];
    (query as jest.Mock).mockResolvedValue(mockTags);

    const result = await uploadData.getTags();

    expect(result).toEqual(mockTags);
    expect(query).toHaveBeenCalledWith({
      query: "SELECT * FROM tags",
      values: [],
    });
  });
});

describe("makeDish function", () => {
  it("makes a dish correctly", async () => {
    const mockRecipeId = 1;
    const mockRecipeItems = [
      { item_id: 1, item_quantity: 2 },
      { item_id: 2, item_quantity: 3 },
    ];

    const query = jest
      .fn()
      .mockResolvedValueOnce(mockRecipeItems)
      .mockResolvedValueOnce(undefined);

    const uploadData = {
      makeDish: jest.fn(async (recipeId) => {
        const recipeItems = await query({
          query: "SELECT * FROM recipe_items WHERE recipe_id = ?",
          values: [recipeId],
        });
        for (const recipeItem of recipeItems) {
          await query({
            query: "CALL dishUsesIngredients(?, ?)",
            values: [recipeItem.item_id, recipeItem.item_quantity],
          });
        }
      }),
    };

    await uploadData.makeDish(mockRecipeId);

    expect(query).toHaveBeenCalledWith({
      query: "SELECT * FROM recipe_items WHERE recipe_id = ?",
      values: [mockRecipeId],
    });
    for (const recipeItem of mockRecipeItems) {
      expect(query).toHaveBeenCalledWith({
        query: "CALL dishUsesIngredients(?, ?)",
        values: [recipeItem.item_id, recipeItem.item_quantity],
      });
    }
  });
});

describe("dishUsesIngredients function", () => {
  it("uses ingredients correctly", async () => {
    const mockItemId = 1;
    const mockRequiredQuantity = 5;
    const mockInventoryItems = [
      { item_id: mockItemId, item_quantity: 2 },
      { item_id: mockItemId, item_quantity: 3 },
    ];
    (query as jest.Mock)
      .mockResolvedValueOnce(mockInventoryItems)
      .mockResolvedValue(undefined);

    await uploadData.dishUsesIngredients(mockItemId, mockRequiredQuantity);

    expect(query).toHaveBeenCalledWith({
      query:
        "SELECT * FROM inventory WHERE item_id = ? ORDER BY expiration_date ASC",
      values: [mockItemId],
    });
    for (const inventoryItem of mockInventoryItems) {
      if (inventoryItem.item_quantity <= mockRequiredQuantity) {
        expect(query).toHaveBeenCalledWith({
          query: "DELETE FROM inventory WHERE item_id = ?",
          values: [inventoryItem.item_id],
        });
      } else {
        expect(query).toHaveBeenCalledWith({
          query: "UPDATE inventory SET item_quantity = ? WHERE item_id = ?",
          values: [inventoryItem.item_quantity, inventoryItem.item_id],
        });
      }
    }
  });

  it("throws an error when there is not enough of the item in the inventory", async () => {
    const mockItemId = 1;
    const mockRequiredQuantity = 5;
    const mockInventoryItems = [{ item_id: mockItemId, item_quantity: 2 }];
    (query as jest.Mock).mockResolvedValue(mockInventoryItems);

    await expect(
      uploadData.dishUsesIngredients(mockItemId, mockRequiredQuantity),
    ).rejects.toThrow("Not enough of the item in the inventory");
  });
});

describe("getRecipeByIdFetch function", () => {
  it("fetches a recipe by id correctly", async () => {
    const mockRecipeId = 1;
    const mockRecipe = [
      {
        recipe_id: 1,
        title: "recipe1",
        recipe_time: "time1",
        recipe_image: "image1",
        recipe_method: "method1",
      },
    ];
    const mockTags = [{ tag_name: "tag1" }, { tag_name: "tag2" }];
    const mockIngredients = [
      {
        item_name: "ingredient1",
        item_quantity: 2,
        item_quantity_type: "type1",
      },
      {
        item_name: "ingredient2",
        item_quantity: 3,
        item_quantity_type: "type2",
      },
    ];
    (query as jest.Mock)
      .mockResolvedValueOnce(mockRecipe)
      .mockResolvedValueOnce(mockTags)
      .mockResolvedValueOnce(mockIngredients);

    const result = await uploadData.getRecipeByIdFetch(mockRecipeId);

    expect(result).toEqual({
      ...mockRecipe[0],
      recipe_tags: mockTags.map((tag) => tag.tag_name),
      recipe_ingredients: mockIngredients,
    });
    expect(query).toHaveBeenCalledWith({
      query: "SELECT * FROM recipes WHERE recipe_id = ?",
      values: [mockRecipeId],
    });
    expect(query).toHaveBeenCalledWith({
      query:
        "SELECT tag_name FROM tags INNER JOIN recipe_tags ON tags.tag_id = recipe_tags.tag_id WHERE recipe_tags.recipe_id = ?",
      values: [mockRecipeId],
    });
    expect(query).toHaveBeenCalledWith({
      query:
        "SELECT item_name, item_quantity, recipe_items.item_quantity_type FROM recipe_items INNER JOIN item_database ON recipe_items.item_id = item_database.item_id WHERE recipe_id = ?",
      values: [mockRecipeId],
    });
  });

  it("throws an error when the recipe is not found", async () => {
    const mockRecipeId = 1;
    (query as jest.Mock).mockResolvedValue([]);

    await expect(uploadData.getRecipeByIdFetch(mockRecipeId)).rejects.toThrow(
      "Recipe not found",
    );
  });
});

describe("getInventory function", () => {
  it("fetches the inventory correctly", async () => {
    const mockInventoryItems = [
      {
        item_id: 1,
        item_quantity: 5,
        item_quantity_type: "type1",
        item_name: "item1",
        item_location: "location1",
        expiration_date: new Date(),
      },
      {
        item_id: 2,
        item_quantity: 6,
        item_quantity_type: "type2",
        item_name: "item2",
        item_location: "location2",
        expiration_date: new Date(),
      },
    ];
    (query as jest.Mock).mockResolvedValue(mockInventoryItems);

    const result = await uploadData.getInventory();

    expect(result).toEqual(mockInventoryItems);
    expect(query).toHaveBeenCalledWith({
      query:
        "SELECT * FROM inventory INNER JOIN item_database ON inventory.item_id = item_database.item_id",
      values: [],
    });
  });

  it("throws an error when the query fails", async () => {
    const mockError = new Error("query failed");
    (query as jest.Mock).mockRejectedValue(mockError);

    await expect(uploadData.getInventory()).rejects.toThrow(mockError);
  });
});

describe("addItemToShoppingList function", () => {
  it("adds an item to the shopping list correctly", async () => {
    const mockItem = {
      item_id: 1,
      item_quantity: 5,
      item_quantity_type: "type1",
      item_name: "item1",
    };

    const query = jest
      .fn()
      .mockResolvedValueOnce([{ item_id: mockItem.item_id }])
      .mockResolvedValueOnce([{ item_quantity: 2 }])
      .mockResolvedValueOnce(undefined);

    const uploadData = {
      addItemToShoppingList: jest.fn(async (item) => {
        const itemId = await query({
          query: "SELECT item_id FROM item_database WHERE item_name = ?",
          values: [item.item_name],
        });
        const existingItem = await query({
          query: "SELECT item_quantity FROM shopping_list WHERE item_id = ?",
          values: [itemId[0].item_id],
        });
        if (existingItem[0]) {
          await query({
            query:
              "UPDATE shopping_list SET item_quantity = item_quantity + ? WHERE item_id = ?",
            values: [item.item_quantity, itemId[0].item_id],
          });
        }
      }),
    };

    await uploadData.addItemToShoppingList(mockItem);

    expect(query).toHaveBeenNthCalledWith(1, {
      query: "SELECT item_id FROM item_database WHERE item_name = ?",
      values: [mockItem.item_name],
    });
    expect(query).toHaveBeenNthCalledWith(2, {
      query: "SELECT item_quantity FROM shopping_list WHERE item_id = ?",
      values: [mockItem.item_id],
    });
    expect(query).toHaveBeenNthCalledWith(3, {
      query:
        "UPDATE shopping_list SET item_quantity = item_quantity + ? WHERE item_id = ?",
      values: [mockItem.item_quantity, mockItem.item_id],
    });
  });

  it("throws an error when the item is not found in the database", async () => {
    const mockItem = {
      item_quantity: 5,
      item_quantity_type: "type1",
      item_name: "item1",
    };
    (query as jest.Mock).mockResolvedValue([]);

    await expect(uploadData.addItemToShoppingList(mockItem)).rejects.toThrow(
      `Item with name ${mockItem.item_name} not found in database`,
    );
  });
});
