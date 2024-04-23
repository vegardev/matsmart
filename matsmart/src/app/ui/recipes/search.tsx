import { useDebouncedCallback } from "use-debounce";
import { useState, useEffect } from "react";
import { Tags } from "@/src/app/backend/definitions";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { getTags } from "@/src/app/backend/uploadData";

const animatedComponents = makeAnimated();

/**
 * Renders a search bar component.
 *
 * @param {string} placeholder - The placeholder text for the search input.
 * @returns {JSX.Element} The rendered search bar component.
 */
export function SearchBar({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  /**
   * Handles the search functionality with debouncing.
   *
   * @param {string} term - The search term.
   */
  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("query")?.toString()}
      />
    </div>
  );
}

/**
 * Renders a search component that allows searching recipes by tags.
 */
export function SearchByTags() {
  const [tags, setTags] = useState<Tags[]>([]);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  /**
   * Handles the search functionality with debouncing.
   *
   * @param {string} term - The search term.
   */
  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("tags", term);
    } else {
      params.delete("tags");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  useEffect(() => {
    const fetchTags = async () => {
      const fetchedTags = await getTags();
      setTags(fetchedTags);
    };

    fetchTags();
  }, []);

  return (
    <div className=" w-auto max-w-lg min-w-60">
      <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        isMulti
        options={tags.map((tag) => ({
          value: tag.tag_id,
          label: tag.tag_name,
        }))}
        onChange={(tags) => {
          handleSearch(tags.map((data: any) => data.label).join(",")); // Using any because it was really hard to figure out a typing due to react.select
        }}
      />
    </div>
  );
}
