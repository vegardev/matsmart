export function SearchSuggestions<T>({
  setSearch,
  suggestions,
  selected,
  databaseTable,
}: {
  // eslint-disable-next-line no-unused-vars
  setSearch: (search: string) => void;
  suggestions: T[];
  selected: number;
  databaseTable: string;
}) {
  const handleItemClick = (name: string) => {
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
  return (
    <>
      {suggestions.length > 0 && (
        <div className="flex flex-col rounded-b-md p-2 bg-gray-50">
          <ul>
            {suggestions.map((suggestion, index) => {
              const id = (suggestion as any)[`${databaseTable}_id`];
              const name = (suggestion as any)[`${databaseTable}_name`];
              return (
                <li
                  key={id}
                  onClick={() => handleItemClick(name)}
                  onKeyDown={handleKeyDown(name)}
                  className={`rounded-md p-1 ${index === selected ? "bg-blue-200" : "bg-gray-50"}`}
                  role="button"
                  tabIndex={0}
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
