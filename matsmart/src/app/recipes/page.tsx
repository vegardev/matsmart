"use client";
import { SearchBar, SearchByTags } from "@/src/app/ui/recipes/search";
import {
  SearchButton,
  RandomRecipeButton,
  AddRecipeButton,
} from "@/src/app/ui/recipes/buttons";
import { Recipe } from "@/src/app/ui/recipes/recipePreview";
import { recipesDummyData } from "@/src/app/backend/dummyData";

export default function Recipes({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || "";

  return (
    <div>
      <div className="flex">
        <h1 className="mb-4 text-xl md:text-2xl">Recipes</h1>
        <RandomRecipeButton recipes={recipesDummyData} />
        <AddRecipeButton />
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8 max-w-3xl ">
        <SearchBar placeholder="Search recipes..." />
        <SearchButton />
      </div>
      <div className="flex">
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Recipe queryfetch={query} />
        </div>
        <div className="lg:ml-10 md:ml-6 sm:ml-3">
          <SearchByTags />
        </div>
      </div>
    </div>
  );
}
