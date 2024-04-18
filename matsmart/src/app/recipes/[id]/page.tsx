"use client";
import { recipesDummyData } from "@/src/app/backend/dummyData"; // Erstatt med database data senere
import { Recipe_Page } from "@/src/app/backend/definitions";
import Image from "next/image";
import { notFound } from "next/navigation";
import { IngredientsCheck } from "@/src/app/ui/recipes/recipePage/otherComponents";
import { DisplayRecipeTags } from "@/src/app/ui/recipes/sharedComponents";
import { RecipeTextFields } from "@/src/app/ui/recipes/recipePage/textFields";

function getRecipeById(id: number): Recipe_Page {
  const recipe = recipesDummyData.find((recipe) => recipe.recipe_id === id);
  if (!recipe) {
    return notFound(); // Kan eventuelt lage en egen 404 side
  }
  return recipe;
}

export default function Page({ params }: { params: { id: string } }) {
  const recipe = getRecipeById(Number(params.id));
  return (
    <>
      <div className="flex justify-between mb-6">
        <div className="mb-4 text-xl md:text-4xl">{recipe.recipe_name}</div>
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
            alt={"Image of " + recipe.recipe_name}
          />
          <RecipeTextFields
            type="Nutritions"
            content={recipe.recipe_nutrition}
          />
        </div>
      </div>
    </>
  );
}
