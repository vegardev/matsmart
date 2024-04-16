export function SearchSuggestions({
  setSearch,
  suggestions,
  selected,
}: {
  // eslint-disable-next-line no-unused-vars
  setSearch: (search: string) => void;
  suggestions: {
    item_id: number;
    item_name: string;
    item_quantity_type: string;
  }[];
  selected: number;
}) {
  const handleItemClick = (item_name: string) => {
    setSearch(item_name);
  };

  const handleKeyDown = (item_name: string) => (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      setSearch(item_name);
    }
  };

  return (
    <>
      {suggestions.length > 0 && (
        <div className="flex flex-col rounded-b-md p-2 bg-gray-50">
          <ul>
            {suggestions.map((suggestion, index) => (
              <li
                key={suggestion.item_id}
                onClick={() => handleItemClick(suggestion.item_name)}
                onKeyDown={handleKeyDown(suggestion.item_name)}
                className={`${index === selected ? "bg-blue-200" : "bg-gray-50"}`}
                role="button"
                tabIndex={0}
              >
                {suggestion.item_name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
