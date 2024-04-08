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
          <div className="ps-4">Can be made until: 12.03.2024</div>{" "}
          {/* Legg til etter MVP */}
        </div>
      </div>
      <div className="grid grid-cols-11">
        {/* Alt nedover her endres senere. Dette er bare for MVP */}
        <div className="col-span-5 mr-4">
          <div className="flex flex-col justify-between rounded-xl bg-gray-50 p-4">
            <h2 className="py-4 mx-3 text-2xl font-bold">Method:</h2>
            <div className="bg-white px-6 rounded-2xl">
              <p className="">
                of gfahg saopiu gaiushg iuguhasuh fhassfiug 9ash ghhi hhfgi ashu
                haiughaiuhguiehuuhiuhahdgdshg fhgfuyagf ayofhg oiyagfouyasg
                fuygafu ygasufyg sywoyf gewauioygfo8 iuyewqgofuy gewuoygfoewuy
                gfousdhyghfoui sdhfpoufopieugpiuyrehg iurfoøiqeuro ielifjuhh
                diulf sdygfhisudy g fuhylksdgf uiysdgf uiysdgfu fusdg
                fiudsgfoiuysdgh fo8iuyeghfoiweu y <br /> øifaf agfly aut
                aukufueyqt <br /> <br /> fuays fiyasilufyi asf ai fuøoiau f ywiu
                ladguyaeg fgk sadyf safasjfg sa-fusa fiuakuy qt <br /> <br />{" "}
                fuays fiyasilufyi asf ai fuøoiau f ywiu ladguyaeg fgk sadyf
                safasjfg sa-fusa fiuakuyqt <br /> <br /> fuays fiyasilufyi asf
                ai fuøoiau f ywiu ladguyaeg fgk sadyf safasjfg sa-fusa fiuakuyqt{" "}
                <br /> <br /> fuays fiyasilufyi asf ai fuøoiau f ywiu ladguyaeg
                fgk sadyf safasjfg sa-fusa fiuakuy qt <br /> <br /> fuays
                fiyasilufyi asf ai fuøoiau f ywiu ladguyaeg fgk sadyf safasjfg
                sa-fusa fiuakuy qt <br /> <br /> fuays fiyasilufyi asf ai
                fuøoiau f ywiu ladguyaeg fgk sadyf safasjfg sa-fusa fiuakuy qt{" "}
                <br /> <br /> fuays fiyasilufyi asf ai fuøoiau f ywiu ladguyaeg
                fgk sadyf safasjfg sa-fusa fiuakuy qt <br /> <br /> fuays
                fiyasilufyi asf ai fuøoiau f ywiu ladguyaeg fgk sadyf safasjfg
                sa-fusa fiuakuy qt <br /> <br /> fuays fiyasilufyi asf ai
                fuøoiau f ywiu ladguyaeg fgk sadyf safasjfg sa-fusa fiuakuy qt{" "}
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-3 mr-4">
          <div className="flex flex-col justify-between rounded-xl bg-gray-50 p-4">
            <h2 className="py-4 mx-3 text-2xl font-bold">Ingredients:</h2>
            <div className="bg-white px-6 rounded-2xl">
              <h3 className="font-bold text-lg">Pizza sauce</h3>
              <ul>
                <li>1 can of tomatoes</li>
                <li>1 onion</li>
                <li>1 garlic clove</li>
                <li>1 tbsp of olive oil</li>
                <li>1 tsp of salt</li>
                <li>1 tsp of sugar</li>
                <li>1 tsp of oregano</li>
              </ul>
              <br />
              <h3 className="font-bold text-lg">Pizza dough</h3>
              <ul>
                <li>25 g of yeast</li>
                <li>2.5 dl of water</li>
                <li>1 tbsp of olive oil</li>
                <li>1 tsp of salt</li>
                <li>7 dl of flour</li>
              </ul>
              <br />
              <h3 className="font-bold text-lg">
                {"Topping (copilot pizza xdd)"}
              </h3>
              <ul>
                <li>1 mozzarella</li>
                <li>1 tomato</li>
                <li>1 red onion</li>
                <li>1 bell pepper</li>
                <li>1 can of corn</li>
                <li>1 can of olives</li>
                <li>1 can of pineapple</li>
              </ul>
            </div>
          </div>
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
