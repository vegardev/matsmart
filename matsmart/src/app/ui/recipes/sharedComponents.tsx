/**
 * Displays the tags associated with a recipe.
 *
 * @param tags - An array of strings representing the tags.
 * @returns A React component that renders the tags.
 */
export function DisplayRecipeTags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap space-x-1 ps-4 pb-2">
      Tags:
      {tags.map((tag) => (
        <p
          key={tag}
          className="bg-gray-100 rounded-full px-2 py-1 text-xs ms-2"
        >
          {tag}
        </p>
      ))}
    </div>
  );
}
