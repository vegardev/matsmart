import { useEffect, useRef } from "react";

/* eslint-disable no-unused-vars */
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
  const handleItemClick = (name: string) => {
    console.log("Clicked on: ", name);
    setSearch(name);
  };

  const handleKeyDown = (name: string) => (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      setSearch(name);
    }
  };

  // Use this to debug the suggestions
  // You want an array of objects with the keys ..._id and ..._name
  console.log(suggestions);

  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, suggestions.length);
  }, [suggestions]);

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
