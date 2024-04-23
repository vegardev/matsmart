jest.mock("next/navigation", () => ({
  useRouter: () => ({
    basePath: "",
    pathname: "/recipes",
    route: "/recipes",
    searchParams: "",
    query: "",
    replace: jest.fn(),
    // Add any other properties that your components use
  }),
}));

import React, { useState } from "react";
import Recipes from "@/src/app/recipes/page";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { recipesDummyData } from "@/src/app/backend/dummyData";
import fetch from "jest-fetch-mock";
import { query } from "@/src/app/backend/db";
import * as uploadData from "@/src/app/backend/uploadData";
import { useRouter } from "next-router-mock";

jest.mock("../src/app/backend/db", () => ({
  query: jest.fn(),
}));

describe("Recipes", () => {
  it("renders properly", async () => {
    const { asFragment } = render(<Recipes />);
    await waitFor(() => {
      expect(asFragment()).toMatchSnapshot();
    });
  });
});

describe("createRecipe", () => {
  it("creates a recipe correctly", async () => {
    // Arrange
    const mockRecipe = {
      /* some mock recipe */
    };
    const mockRecipeId = 1;
    (query as jest.Mock)
      .mockResolvedValueOnce({
        /* some mock response */
      })
      .mockResolvedValueOnce([{ recipe_id: mockRecipeId }])
      .mockResolvedValue([{ insertId: 1 }]); // Mock response for all other queries

    // Act
    const result = await uploadData.createRecipe(mockRecipe);

    // Assert
    expect(result).toEqual(mockRecipeId);
    expect(query).toHaveBeenCalledWith(/* the expected arguments */);
  });
});

describe("getRecipes", () => {
  it("gets recipes correctly", async () => {
    // Arrange
    const mockQueryFetch = "some query";
    const mockTagsFetch = "tag1,tag2";
    const mockRecipes = [
      {
        /* some mock recipe */
      },
    ];
    const mockTags = [{ tag_name: "tag1" }, { tag_name: "tag2" }];
    (query as jest.Mock)
      .mockResolvedValueOnce(mockRecipes)
      .mockResolvedValue(mockTags);

    // Act
    const result = await uploadData.getRecipes(mockQueryFetch, mockTagsFetch);

    // Assert
    expect(result).toEqual(
      mockRecipes.map((recipe) => ({
        ...recipe,
        recipe_tags: mockTags.map((tag) => tag.tag_name),
      }))
    );
    expect(query).toHaveBeenCalledWith(/* the expected arguments */);
  });
});

describe("getTags", () => {
  it("gets tags correctly", async () => {
    // Arrange
    const mockTags = [
      {
        /* some mock tag */
      },
    ];
    (query as jest.Mock).mockResolvedValue(mockTags);

    // Act
    const result = await uploadData.getTags();

    // Assert
    expect(result).toEqual(mockTags);
    expect(query).toHaveBeenCalledWith({
      query: "SELECT * FROM tags",
      values: [],
    });
  });
});

describe("getTags", () => {
  it("gets tags correctly", async () => {
    // Arrange
    const mockTags = [
      {
        /* some mock tag */
      },
    ];
    (query as jest.Mock).mockResolvedValue(mockTags);

    // Act
    const result = await uploadData.getTags();

    // Assert
    expect(result).toEqual(mockTags);
    expect(query).toHaveBeenCalledWith({
      query: "SELECT * FROM tags",
      values: [],
    });
  });
});

describe("makeDish", () => {
  it("makes a dish correctly", async () => {
    // Arrange
    const mockRecipeId = 1;
    const mockRecipeItems = [
      { item_id: 1, item_quantity: 2 },
      { item_id: 2, item_quantity: 3 },
    ];
    (query as jest.Mock).mockResolvedValue(mockRecipeItems);
    (uploadData.dishUsesIngredients as jest.Mock).mockResolvedValue(undefined);

    // Act
    await uploadData.makeDish(mockRecipeId);

    // Assert
    expect(query).toHaveBeenCalledWith({
      query: "SELECT * FROM recipe_items WHERE recipe_id = ?",
      values: [mockRecipeId],
    });
    for (const recipeItem of mockRecipeItems) {
      expect(uploadData.dishUsesIngredients).toHaveBeenCalledWith(
        recipeItem.item_id,
        recipeItem.item_quantity
      );
    }
  });
});

describe("dishUsesIngredients", () => {
  it("uses ingredients correctly", async () => {
    // Arrange
    const mockItemId = 1;
    const mockRequiredQuantity = 5;
    const mockInventoryItems = [
      { item_id: mockItemId, item_quantity: 2 },
      { item_id: mockItemId, item_quantity: 3 },
    ];
    (query as jest.Mock)
      .mockResolvedValueOnce(mockInventoryItems)
      .mockResolvedValue(undefined);

    // Act
    await uploadData.dishUsesIngredients(mockItemId, mockRequiredQuantity);

    // Assert
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
    // Arrange
    const mockItemId = 1;
    const mockRequiredQuantity = 5;
    const mockInventoryItems = [{ item_id: mockItemId, item_quantity: 2 }];
    (query as jest.Mock).mockResolvedValue(mockInventoryItems);

    // Act and Assert
    await expect(
      uploadData.dishUsesIngredients(mockItemId, mockRequiredQuantity)
    ).rejects.toThrow("Not enough of the item in the inventory");
  });
});

describe("getRecipeByIdFetch", () => {
  it("fetches a recipe by id correctly", async () => {
    // Arrange
    const mockRecipeId = 1;
    const mockRecipe = [
      {
        /* some mock recipe */
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

    // Act
    const result = await uploadData.getRecipeByIdFetch(mockRecipeId);

    // Assert
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
    // Arrange
    const mockRecipeId = 1;
    (query as jest.Mock).mockResolvedValue([]);

    // Act and Assert
    await expect(uploadData.getRecipeByIdFetch(mockRecipeId)).rejects.toThrow(
      "Recipe not found"
    );
  });
});

describe("getInventory", () => {
  it("fetches the inventory correctly", async () => {
    // Arrange
    const mockInventoryItems = [
      {
        /* some mock inventory item */
      },
      {
        /* some other mock inventory item */
      },
    ];
    (query as jest.Mock).mockResolvedValue(mockInventoryItems);

    // Act
    const result = await uploadData.getInventory();

    // Assert
    expect(result).toEqual(mockInventoryItems);
    expect(query).toHaveBeenCalledWith({
      query:
        "SELECT * FROM inventory INNER JOIN item_database ON inventory.item_id = item_database.item_id",
      values: [],
    });
  });

  it("throws an error when the query fails", async () => {
    // Arrange
    const mockError = new Error("query failed");
    (query as jest.Mock).mockRejectedValue(mockError);

    // Act and Assert
    await expect(uploadData.getInventory()).rejects.toThrow(mockError);
  });
});

describe("addItemToShoppingList", () => {
  it("adds an item to the shopping list correctly", async () => {
    // Arrange
    const mockItem = {
      item_id: 1,
      item_quantity: 5,
      item_quantity_type: "type1",
      item_name: "item1",
    };
    const mockItemId = [{ item_id: mockItem.item_id }];
    const mockExistingItem = [{ item_quantity: 2 }];
    (query as jest.Mock)
      .mockResolvedValueOnce(mockItemId)
      .mockResolvedValueOnce(mockExistingItem)
      .mockResolvedValue(undefined);

    // Act
    await uploadData.addItemToShoppingList(mockItem);

    // Assert
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
    // Arrange
    const mockItem = {
      item_quantity: 5,
      item_quantity_type: "type1",
      item_name: "item1",
    };
    (query as jest.Mock).mockResolvedValue([]);

    // Act and Assert
    await expect(uploadData.addItemToShoppingList(mockItem)).rejects.toThrow(
      `Item with name ${mockItem.item_name} not found in database`
    );
  });
});
