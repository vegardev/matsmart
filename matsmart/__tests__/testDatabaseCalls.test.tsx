import * as testDatabaseCalls from "@/src/app/backend/testDatabaseCalls";
import {
  Item_database,
  Recipes_no_content,
  Recipe,
  Recipe_items,
  Inventory_items,
  Tags,
  Shopping_items,
  CloseToExpire,
} from "@/src/app/backend/definitions";
import { test, describe } from "@jest/globals";

jest.mock("../src/app/backend/testDatabaseCalls");

describe("Database GET tests", () => {
  describe("Successful GET requests", () => {
    beforeAll(() => {
      for (const key of Object.keys(testDatabaseCalls)) {
        if (typeof (testDatabaseCalls as any)[key] === "function") {
          jest
            .spyOn(testDatabaseCalls, key as keyof typeof testDatabaseCalls)
            .mockImplementation(
              jest.requireActual("../src/app/backend/testDatabaseCalls")[key],
            );
        }
      }
    });

    afterAll(() => {
      for (const key of Object.keys(testDatabaseCalls)) {
        if (typeof (testDatabaseCalls as any)[key] === "function") {
          jest
            .spyOn(testDatabaseCalls, key as keyof typeof testDatabaseCalls)
            .mockRestore();
        }
      }
    });

    test("Fetch database test", async () => {
      const result: Item_database[] =
        await testDatabaseCalls.fetchDatabaseTest();
      expect(result).toEqual([
        { item_id: 1, item_name: "Egg", item_quantity_type: "stykk" },
        { item_id: 2, item_name: "Melk", item_quantity_type: "liter" },
        { item_id: 3, item_name: "Mel", item_quantity_type: "gram" },
        { item_id: 4, item_name: "Smør", item_quantity_type: "gram" },
        { item_id: 5, item_name: "Baguette", item_quantity_type: "stykk" },
      ]);
    });

    test("Fetch all recipes", async () => {
      const result: Recipes_no_content[] =
        await testDatabaseCalls.fetchRecipes();
      expect(result).toEqual([
        {
          recipe_id: 1,
          title: "Stekt egg",
          image:
            "https://aichasmat.no/wp-content/uploads/2016/10/Stekt-egg-pa-marokkansk-vis-.jpg",
        },
        {
          recipe_id: 2,
          title: "Glass med melk",
          image:
            "https://media.snl.no/media/278133/standard_compressed_Vaso_con_leche__Madrid__Espa%C3%B1a__2021_03_1_.jpg",
        },
        {
          recipe_id: 3,
          title: "Melkebolle",
          image: null,
        },
      ]);
    });

    test("Fetch single recipe", async () => {
      const recipeId = 1;
      const result: Recipe[] =
        await testDatabaseCalls.fetchSingleRecipe(recipeId);
      expect(result).toEqual([
        {
          recipe_id: 1,
          title: "Stekt egg",
          recipe_method: "Stek egget i en panne.",
          recipe_nutritions: "0",
          image:
            "https://aichasmat.no/wp-content/uploads/2016/10/Stekt-egg-pa-marokkansk-vis-.jpg",
          recipe_time: null,
        },
      ]);
    });

    test("Fetch recipe items", async () => {
      const recipeId = 1;
      const result: Recipe_items[] =
        await testDatabaseCalls.fetchRecipeItems(recipeId);
      expect(result).toEqual([
        {
          item_id: 1,
          item_name: "Egg",
          item_quantity: 1,
          item_quantity_type: "stykk",
          recipe_id: 1,
        },
        {
          item_id: 4,
          item_name: "Smør",
          item_quantity: 5,
          item_quantity_type: "gram",
          recipe_id: 1,
        },
      ]);
    });

    test("Fetch inventory items", async () => {
      const location = "kjøleskap";
      const result: Inventory_items[] =
        await testDatabaseCalls.fetchInventoryItems(location);
      expect(result).toEqual([
        {
          inventory_id: 1,
          item_id: 1,
          item_name: "Egg",
          item_quantity: 6,
          item_quantity_type: "stykk",
          location: "kjøleskap",
          expiration_date: "2024-04-17",
        },
        {
          inventory_id: 2,
          item_id: 2,
          item_name: "Melk",
          item_quantity: 2,
          item_quantity_type: "liter",
          location: "kjøleskap",
          expiration_date: "2024-03-10",
        },
        {
          inventory_id: 4,
          item_id: 1,
          item_name: "Egg",
          item_quantity: 2,
          item_quantity_type: "stykk",
          location: "kjøleskap",
          expiration_date: "2024-02-29",
        },
      ]);
    });

    test("Fetch recipe suggestions", async () => {
      const result: Recipes_no_content[] =
        await testDatabaseCalls.fetchRecipeSuggestions("M");
      expect(result).toEqual([
        {
          recipe_id: 2,
          title: "Glass med melk",
          image:
            "https://media.snl.no/media/278133/standard_compressed_Vaso_con_leche__Madrid__Espa%C3%B1a__2021_03_1_.jpg",
        },
        {
          recipe_id: 3,
          title: "Melkebolle",
          image: null,
        },
      ]);
    });

    test("Fetch grocery item search results", async () => {
      const result: Item_database[] =
        await testDatabaseCalls.fetchGrocerySuggestions("Ba");
      expect(result).toEqual([
        {
          item_id: 5,
          item_name: "Baguette",
          item_quantity_type: "stykk",
        },
      ]);
    });

    test("Fetch tags search results", async () => {
      const result: Tags[] = await testDatabaseCalls.sortByTag("E");
      expect(result).toEqual([
        {
          tag_id: 2,
          tag_name: "Enkelt",
        },
        {
          tag_id: 3,
          tag_name: "Vegetar",
        },
      ]);
    });

    test("Fetch shopping list items", async () => {
      const result: Shopping_items[] =
        await testDatabaseCalls.fetchShoppingList();
      expect(result).toEqual([
        {
          item_id: 2,
          item_name: "Melk",
          item_quantity: 2.5,
          item_quantity_type: "liter",
        },
        {
          item_id: 3,
          item_name: "Mel",
          item_quantity: 1050,
          item_quantity_type: "gram",
        },
      ]);
    });

    test("Fetch registered grocery items", async () => {
      const result: Item_database[] =
        await testDatabaseCalls.fetchGroceryItems();
      expect(result).toEqual([
        {
          item_id: 1,
          item_name: "Egg",
          item_quantity_type: "stykk",
        },
        {
          item_id: 2,
          item_name: "Melk",
          item_quantity_type: "liter",
        },
        {
          item_id: 3,
          item_name: "Mel",
          item_quantity_type: "gram",
        },
        {
          item_id: 4,
          item_name: "Smør",
          item_quantity_type: "gram",
        },
        {
          item_id: 5,
          item_name: "Baguette",
          item_quantity_type: "stykk",
        },
      ]);
    });

    test("Fetch recommmended recipes based on ingredients", async () => {
      const result: Recipe[] =
        await testDatabaseCalls.fetchRecommendedRecipes();
      expect(result).toEqual([
        {
          recipe_id: 2,
          title: "Glass med melk",
          recipe_method: "Ta melk i glass.",
          recipe_nutritions: "0",
          image:
            "https://media.snl.no/media/278133/standard_compressed_Vaso_con_leche__Madrid__Espa%C3%B1a__2021_03_1_.jpg",
          recipe_time: null,
        },
        {
          recipe_id: 3,
          title: "Melkebolle",
          recipe_method: "Putt melk i bolle lol.",
          recipe_nutritions: "6969",
          image: null,
          recipe_time: null,
        },
      ]);
    });

    test("Fetch grocery items close to expiring", async () => {
      const result: CloseToExpire[] =
        await testDatabaseCalls.fetchCloseToExpireItems();
      expect(result).toEqual([
        {
          inventory_id: 4,
          item_id: 1,
          item_name: "Egg",
          item_quantity: 2,
          item_quantity_type: "stykk",
          location: "kjøleskap",
          expiration_date: "2024-02-29",
        },
        {
          inventory_id: 3,
          item_id: 3,
          item_name: "Mel",
          item_quantity: 500,
          item_quantity_type: "gram",
          location: "skuff",
          expiration_date: "2024-03-09",
        },
        {
          inventory_id: 2,
          item_id: 2,
          item_name: "Melk",
          item_quantity: 2,
          item_quantity_type: "liter",
          location: "kjøleskap",
          expiration_date: "2024-03-10",
        },
        {
          inventory_id: 5,
          item_id: 5,
          item_name: "Baguette",
          item_quantity: 4,
          item_quantity_type: "stykk",
          location: "fryser",
          expiration_date: "2024-04-14",
        },
      ]);
    });

    test("Fetch recently added grocery items", async () => {
      const result: Inventory_items[] =
        await testDatabaseCalls.fetchRecentlyAddedItems();
      expect(result).toEqual([
        {
          inventory_id: 5,
          item_id: 5,
          item_quantity: 4,
          item_quantity_type: "stykk",
          location: "fryser",
          expiration_date: "2024-04-14",
          item_name: "Baguette",
        },
        {
          inventory_id: 4,
          item_id: 1,
          item_quantity: 2,
          item_quantity_type: "stykk",
          location: "kjøleskap",
          expiration_date: "2024-02-29",
          item_name: "Egg",
        },
        {
          inventory_id: 3,
          item_id: 3,
          item_quantity: 500,
          item_quantity_type: "gram",
          location: "skuff",
          expiration_date: "2024-03-09",
          item_name: "Mel",
        },
        {
          inventory_id: 2,
          item_id: 2,
          item_quantity: 2,
          item_quantity_type: "liter",
          location: "kjøleskap",
          expiration_date: "2024-03-10",
          item_name: "Melk",
        },
        {
          inventory_id: 1,
          item_id: 1,
          item_quantity: 6,
          item_quantity_type: "stykk",
          location: "kjøleskap",
          expiration_date: "2024-04-17",
          item_name: "Egg",
        },
      ]);
    });
  });

  describe("Failed GET requests", () => {
    test("Fetch database test", async () => {
      const error = new Error("Failed to fetch database test");
      jest
        .spyOn(testDatabaseCalls, "fetchDatabaseTest")
        .mockImplementationOnce(() => {
          return Promise.reject(error);
        });

      await expect(testDatabaseCalls.fetchDatabaseTest()).rejects.toEqual(
        error,
      );
    });

    test("Fetch all recipes", async () => {
      const error = new Error("Failed to fetch all recipes");
      jest
        .spyOn(testDatabaseCalls, "fetchRecipes")
        .mockImplementationOnce(() => {
          return Promise.reject(error);
        });

      await expect(testDatabaseCalls.fetchRecipes()).rejects.toEqual(error);
    });

    test("Fetch single recipes", async () => {
      const error = new Error("Failed to recipe");
      jest
        .spyOn(testDatabaseCalls, "fetchSingleRecipe")
        .mockImplementationOnce(() => {
          return Promise.reject(error);
        });

      await expect(testDatabaseCalls.fetchSingleRecipe(10)).rejects.toEqual(
        error,
      );
    });

    test("Fetch recipe items", async () => {
      const error = new Error("Failed to fetch recipe items");
      jest
        .spyOn(testDatabaseCalls, "fetchRecipeItems")
        .mockImplementationOnce(() => {
          return Promise.reject(error);
        });

      await expect(testDatabaseCalls.fetchRecipeItems(15)).rejects.toEqual(
        error,
      );
    });

    test("Fetch inventory items", async () => {
      const error = new Error("Failed to fetch inventory items");
      jest
        .spyOn(testDatabaseCalls, "fetchInventoryItems")
        .mockImplementationOnce(() => {
          return Promise.reject(error);
        });

      await expect(testDatabaseCalls.fetchInventoryItems("")).rejects.toEqual(
        error,
      );
    });

    test("Fetch recipe suggestions", async () => {
      const error = new Error("Failed to fetch recipe suggestions");
      jest
        .spyOn(testDatabaseCalls, "fetchRecipeSuggestions")
        .mockImplementationOnce(() => {
          return Promise.reject(error);
        });

      await expect(
        testDatabaseCalls.fetchRecipeSuggestions(""),
      ).rejects.toEqual(error);
    });

    test("Fetch grocery item search results", async () => {
      const error = new Error("Failed to fetch grocery item search results");
      jest
        .spyOn(testDatabaseCalls, "fetchGrocerySuggestions")
        .mockImplementationOnce(() => {
          return Promise.reject(error);
        });

      await expect(
        testDatabaseCalls.fetchGrocerySuggestions(""),
      ).rejects.toEqual(error);
    });

    test("Fetch tags search results", async () => {
      const error = new Error("Failed to fetch tags search results");
      jest.spyOn(testDatabaseCalls, "sortByTag").mockImplementationOnce(() => {
        return Promise.reject(error);
      });

      await expect(testDatabaseCalls.sortByTag("")).rejects.toEqual(error);
    });
  });
});

describe("Database POST tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Submit new inventory item", async () => {
    (testDatabaseCalls.submitInventoryItem as jest.Mock).mockResolvedValue({
      data: "200",
    });

    const item_id = 5;
    const item_quantity = 100;
    const item_quantity_type = "stykk";
    const location = "fryser";
    const expiration_date = new Date("2027-05-17");
    const response = await testDatabaseCalls.submitInventoryItem(
      item_id,
      item_quantity,
      item_quantity_type,
      location,
      expiration_date,
    );
    expect(testDatabaseCalls.submitInventoryItem).toHaveBeenCalledTimes(1);
    expect(response).toEqual({ data: "200" });
  });

  test("Submit new shopping list item", async () => {
    (testDatabaseCalls.submitShoppingListItem as jest.Mock).mockResolvedValue({
      data: "200",
    });

    const item_id = 2;
    const item_quantity = 0.5;
    const item_quantity_type = "liter";
    const response = await testDatabaseCalls.submitShoppingListItem(
      item_id,
      item_quantity,
      item_quantity_type,
    );

    expect(testDatabaseCalls.submitShoppingListItem).toHaveBeenCalledTimes(1);
    expect(response).toEqual({ data: "200" });
  });
  describe("Failed POST requests", () => {
    test("Failed to submit shopping list item", async () => {
      const error = new Error("Failed to submit shopping list item");
      jest
        .spyOn(testDatabaseCalls, "submitShoppingListItem")
        .mockImplementationOnce(() => {
          return Promise.reject(error);
        });

      const item_id = 999;
      const item_quantity = 0;
      const item_quantity_type = "";

      await expect(
        testDatabaseCalls.submitShoppingListItem(
          item_id,
          item_quantity,
          item_quantity_type,
        ),
      ).rejects.toEqual(error);
    });

    test("Failed to submit inventory item", async () => {
      const error = new Error("Failed to submit inventory item");
      jest
        .spyOn(testDatabaseCalls, "submitInventoryItem")
        .mockImplementationOnce(() => {
          return Promise.reject(error);
        });

      const item_id = 999;
      const item_quantity = 100;
      const item_quantity_type = "stykk";
      const location = "fryser";
      const expiration_date = new Date("2027-05-17");

      await expect(
        testDatabaseCalls.submitInventoryItem(
          item_id,
          item_quantity,
          item_quantity_type,
          location,
          expiration_date,
        ),
      ).rejects.toEqual(error);
    });
  });
});

describe("Database DELETE tests", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("Delete inventory item", async () => {
    (testDatabaseCalls.deleteInventoryItem as jest.Mock).mockResolvedValue({
      data: "200",
    });
    const inventory_id = 3;
    const response = await testDatabaseCalls.deleteInventoryItem(inventory_id);
    expect(testDatabaseCalls.deleteInventoryItem).toHaveBeenCalledTimes(1);
    expect(response).toEqual({ data: "200" });
  });
  test("Delete shopping list item", async () => {
    (testDatabaseCalls.deleteShoppingListItem as jest.Mock).mockResolvedValue({
      data: "200",
    });
    const item_id = 3;
    const response = await testDatabaseCalls.deleteShoppingListItem(item_id);
    expect(testDatabaseCalls.deleteShoppingListItem).toHaveBeenCalledTimes(1);
    expect(response).toEqual({ data: "200" });
  });

  describe("Failed DELETE requests", () => {
    test("Failed to delete inventory item", async () => {
      const error = new Error("Failed to submit inventory item");
      jest
        .spyOn(testDatabaseCalls, "deleteInventoryItem")
        .mockImplementationOnce(() => {
          return Promise.reject(error);
        });

      const item_id = 999;

      await expect(
        testDatabaseCalls.deleteInventoryItem(item_id),
      ).rejects.toEqual(error);
    });

    test("Failed to delete shopping list item", async () => {
      const error = new Error("Failed to submit inventory item");
      jest
        .spyOn(testDatabaseCalls, "deleteShoppingListItem")
        .mockImplementationOnce(() => {
          return Promise.reject(error);
        });

      const item_id = 999;

      await expect(
        testDatabaseCalls.deleteShoppingListItem(item_id),
      ).rejects.toEqual(error);
    });
  });
});

describe("Database PUT tests", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("Update shopping item quantity", async () => {
    (testDatabaseCalls.updateShoppingListItem as jest.Mock).mockResolvedValue({
      data: "200",
    });
    const item_id = 2;
    const item_quantity = 3;
    const response = await testDatabaseCalls.updateShoppingListItem(
      item_id,
      item_quantity,
    );
    expect(testDatabaseCalls.updateShoppingListItem).toHaveBeenCalledTimes(1);
    expect(response).toEqual({ data: "200" });
  });

  describe("Failed PUT requests", () => {
    test("Failed to update shopping item quantity", async () => {
      const error = new Error("Failed to update shopping list item");
      jest
        .spyOn(testDatabaseCalls, "updateShoppingListItem")
        .mockImplementationOnce(() => {
          return Promise.reject(error);
        });

      const item_id = 999;
      const quantity = 0;

      await expect(
        testDatabaseCalls.updateShoppingListItem(item_id, quantity),
      ).rejects.toEqual(error);
    });
  });
});
