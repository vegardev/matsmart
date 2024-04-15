/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect } from "react";
import { SearchSuggestions } from "@/src/app/ui/components/SearchSuggestions";

export function SearchBar({ searchTerm = "" }: { searchTerm: string }) {
  const [search, setSearch] = useState(searchTerm);
  const [recipes, setRecipes] = useState([]);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (search !== "") {
      fetch(`/api/autocomplete/${search}`)
        .then((response) => response.json())
        .then((data) => setRecipes(data));

      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [search]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col flex-1 flex-shrink-0">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <input
          id="search"
          className={`peer block w-full border border-gray-200 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500 ${isActive ? "rounded-t-md" : "rounded-md"}`}
          placeholder={searchTerm}
          value={search}
          onChange={(input) => setSearch(input.target.value)}
        />
      </div>
      {search && <SearchSuggestions suggestions={recipes} />}
    </div>
  );
}
