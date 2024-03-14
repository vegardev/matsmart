import { Recipe_Preview } from "@/src/app/backend/definitions";
import Image from "next/image";

export function Recipe({ recipes }: { recipes: Recipe_Preview[] }) {
  return (
    <>
      {recipes.map((recipe) => (
        <div key={recipe.recipe_id} className="grid-col-4 gap-4 lg:max-w-xs">
          <div className="rounded-xl bg-gray-50 shadow-sm">
            <Image
              className=""
              src={recipe.recipe_image}
              alt={"Image of " + recipe.recipe_name}
            />
            <div className="truncate rounded-xl bg-white">
              <div className="flex p-4">
                <h2 className="ml-2 text-base font-bold">
                  {recipe.recipe_name}
                </h2>
              </div>
              <p className="text-sm font-medium ps-4 pb-4 ml-2">
                {recipe.recipe_time} min
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
