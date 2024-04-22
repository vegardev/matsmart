"use client";
import { SearchBar } from "@/src/app/ui/components/SearchBar";
import GroceryTable from "@/src/app/ui/shoppinglist/GroceryTable";
import { Item_database, Shopping_items } from "@/src/app/backend/definitions";
import { useState, useEffect } from "react";
import QuantityDropdown from "@/src/app/ui/shoppinglist/QuantityDropdown";

export default function ShoppingList() {
  const [shoppingItems, setShoppingItems] = useState<Shopping_items[]>([]);
  const [groceryItems, setGroceryItems] = useState<Item_database[]>([]);
  // search er til enhver tid input i søkefeltet, og er en query til databasen
  // search er også navnet på item som skal legges til i shopping list
  const [search, setSearch] = useState("");
  const [quantity, setQuantity] = useState<number>(1);
  const [quantityType, setQuantityType] = useState<string>("stk.");
  const [refreshShoppingList, setRefreshShoppingList] = useState<boolean>(true);

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

  const handleExpiryDateChange = (index: number, value: string | Date) => {
    setExpiryDates((prevDates) => {
      const newDates = [...prevDates];
      newDates[index] = value ? new Date(value) : null;
      return newDates;
    });
  };

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

  const handleLocationChange = (index: number, newLocation: string) => {
    setLocations((prevLocations) => {
      const newLocations = [...prevLocations];
      newLocations[index] = newLocation;
      return newLocations;
    });
  };

  const handleDelete = (index: number) => {
    setShoppingItems((prevItems) => prevItems.filter((_, i) => i !== index));
    setCheckedStates((prevStates) => prevStates.filter((_, i) => i !== index));
  };

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
      .then((response) => response.json()) // Extract JSON data from the response
      .then((data) => {
        setShoppingItems(data);
        setCheckedStates(new Array(data.length).fill(false));
        setRefreshShoppingList(false);
      }); // Pass the data to setItems
  }, [refreshShoppingList]);

  useEffect(() => {
    fetch("/api/items")
      .then((response) => response.json())
      .then((data) => setGroceryItems(data));
  }, []);

  useEffect(() => {
    setCheckedStates(new Array(shoppingItems.length).fill(false));
  }, [shoppingItems]);

  // Update expiryDates array length when shoppingItems changes
  useEffect(() => {
    setExpiryDates(new Array(shoppingItems.length).fill(null));
  }, [shoppingItems]);

  // Legg til item i shopping list
  const handleAddToShoppingList = async () => {
    console.log("Clicked add to shopping list...");
    const item = groceryItems.find((item) => item.item_name === search);
    let itemId = item?.item_id;

    console.log("Adding item... ", item);

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

      console.log("Response: ", response);

      if (response.ok) {
        const newItem = await response.json();
        itemId = newItem.item_id;
        console.log("New item: ", newItem);
        console.log("New item id: ", itemId);
      } else {
        throw new Error("Server response wasn't OK");
      }
    }

    const body = JSON.stringify({
      item_id: itemId,
      item_quantity: quantity,
      item_quantity_type: quantityType,
    });

    console.log("Body: ", body);

    await fetch("/api/shoppinglist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    })
      .then((response) => {
        console.log("Response: ", response);
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Server response wasn't OK");
        }
      })
      .then((newItem) => {
        console.log(newItem);

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

  // Send kjøpte items til inventory
  const handleAddBoughtItemsToInventory = async () => {
    console.log("Clicked add bought items to inventory...");
    const boughtItems = shoppingItems.filter(
      (item, index) => checkedStates[index],
    );
    console.log("Bought items: ", boughtItems);

    for (const item of boughtItems) {
      const itemIndex = shoppingItems.findIndex(
        (shoppingItem) => shoppingItem.item_id === item.item_id,
      );
      const itemLocation = locations[itemIndex];
      let itemExpiryDate = expiryDates[itemIndex];
      if (!itemLocation || itemLocation === "") {
        alert("Please select location for all bought items");
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
          console.log("Response: ", response);
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Server response wasn't OK");
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
              console.log("Response: ", response);
              if (response.ok) {
                return response.json();
              } else {
                throw new Error("Server response wasn't OK");
              }
            })
            .then(() => {
              console.log("Deleted item from shopping list");
            })
            .catch((error) => {
              alert("Error deleting item from shopping list:" + error);
            });
        })
        .catch((error) => {
          alert("Error adding item to inventory:" + error);
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
