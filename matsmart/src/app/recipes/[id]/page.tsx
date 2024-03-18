"use client";
import { recipesDummyData } from "@/src/app/backend/dummyData"; // Erstatt med database data senere
import { Recipe_Preview } from "@/src/app/backend/definitions";
import Image from "next/image";
import { notFound } from "next/navigation";

function getRecipeById(id: number): Recipe_Preview {
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
      <div className="mb-4 text-xl md:text-2xl">{recipe.recipe_name}</div>
      <Image
        className="lg:h-52 md:h-48 sm:h-44 phone:h-40 object-cover"
        width={320}
        height={208}
        src={recipe.recipe_image}
        alt={"Image of " + recipe.recipe_name}
      />
    </>
  );
}
