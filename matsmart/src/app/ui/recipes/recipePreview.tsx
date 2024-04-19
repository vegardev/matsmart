import { Recipe_Preview } from "@/src/app/backend/definitions";
import Image from "next/image";
import Link from "next/link";
import { getRecipes } from "@/src/app/backend/uploadData";
import { useEffect, useState } from "react";

export function Recipe({ queryfetch }: { queryfetch: string }) {
  const [recipes, setRecipes] = useState<Recipe_Preview[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const result = await getRecipes(queryfetch);
      setRecipes(result);
    };

    fetchRecipes();
  }, [queryfetch]);
  console.log(recipes);
  return (
    <>
      {recipes.map((recipe) => (
        <Link
          key={recipe.recipe_id}
          href={"/recipes/" + recipe.recipe_id}
          className="grid-col-4 gap-4 lg:max-w-xs md:max-w-lg group"
        >
          <div className="rounded-xl bg-gray-50 shadow-sm">
            <Image
              className="lg:h-52 md:h-48 sm:h-44 phone:h-40 object-cover"
              width={320}
              height={208}
              src={recipe.recipe_image}
              alt={"Image of " + recipe.title}
            />
            <div className="truncate rounded-xl bg-white">
              <div className="flex p-4">
                <h2 className="ml-2 text-base font-bold group-hover:text-blue-400">
                  {recipe.title}
                </h2>
              </div>
              <div className="flex">
                <p className="text-sm font-medium ps-4 pb-4 ml-2">
                  {recipe.recipe_time}
                </p>
                <div className="flex flex-wrap space-x-1 ps-4 pb-2">
                  {recipe.recipe_tags.length > 1 ? (
                    <>
                      <p
                        key={recipe.recipe_tags[0]}
                        className="bg-gray-100 rounded-full px-2 py-1 text-xs mb-1"
                      >
                        {recipe.recipe_tags[0]}
                      </p>
                      <p className="text-xs bg-gray-100 rounded-full px-2 py-1 mb-1">
                        {recipe.recipe_tags.length - 1} more tags...
                      </p>
                    </>
                  ) : (
                    recipe.recipe_tags.map((tag) => (
                      <p
                        key={tag}
                        className="bg-gray-100 rounded-full px-2 py-1 text-xs"
                      >
                        {tag}
                      </p>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}
