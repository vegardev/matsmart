/* eslint-disable no-unused-vars */
"use client";
import React, { useState, useEffect } from "react";
import { SearchSuggestions } from "@/src/app/ui/components/SearchSuggestions";
import clsx from "clsx";

/**
 * SearchBar component.
 * @param {Object} props - The props for the component.
 * @param {string} props.databaseTable - The database table to search in.
 * @param {string} props.placeholder - The placeholder text for the search bar.
 * @param {string} props.search - The current search text.
 * @param {(search: string) => void} props.setSearch - The state hook to update the search text.
 * @param {Type[]} props.suggestions - The current list of suggestions.
 * @returns The rendered SearchBar component.
 */
export function SearchBar<Type>({
  databaseTable,
  placeholder,
  search,
  setSearch,
  suggestions,
}: {
  databaseTable: string;
  placeholder: string;
  search: string;
  setSearch: (search: string) => void;
  suggestions: Type[];
}) {
  // State hooks for populating the search suggestions, the selected suggestion, and whether a suggestion is selected
  const [items, setItems] = useState<Type[]>([]);
  const [selected, setSelected] = useState(0);
  const [isSuggestionSelected, setIsSuggestionSelected] = useState(false);

  const isActive = search !== "";

  useEffect(() => {
    // Debounce to reduce database calls until the user is done searching
    const delayDebounceFn = setTimeout(() => {
      if (isActive) {
        fetch(`/api/autocomplete/${databaseTable}/${search}`)
          .then((response) => response.json())
          .then((data) => setItems(data))
          .catch((error) =>
            console.error("Error fetching suggestion data:", error),
          );
      }
    }, 250);
    return () => clearTimeout(delayDebounceFn);
  }, [search, isActive, databaseTable]);

  /**
   * A handler to change the selected suggestion based on the key down event.
   * Pressing 'tab' will cycle through the suggestions.
   * Pressing 'enter' will select the current suggestion.
   *
   * @param {React.KeyboardEvent} event - The key down event.
   */
  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab" && items.length > 0) {
      setSelected((selected + 1) % items.length);
      event.preventDefault();
    } else if (event.key === "Enter") {
      if (selected !== null) {
        const selectedName = (items[selected] as any)[`${databaseTable}_name`];
        setSearch(selectedName);
        setItems([]);
        setIsSuggestionSelected(true);
      } else {
        setSearch(search);
      }
    }
  }

  useEffect(() => {
    setIsSuggestionSelected(false);
  }, [search]);

  return (
    <div
      className={clsx("relative flex flex-col", {
        "ml-auto": databaseTable == "tag",
      })}
      onKeyDown={handleKeyDown}
    >
      <div className="flex flex-col flex-1 flex-shrink-0">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <input
          id="search"
          autoComplete="off"
          onBlur={() => {
            setTimeout(() => setIsSuggestionSelected(true), 200);
          }}
          className={`peer block w-full border border-gray-200 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500 ${isActive && !isSuggestionSelected ? "rounded-t-md" : "rounded-md"}`}
          placeholder={placeholder}
          value={search}
          onChange={(input) => {
            setSearch(input.target.value);
          }}
        />
      </div>
      {search && items.length !== 1 && !isSuggestionSelected && (
        <div className="absolute w-full mt-10">
          <SearchSuggestions
            setSearch={setSearch}
            suggestions={items}
            selected={selected}
            databaseTable={databaseTable}
          />
        </div>
      )}
    </div>
  );
}
