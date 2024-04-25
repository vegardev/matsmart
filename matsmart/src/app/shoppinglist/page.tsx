"use client";
import { SearchBar } from "@/src/app/ui/components/SearchBar";
import GroceryTable from "@/src/app/ui/shoppinglist/GroceryTable";
import { Item_database, Shopping_items } from "@/src/app/backend/definitions";
import { useState, useEffect } from "react";
import QuantityDropdown from "@/src/app/ui/shoppinglist/QuantityDropdown";

/**
 * ShoppingList component.
 *
 * @returns {JSX.Element} The rendered ShoppingList component.
 */

export default function ShoppingList() {
  // State hooks to keep track of items fetched from the database
  const [shoppingItems, setShoppingItems] = useState<Shopping_items[]>([]);
  const [groceryItems, setGroceryItems] = useState<Item_database[]>([]);

  // State hooks to keep track of search input, quantity, quantity type,
  // and whether the shopping list should be refreshed
  const [search, setSearch] = useState("");
  const [quantity, setQuantity] = useState<number>(1);
  const [quantityType, setQuantityType] = useState<string>("stk.");
  const [refreshShoppingList, setRefreshShoppingList] = useState<boolean>(true);

  // State hooks to keep track of checked states, locations, and expiry dates for items
  const [checkedStates, setCheckedStates] = useState<boolean[]>(
    new Array(shoppingItems.length).fill(false),
  );
  const [locations, setLocations] = useState<string[]>(
    new Array(shoppingItems.length).fill(""),
  );
  const [expiryDates, setExpiryDates] = useState<(Date | null)[]>(
    new Array(shoppingItems.length).fill(null),
  );

  const anyCheckboxChecked = checkedStates.some((checked) => checked);

  /**
   * A handler that changes the expiry date of one or more items.
   *
   * A non-empty string or Date object is converted to a Date object.
   * An empty string sets the expiry date to null, signifying no expiry date.
   *
   * @param {number} index - The index of the item.
   * @param {string | Date} value - The new expiry date.
   */
  const handleExpiryDateChange = (index: number, value: string | Date) => {
    setExpiryDates((prevDates) => {
      const newDates = [...prevDates];
      newDates[index] = value ? new Date(value) : null;
      return newDates;
    });
  };

  /**
   * A handler that changes the quantity of one or more items.
   *
   * If the new quantity is -1, the item at the index is removed from the shopping list.
   * @param {number} index - The index of the item.
   * @param {number} newQuantity - The new quantity.
   */
  const handleQuantityChange = (index: number, newQuantity: number) => {
    if (newQuantity === -1) {
      const newShoppingItems = shoppingItems.filter((_, i) => i !== index);
      setShoppingItems(newShoppingItems);
    } else {
      const newShoppingItems = [...shoppingItems];
      newShoppingItems[index].item_quantity = newQuantity;
      setShoppingItems(newShoppingItems);
    }
  };

  /**
   * A handler that changes the location of one or more items.
   *
   * @param {number} index - The index of the item.
   * @param {string} newLocation - The new location.
   */
  const handleLocationChange = (index: number, newLocation: string) => {
    setLocations((prevLocations) => {
      const newLocations = [...prevLocations];
      newLocations[index] = newLocation;
      return newLocations;
    });
  };

  /**
   * A handler that deletes one or more checked items.
   *
   * @param {number} index - The index of the item.
   */
  const handleDelete = (index: number) => {
    setShoppingItems((prevItems) => prevItems.filter((_, i) => i !== index));
    setCheckedStates((prevStates) => prevStates.filter((_, i) => i !== index));
  };

  /**
   * A handler that changes the state of checkboxes.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event - The change event.
   * @param {number} index - The index of the checkbox.
   */
  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const newCheckedStates = [...checkedStates];
    newCheckedStates[index] = event.target.checked;
    setCheckedStates(newCheckedStates);
  };

  useEffect(() => {
    if (!refreshShoppingList) return;

    fetch("/api/shoppinglist")
      .then((response) => response.json())
      .then((data) => {
        setShoppingItems(data);
        setCheckedStates(new Array(data.length).fill(false));
        setRefreshShoppingList(false);
      }); // Pass the data to setItems
  }, [refreshShoppingList]);

  // Fetches grocery items when the page renders
  useEffect(() => {
    fetch("/api/items")
      .then((response) => response.json())
      .then((data) => setGroceryItems(data));
  }, []);

  useEffect(() => {
    setCheckedStates(new Array(shoppingItems.length).fill(false));
  }, [shoppingItems]);

  // Updates expiryDates array length when shoppingItems changes, and sets all values to null
  useEffect(() => {
    setExpiryDates(new Array(shoppingItems.length).fill(null));
  }, [shoppingItems]);

  /**
   * A handler that handles the addition of an item to the shopping list.
   * If the item does not exist in the 'item_database' table, it first registers the item,
   * and then added to the shopping list.
   */
  const handleAddToShoppingList = async () => {
    console.log("Clicked add to shopping list...");
    const item = groceryItems.find((item) => item.item_name === search);
    let itemId = item?.item_id;

    if (!item) {
      const response = await fetch("/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          item_name: search,
          item_quantity_type: quantityType,
        }),
      });

      if (response.ok) {
        const newItem = await response.json();
        itemId = newItem.item_id;
        setGroceryItems((prevItems) => [...prevItems, newItem]);
      } else {
        const error = await response.json();
        alert("Item already exists: " + error.message);
        throw new Error("Server was unable to register the new item.");
      }
    }

    const body = JSON.stringify({
      item_id: itemId,
      item_quantity: quantity,
      item_quantity_type: quantityType,
    });

    await fetch("/api/shoppinglist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(
            "Server was unable to add the item to the shopping list.",
          );
        }
      })
      .then((newItem) => {
        newItem.item_name = search;
        newItem.item_quantity_type = quantityType;
        newItem.item_quantity = quantity;
        setShoppingItems((prevItems) => [...prevItems, newItem]);
        setCheckedStates((prevStates) => [...prevStates, false]);
        alert(
          "Added " +
            newItem.item_quantity +
            " " +
            newItem.item_quantity_type +
            " " +
            newItem.item_name +
            " to shopping list!",
        );
        setRefreshShoppingList(true);
      })
      .catch((error) => {
        alert("Update quantity rather than adding same item! \n" + error);
      });
  };

  /**
   * A handler that sends one or more items marked 'Bought?' to their respective inventory locations.
   */
  const handleAddBoughtItemsToInventory = async () => {
    console.log("Clicked add bought items to inventory...");
    const boughtItems = shoppingItems.filter(
      (item, index) => checkedStates[index],
    );

    for (const item of boughtItems) {
      const itemIndex = shoppingItems.findIndex(
        (shoppingItem) => shoppingItem.item_id === item.item_id,
      );
      const itemLocation = locations[itemIndex];
      let itemExpiryDate = expiryDates[itemIndex];
      if (!itemLocation || itemLocation === "") {
        alert("Please select a location for all bought items!");
        return;
      }
      await fetch("/api/inventory/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          item_id: item.item_id,
          item_quantity: item.item_quantity,
          item_quantity_type: item.item_quantity_type,
          item_location: itemLocation,
          expiration_date: itemExpiryDate
            ? itemExpiryDate.toISOString().split("T")[0]
            : null,
        }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error(
              "Server was unable to add the item to the inventory.",
            );
          }
        })
        .then(() => {
          fetch(`/api/shoppinglist/${item.item_id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              item_id: item.item_id,
            }),
          })
            .then((response) => {
              if (response.ok) {
                return response.json();
              } else {
                throw new Error(
                  "Server was unable to remove the item from the shopping list.",
                );
              }
            })
            .then(() => {
              console.log("Deleted item from shopping list");
            })
            .catch((error) => {
              alert("Error deleting item from shopping list: " + error);
            });
        })
        .catch((error) => {
          alert("Error adding item to inventory: " + error);
        });
    }

    setShoppingItems((prevItems) =>
      prevItems.filter((_, index) => !checkedStates[index]),
    );
    setCheckedStates((prevStates) => prevStates.filter((state) => !state));
  };

  return (
    <div className="flex flex-col">
      <h1 className={`mb-4 text-xl md:text-2xl`}>Shopping list</h1>
      <div className="mt-4 flex flex-row items-baseline justify-items-center gap-2 md:mt-8 max-w-3xl">
        <SearchBar<Item_database>
          search={search}
          setSearch={setSearch}
          placeholder="Search for grocery items..."
          databaseTable="item"
          suggestions={groceryItems}
        />
        <QuantityDropdown
          quantity={quantity}
          setQuantity={setQuantity}
          quantityType={quantityType}
          setQuantityType={setQuantityType}
        />
        <button
          data-testid="add-to-shopping-list-button"
          className="rounded-md border border-gray-200 bg-gray-50 p-2 text-sm outline-2 text-center"
          onClick={handleAddToShoppingList}
        >
          Add to shopping list
        </button>
        {checkedStates.some((checked) => checked) && (
          <button
            data-testid="add-to-inventory-button"
            className="rounded-md border border-gray-200 bg-green-200 p-2 text-sm outline-2 text-center"
            onClick={handleAddBoughtItemsToInventory}
          >
            Add to inventory
          </button>
        )}
      </div>
      <GroceryTable
        data={shoppingItems}
        onQuantityChange={handleQuantityChange}
        onDelete={handleDelete}
        checkedStates={checkedStates}
        onCheckboxChange={handleCheckboxChange}
        onLocationChange={handleLocationChange}
        locations={locations}
        setLocations={setLocations}
        expiryDates={expiryDates}
        onExpiryDateChange={handleExpiryDateChange}
        anyCheckboxChecked={anyCheckboxChecked}
        className="mt-4"
      />
    </div>
  );
}
