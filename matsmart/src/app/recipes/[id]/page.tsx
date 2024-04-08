"use client";
import { recipesDummyData } from "@/src/app/backend/dummyData"; // Erstatt med database data senere
import { Recipe_Page } from "@/src/app/backend/definitions";
import Image from "next/image";
import { notFound } from "next/navigation";
import { DisplayRecipeTags } from "@/src/app/ui/recipes/recipePage/otherComponents";
import {
  RecipeMethodField,
  RecipeIngredientsField,
} from "@/src/app/ui/recipes/recipePage/textFields";

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
      <div className="flex justify-between mb-10">
        <div className="mb-4 text-xl md:text-4xl">{recipe.recipe_name}</div>
        <div className="">
          <div>
            <DisplayRecipeTags tags={recipe.recipe_tags} />
          </div>
          <div className="ps-4">Can be made until: 12.03.2024</div>{" "}
          {/* Legg til etter MVP */}
        </div>
      </div>
      <div className="grid grid-cols-11">
        {/* Alt nedover her endres senere. Dette er bare for MVP */}
        <div className="col-span-5 mr-4">
          <RecipeMethodField method={recipe.recipe_method} />
        </div>
        <div className="col-span-3 mr-4">
          <RecipeIngredientsField ingredients={recipe.recipe_ingredients} />
        </div>
        <div className="flex flex-col col-span-3">
          <Image
            className="lg:w-full max-h-64 object-cover mb-5"
            width={320}
            height={208}
            src={recipe.recipe_image}
            alt={"Image of " + recipe.recipe_name}
          />
          <div className="flex flex-col justify-between rounded-xl bg-gray-50 p-4">
            <h2 className="py-4 text-2xl font-bold">Nutritions:</h2>
            <div className="rounded-2xl">
              <p>
                <b>Energy:</b> 1000 kcal
                <br />
                <b>Protein:</b> 50 g
                <br />
                <b>Fat:</b> 30 g
                <br />
                <b>Carbohydrates:</b> 100 g
                <br />
                <b>Fiber:</b> 10 g
                <br />
                <b>Salt:</b> 5 g
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
