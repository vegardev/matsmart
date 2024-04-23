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
  // useSearchParams is a hook that returns the current URL search parameters
  const searchParams = useSearchParams();
  // usePathname is a hook that returns the current URL pathname
  const pathname = usePathname();
  // useRouter is a hook that provides router object. replace is a method to replace the current URL
  const { replace } = useRouter();

  /**
   * Handles the search functionality with debouncing.
   *
   * @param {string} term - The search term.
   */
  // useDebouncedCallback is a hook that debounces the provided function
  const handleSearch = useDebouncedCallback((term) => {
    // Creating a new URLSearchParams object with the current search parameters
    const params = new URLSearchParams(searchParams);
    // If the search term exists, set the 'query' parameter to the term
    if (term) {
      params.set("query", term);
    } else {
      // If the search term doesn't exist, delete the 'query' parameter
      params.delete("query");
    }
    // Replace the current URL with the new search parameters
    replace(`${pathname}?${params.toString()}`);
  }, 300); // The debounce delay is 300ms

  // The component returns a search input field
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        // When the input value changes, handleSearch is called with the new value
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        // The default value of the input field is the current 'query' parameter
        defaultValue={searchParams.get("query")?.toString()}
      />
    </div>
  );
}

/**
 * Renders a search component that allows searching recipes by tags.
 */
export function SearchByTags() {
  // State for storing tags
  const [tags, setTags] = useState<Tags[]>([]);

  // Hook for accessing search parameters from the URL
  const searchParams = useSearchParams();

  // Hook for accessing the current URL path
  const pathname = usePathname();

  // Hook for accessing the router's replace method
  const { replace } = useRouter();

  /**
   * Handles the search functionality with debouncing.
   *
   * @param {string} term - The search term.
   */
  const handleSearch = useDebouncedCallback((term) => {
    // Create a new URLSearchParams instance with the current search parameters
    const params = new URLSearchParams(searchParams);

    // If a term is provided, set the "tags" parameter to the term
    // Otherwise, delete the "tags" parameter
    if (term) {
      params.set("tags", term);
    } else {
      params.delete("tags");
    }

    // Replace the current URL with the new search parameters
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  // Effect for fetching tags on component mount
  useEffect(() => {
    const fetchTags = async () => {
      // Fetch tags and update state
      const fetchedTags = await getTags();
      setTags(fetchedTags);
    };

    // Call the fetchTags function
    fetchTags();
  }, []);

  return (
    <div className=" w-auto max-w-lg min-w-60">
      <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        isMulti
        options={tags.map((tag) => ({
          // Map each tag to an option with a value and label
          value: tag.tag_id,
          label: tag.tag_name,
        }))}
        onChange={(tags) => {
          // When the selected tags change, call handleSearch with the labels of the selected tags
          handleSearch(tags.map((data: any) => data.label).join(",")); // Using any because it was really hard to figure out a typing due to react.select
        }}
      />
    </div>
  );
}
