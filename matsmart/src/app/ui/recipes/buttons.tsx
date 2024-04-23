import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState, useEffect } from "react";

/**
 * Renders a search button with a magnifying glass icon.
 * @returns The rendered search button component.
 */
export function SearchButton() {
  return (
    <Link
      href="/dashboard/invoices/create" /* Endre her senere */
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <MagnifyingGlassIcon className="h-5" />
    </Link>
  );
}

/**
 * Renders a button that redirects to a random recipe page.
 *
 * @param recipes - An array of recipe IDs.
 * @returns The RandomRecipeButton component.
 */
export function RandomRecipeButton({ recipes }: { recipes: number[] }) {
  const [id, setId] = useState(0);

  useEffect(() => {
    const newId = Math.floor(Math.random() * recipes.length);
    setId(recipes[newId]);
  }, [recipes, recipes.length]);

  return (
    <Link
      className=" text-center ml-10 bg-gray-50 mb-4 px-3 rounded-lg"
      href={"/recipes/" + id}
    >
      Random Recipe
    </Link>
  );
}

/**
 * Renders a button component for adding a recipe.
 * @returns The JSX element representing the add recipe button.
 */
export function AddRecipeButton() {
  return (
    <Link
      className="items-center ml-5 bg-gray-50 mb-4 px-3 rounded-lg"
      href="/recipes/create"
    >
      Add Recipe
    </Link>
  );
}
