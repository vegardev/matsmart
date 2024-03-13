"use client";

import { SearchBar, SearchSort } from "@/src/app/ui/recipes/search";
import { SearchButton } from "@/src/app/ui/recipes/buttons";
import { Recipe } from "@/src/app/ui/recipes/recipe";
import { useState } from "react";

export default function Recipes() {
  let like_button = document.getElementById("like-button");
  if (like_button) {
    like_button.addEventListener("click", () => {
      console.log("Like button clicked");
    });
  } else {
    console.error('Could not find element with ID "like_button"');
  }
  return (
    <div>
      <div>
        <button
          id="like-button"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={() => {
            "test";
          }}
        >
          Like{" "}
        </button>
      </div>
      <h1 className={`mb-4 text-xl md:text-2xl`}>Recipes</h1>

      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8 max-w-3xl ">
        <SearchBar placeholder="Search recipes..." />
        <SearchButton />
      </div>
      <div className="flex justify-between">
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Recipe
            title="Pasta"
            imgUrl="https://images.matprat.no/p8hgg8jg6v-jumbotron/large/fersk_pasta1.jpg"
            timeRequired="30 min"
          />
          <Recipe
            title="Pasta"
            imgUrl="https://images.matprat.no/p8hgg8jg6v-jumbotron/large/fersk_pasta1.jpg"
            timeRequired="30 min"
          />
          <Recipe
            title="Pasta"
            imgUrl="https://images.matprat.no/p8hgg8jg6v-jumbotron/large/fersk_pasta1.jpg"
            timeRequired="30 min"
          />
          <Recipe
            title="Pasta"
            imgUrl="https://images.matprat.no/p8hgg8jg6v-jumbotron/large/fersk_pasta1.jpg"
            timeRequired="30 min"
          />
          <Recipe
            title="Pasta"
            imgUrl="https://images.matprat.no/p8hgg8jg6v-jumbotron/large/fersk_pasta1.jpg"
            timeRequired="30 min"
          />
        </div>
        <div>
          <SearchSort
            tags={["test1", "test2", "test3"]}
            setTags={["test1", "test2"]}
          />
        </div>
      </div>
    </div>
  );
}
