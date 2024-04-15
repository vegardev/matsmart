export function SearchSuggestions({
  suggestions,
}: {
  suggestions: { recipe_id: number; title: string; image: string }[];
}) {
  return (
    <>
      <div className="flex flex-col rounded-b-md p-1 bg-gray-50">
        <h1>SearchSuggestions</h1>
        <ul>
          {suggestions.map((suggestion, index) => (
            <li key={index}>{suggestion.title}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
