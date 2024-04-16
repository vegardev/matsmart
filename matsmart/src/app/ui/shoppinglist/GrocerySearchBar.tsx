"use client";
import React, { useState, useEffect } from "react";
import { SearchSuggestions } from "@/src/app/ui/shoppinglist/SearchSuggestions";

export function SearchBar({
  searchTerm,
  setSearchTerm,
  setSelectedItem,
}: {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  setSelectedItem: (item: any) => void;
}) {
  const [search, setSearch] = useState(searchTerm);
  const [groceries, setGroceries] = useState([]);
  const [selected, setSelected] = useState(0);
  const [isSuggestionSelected, setIsSuggestionSelected] = useState(false);

  const isActive = search !== "";

  useEffect(() => {
    if (isActive) {
      fetch(`/api/autocomplete/${search}`)
        .then((response) => response.json())
        .then((data) => setGroceries(data))
        .catch((error) =>
          console.error("Error fetching suggestion data:", error)
        );
    }
  }, [search, isActive]);

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab" && groceries.length !== 1) {
      setSelected((selected + 1) % groceries.length);
      event.preventDefault();
    } else if (event.key === "Enter") {
      setSearch(groceries[selected].item_name);
      setSearchTerm(groceries[selected].item_name);
      setSelectedItem(groceries[selected].item_name);
      setIsSuggestionSelected(true);
    }
  }

  useEffect(() => {
    setIsSuggestionSelected(false);
  }, [search]);

  return (
    <div className="flex flex-col" onKeyDown={handleKeyDown}>
      <div className="flex flex-col flex-1 flex-shrink-0">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <input
          id="search"
          className={`peer block w-full border border-gray-200 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500 ${isActive ? "rounded-t-md" : "rounded-md"}`}
          placeholder={searchTerm}
          value={search}
          onChange={(input) => setSearch(input.target.value)}
        />
      </div>
      {search && groceries.length !== 1 && !isSuggestionSelected && (
        <SearchSuggestions
          setSearch={setSearch}
          suggestions={groceries}
          selected={selected}
        />
      )}
    </div>
  );
}
