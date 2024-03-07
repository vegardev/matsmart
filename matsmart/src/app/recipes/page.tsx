import { SearchBar, SearchSort } from "@/src/app/ui/recipes/search";
import { SearchButton } from "@/src/app/ui/recipes/buttons";
import { Recipe } from "@/src/app/ui/recipes/recipe";

export default function Recipes() {
  return (
    <main>
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
        <div className="mt-6 grid items-start ps-4">
          <SearchSort />
        </div>
      </div>
    </main>
  );
}
