"use client";

import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { Tags } from "@/src/app/backend/definitions";

export function SearchBar({ placeholder }: { placeholder: string }) {
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
      />
    </div>
  );
}

export function SearchByTags({ tags }: { tags: Tags[] }) {
  const [showMap, setShowMap] = useState(false);

  /*Følgende kode er et produkt av å spør copilot om hjelp til å fikse en error som kom når man lagde en lignende kode under map funksjonen.
  Promten for å få koden var "I get the error Rendered more hooks than during the previous render."*/
  const [checkedTags, setCheckedTags] = useState<{ [key: number]: boolean }>(
    {},
  );
  const handleTagClick = (tagId: number) => {
    setCheckedTags((prevState) => ({
      ...prevState,
      [tagId]: !prevState[tagId],
    }));
  };
  //Til hit

  return (
    <div>
      <div
        className="group flex bg-gray-50 rounded-full hover:cursor-pointer"
        id="sortDropdownMenu"
        onClick={() => {
          setShowMap(!showMap);
        }}
      >
        <div className="flex items-center space-x-2 text-sm font-medium  hover:text-gray-900 pl-3">
          Sort by tags
        </div>
        {showMap ? (
          <ChevronUpIcon className="size-8 flex px-1 mr-1 ml-2 bg-gray-100 rounded-full group-hover:bg-gray-200" />
        ) : (
          <ChevronDownIcon className="size-8 flex px-1 mr-1 ml-2 bg-gray-100 rounded-full group-hover:bg-gray-200" />
        )}
      </div>
      {showMap && (
        <div className="py-2 flex justify-end">
          <ul className="py-2 space-y-1">
            {tags.map((tag) => (
              <li
                key={tag.tag_id}
                className="flex bg-gray-100 rounded-full px-2 py-1 justify-end hover:bg-gray-200 cursor-pointer"
                onClick={() => handleTagClick(tag.tag_id)}
              >
                {tag.tag_name}
                <input
                  id={"Checkbox_" + tag.tag_id}
                  type="checkbox"
                  className="flex ml-3"
                  checked={checkedTags[tag.tag_id] || false}
                  onChange={() => {
                    /* kode til senere når vi skal oppdatere query ved endring */
                  }}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}