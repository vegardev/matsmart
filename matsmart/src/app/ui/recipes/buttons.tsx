import {
  MagnifyingGlassIcon,
  ArrowUpOnSquareIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState, useEffect } from "react";

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
      className=" flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      href={"/recipes/" + id}
    >
      Random Recipe <MagnifyingGlassIcon className="h-5 ml-2" />
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
      className="flex items-center h-10 bg-blue-600 text-white px-4 rounded-lg font-medium text-sm transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      href="/recipes/create"
    >
      Add Recipe <ArrowUpOnSquareIcon className="h-5 ml-2" />
    </Link>
  );
}
