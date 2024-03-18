"use client";
import { recipesDummyData } from "@/src/app/backend/dummyData"; // Erstatt med database data senere
import { Recipe_Preview } from "@/src/app/backend/definitions";
import Image from "next/image";
import { notFound } from "next/navigation";
import { DisplayRecipeTags } from "@/src/app/ui/recipes/recipePage/otherComponents";

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
      <div className="flex justify-between mb-10">
        <div className="mb-4 text-xl md:text-4xl">{recipe.recipe_name}</div>
        <div className="">
          <div>
            <DisplayRecipeTags tags={recipe.recipe_tags} />
          </div>
          <div>Can be made until: 12.03.2024</div> {/* Legg til etter MVP */}
        </div>
      </div>
      <div className="grid grid-cols-5">
        {/* Alt nedover her endres senere. Dette er bare for MVP */}
        <div className="col-span-2">
          <h2 className=" text-2xl font-bold">Method:</h2>
          <p>
            of gfahg saopiu gaiushg iuguhasuh fhassfiug 9ash ghhi hhfgi ashu
            haiughaiuhguiehuuhiuhahdgdshg fhgfuyagf ayofg oiyagfouyasg fuygafu
            ygasufyg sywoyf gewauioygfo8 iuyewqgofuy gewuoygfoewuy
            gfousdhyghfoui sdhfpoufopieugpiuyrehg iurfoøiqeuro ielifjuhh diulf
            sdygfhisudy g fuhylksdgf uiysdgf uiysdgfu fusdg fiudsgfoiuysdgh
            fo8iuyeghfoiweu y
          </p>
        </div>
        <div className="col-span-2">
          <h2 className=" text-2xl font-bold">Ingredients:</h2>
          <p>
            of gfahg saopiu gaiushg iuguhasuh fhassfiug 9ash ghhi hhfgi ashu
            haiughaiuhguiehuuhiuhahdgdshg fhgfuyagf ayofg oiyagfouyasg fuygafu
            ygasufyg sywoyf gewauioygfo8 iuyewqgofuy gewuoygfoewuy
            gfousdhyghfoui sdhfpoufopieugpiuyrehg iurfoøiqeuro ielifjuhh diulf
            sdygfhisudy g fuhylksdgf uiysdgf uiysdgfu fusdg fiudsgfoiuysdgh
            fo8iuyeghfoiweu y
          </p>
        </div>
        <div className="flex flex-col">
          <Image
            className="lg:h-52 md:h-48 sm:h-44 phone:h-40 object-cover mb-5"
            width={320}
            height={208}
            src={recipe.recipe_image}
            alt={"Image of " + recipe.recipe_name}
          />
          <div className="">
            <h2 className=" text-2xl font-bold">Nutrition:</h2>
            <p className="">
              of gfahg saopiu gaiushg iuguhasuh fhassfiug 9ash ghhi hhfgi ashu
              haiughaiuhguiehuuhiuhahdgdshg fhgfuyagf ayofg oiyagfouyasg fuygafu
              ygasufyg sywoyf gewauioygfo8 iuyewqgofuy gewuoygfoewuy
              gfousdhyghfoui sdhfpoufopieugpiuyrehg iurfoøiqeuro ielifjuhh diulf
              sdygfhisudy g fuhylksdgf uiysdgf uiysdgfu fusdg fiudsgfoiuysdgh
              fo8iuyeghfoiweu y
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
