/* eslint-disable no-unused-vars */
"use client";
import React, { useState, useEffect } from "react";
import { SearchSuggestions } from "@/src/app/ui/shoppinglist/SearchSuggestions";
import { Shopping_items } from "../../backend/definitions";

export function SearchBar({
  searchTerm,
  setSearchTerm,
}: {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}) {
  const [search, setSearch] = useState(searchTerm);
  const [groceries, setGroceries] = useState<Shopping_items[]>([]);
  const [selected, setSelected] = useState(0);
  const [isSuggestionSelected, setIsSuggestionSelected] = useState(false);

  const isActive = search !== "";

  useEffect(() => {
    // Debounce for å redusere database kall før brukeren er ferdig med å søke
    const delayDebounceFn = setTimeout(() => {
      if (isActive) {
        fetch(`/api/autocomplete/${search}`)
          .then((response) => response.json())
          .then((data) => setGroceries(data))
          .catch((error) =>
            console.error("Error fetching suggestion data:", error),
          );
      }
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [search, isActive]);

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab" && groceries.length > 0) {
      setSelected((selected + 1) % groceries.length);
      event.preventDefault();
    } else if (event.key === "Enter") {
      if (selected !== undefined && selected < groceries.length) {
        setSearch(groceries[selected].item_name);
        setSearchTerm(groceries[selected].item_name);
        setGroceries([]);
      } else {
        setSearchTerm(search);
      }
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
          placeholder="Search for groceries"
          value={search}
          onChange={(input) => {
            setSearch(input.target.value);
            setSearchTerm(input.target.value);
          }}
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
