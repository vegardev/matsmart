/* eslint-disable no-unused-vars */
import { useEffect, useRef } from "react";

/**
 * SearchSuggestions component.
 * @param {Object} props - The props for the component.
 * @param {(search: string) => void} props.setSearch - The function to update the search text.
 * @param {Type[]} props.suggestions - The current list of suggestions.
 * @param {number} props.selected - The index of the selected suggestion.
 * @param {string} props.databaseTable - The database table to search in.
 * @returns The rendered SearchSuggestions component.
 */
export function SearchSuggestions<Type>({
  setSearch,
  suggestions,
  selected,
  databaseTable,
}: {
  setSearch: (search: string) => void;
  suggestions: Type[];
  selected: number;
  databaseTable: string;
}) {
  /**
   * A handler to select a given suggestion based on the click event.
   * @param {string} name - The name of the item.
   */
  const handleItemClick = (name: string) => {
    setSearch(name);
  };

  /**
   * A handler that selects a suggestion based on the key down event.
   * @param {string} name - The name of the item.
   * @returns {(event: React.KeyboardEvent) => void} The function to handle the key down event.
   */
  const handleKeyDown = (name: string) => (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      setSearch(name);
    }
  };

  // Ref to hold references to each suggestion list item
  // The following variable and useEffect hooks were suggested by GitHub Copilot
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  // Updates the itemRefs array to match the number of suggestions
  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, suggestions.length);
  }, [suggestions]);

  // Smoothly scrolls the selected suggestion into view
  useEffect(() => {
    if (selected !== null && itemRefs.current[selected]) {
      itemRefs.current[selected]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selected]);

  return (
    <>
      {suggestions.length > 0 && (
        <div className="flex flex-col rounded-b-md p-2 bg-gray-50 border-2 border-gray-300 overflow-auto max-h-60 custom-scrollbar">
          <ul>
            {suggestions.map((suggestion, index) => {
              const id = (suggestion as any)[`${databaseTable}_id`];
              const name = (suggestion as any)[`${databaseTable}_name`];
              return (
                <li
                  ref={(el) => (itemRefs.current[index] = el)}
                  key={id}
                  onClick={() => handleItemClick(name)}
                  onKeyDown={handleKeyDown(name)}
                  className={`rounded-md p-1 ${index !== suggestions.length - 1 ? "border-b-2 border-gray-200" : ""} ${index === selected ? "bg-blue-200" : "bg-gray-50"} hover:bg-blue-100`}
                  role="button"
                >
                  {name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}
