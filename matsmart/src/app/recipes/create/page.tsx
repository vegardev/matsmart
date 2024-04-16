"use client";
import Image from "next/image";
import { SearchByTags } from "@/src/app/ui/recipes/search";
import { tagsDummyData } from "@/src/app/backend/dummyData";
import { TextInputFields } from "@/src/app/ui/recipes/createRecipe/inputFields";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <div className="flex justify-between mb-10">
        <div className="mb-4 text-xl md:text-4xl">
          <input type="text" placeholder="Write recipe title..." />
          <Link
            href="/recipes/1"
            className="text-center bg-gray-50 px-3 rounded-lg ml-2"
          >
            Upload recipe
          </Link>
        </div>
        <div className="flex justify-end">
          <SearchByTags tags={tagsDummyData} displayText="Add tags" />
        </div>
      </div>
      <div className="grid grid-cols-11">
        {/* Alt nedover her endres senere. Dette er bare for MVP */}
        <div className="col-span-5 mr-4">
          <TextInputFields catagory="Method" />
        </div>
        <div className="col-span-3 mr-4">
          <TextInputFields catagory="Ingredients" />
        </div>
        <div className="col-span-3 mr-4">
          <div className="flex flex-col">
            <Image
              className="lg:h-52 md:h-48 sm:h-44 phone:h-40 object-cover mb-5"
              width={423}
              height={256}
              src={"https://via.placeholder.com/423x256"}
              alt={"Image placeholder"}
            />
            <input type="text" placeholder="Insert image URL..." />
            <button className="text-center bg-gray-50 mb-4 px-3 rounded-lg mt-2">
              Upload image
            </button>
          </div>
          <TextInputFields catagory="Nutritions" />
        </div>
      </div>
    </>
  );
}
