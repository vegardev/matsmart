export function SearchSuggestions({
  setSearch,
  suggestions,
}: {
  // eslint-disable-next-line no-unused-vars
  setSearch: (search: string) => void;
  suggestions: {
    item_id: number;
    item_name: string;
    item_quantity_type: string;
  }[];
}) {
  return (
    <>
      <div className="flex flex-col rounded-b-md p-1 bg-gray-50">
        <ul>
          {suggestions.map((suggestion, index) => (
            <li key={index}>
              <button onClick={() => setSearch(suggestion.item_name)}>
                {suggestion.item_name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
