"use client";
import { SearchBar, SearchByTags } from "@/src/app/ui/recipes/search";
import {
  SearchButton,
  RandomRecipeButton,
  AddRecipeButton,
} from "@/src/app/ui/recipes/buttons";
import { Recipe } from "@/src/app/ui/recipes/recipePreview";
import { getRecipeIds } from "@/src/app/backend/uploadData";
import { useEffect, useState } from "react";

/**
 * Renders the Recipes page component.
 *
 * @param searchParams - The search parameters for filtering recipes.
 * @param searchParams.query - The query string for searching recipes.
 * @param searchParams.tags - The tags for filtering recipes.
 *
 * @returns The rendered Recipes page component.
 */
export default function Recipes({
  searchParams,
}: {
  // It accepts an optional object as a prop named searchParams
  // The object can have two properties: query and tags, both are optional and of type string
  searchParams?: {
    query?: string;
    tags?: string;
  };
}) {
  // It initializes two state variables query and tags from searchParams
  // If searchParams is not provided, it defaults to an empty string
  const query = searchParams?.query || "";
  const tags = searchParams?.tags || "";
  const [recipeIds, setRecipeIds] = useState<number[]>([]);

  // It fetches recipeIds when the component mounts
  useEffect(() => {
    getRecipeIds().then(setRecipeIds);
  }, []);

  return (
    <div>
      <div className="flex">
        <h1 className="mb-4 text-xl md:text-2xl">Recipes</h1>
        <RandomRecipeButton recipes={recipeIds} />
        <AddRecipeButton />
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8 max-w-3xl ">
        <SearchBar placeholder="Search recipes..." />
        <SearchButton />
      </div>
      <div className="flex">
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Recipe queryfetch={query} tagsFetch={tags} />
        </div>
        <div className="lg:ml-10 md:ml-6 sm:ml-3">
          <SearchByTags />
        </div>
      </div>
    </div>
  );
}
