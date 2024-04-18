/* eslint-disable no-unused-vars */
"use client";
import React, { useState, useEffect } from "react";
import { SearchSuggestions } from "@/src/app/ui/components/SearchSuggestions";

export function SearchBar<Type>({
  searchTerm,
  setSearchTerm,
  databaseTable,
  placeholder,
}: {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  databaseTable: string;
  placeholder: string;
  suggestions: Type[];
}) {
  // search er variabelen som brukes til å søke databasen
  // searchTerm "passes" inn i search for å kunne endre søkefeltet fra parent-komponenten
  const [search, setSearch] = useState(searchTerm);
  const [items, setItems] = useState<Type[]>([]);
  const [selected, setSelected] = useState(0);
  const [isSuggestionSelected, setIsSuggestionSelected] = useState(false);

  const isActive = search !== "";

  useEffect(() => {
    // Debounce for å redusere database kall før brukeren er ferdig med å søke
    const delayDebounceFn = setTimeout(() => {
      if (isActive) {
        fetch(`/api/autocomplete/${databaseTable}/${search}`)
          .then((response) => response.json())
          .then((data) => setItems(data))
          .catch((error) =>
            console.error("Error fetching suggestion data:", error),
          );
      }
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [search, isActive, databaseTable]);

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab" && items.length > 0) {
      setSelected((selected + 1) % items.length);
      event.preventDefault();
    } else if (event.key === "Enter") {
      const selectedName = (items[selected] as any)[`${databaseTable}_name`];
      if (selected !== undefined && selected < items.length && selectedName) {
        setSearch(selectedName);
        setSearchTerm(selectedName);
        setItems([]);
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
          placeholder={placeholder}
          value={search}
          onChange={(input) => {
            setSearch(input.target.value);
            setSearchTerm(input.target.value);
          }}
        />
      </div>
      {search && items.length !== 1 && !isSuggestionSelected && (
        <SearchSuggestions
          setSearch={setSearch}
          suggestions={items}
          selected={selected}
          databaseTable={databaseTable}
        />
      )}
    </div>
  );
}
