"use client";
import { Recipe_Page } from "@/src/app/backend/definitions";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  IngredientsCheck,
  MakeRecipeButton,
} from "@/src/app/ui/recipes/recipePage/otherComponents";
import { DisplayRecipeTags } from "@/src/app/ui/recipes/sharedComponents";
import { RecipeTextFields } from "@/src/app/ui/recipes/recipePage/textFields";
import { getRecipeByIdFetch } from "@/src/app/backend/uploadData";
import { useEffect, useState } from "react";

async function getRecipeById(id: number): Promise<Recipe_Page> {
  const recipe = await getRecipeByIdFetch(id);
  if (!recipe) {
    return notFound(); // Kan eventuelt lage en egen 404 side
  }
  return recipe;
}

export default function Page({ params }: { params: { id: string } }) {
  const [recipe, setRecipe] = useState<Recipe_Page | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      const result = await getRecipeById(Number(params.id));
      setRecipe(result);
    };

    fetchRecipe();
  }, [params.id]);

  if (!recipe) {
    return <div>Loading...</div>; // or your custom loading component
  }

  return (
    <>
      <div className="flex justify-between mb-6">
        <div className="mb-4 text-xl md:text-4xl flex">
          <div className="mr-6 pt-2">{recipe.title}</div>
          <MakeRecipeButton
            recipe_id={recipe.recipe_id}
            ingredientsNeeded={recipe.recipe_ingredients}
          />
        </div>
        <div className="bg-white rounded-lg p-2 pr-6">
          <div>
            <DisplayRecipeTags tags={recipe.recipe_tags} />
          </div>
          <IngredientsCheck ingredientsNeeded={recipe.recipe_ingredients} />
        </div>
      </div>
      <div className="grid grid-cols-11">
        <div className="col-span-5 mr-4">
          <RecipeTextFields type="Method" content={recipe.recipe_method} />
        </div>
        <div className="col-span-3 mr-4">
          <RecipeTextFields
            type="Ingredients"
            content={recipe.recipe_ingredients}
          />
        </div>
        <div className="flex flex-col col-span-3">
          <Image
            className="lg:w-full max-h-64 object-cover mb-5"
            width={320}
            height={208}
            src={recipe.recipe_image}
            alt={"Image of " + recipe.title}
          />
          <RecipeTextFields
            type="Nutritions/Facts"
            content={recipe.recipe_nutritions}
          />
        </div>
      </div>
    </>
  );
}
