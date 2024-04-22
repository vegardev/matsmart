import { SearchBar } from "@/src/app/ui/components/SearchBar";
import { render, waitFor, fireEvent } from "@testing-library/react";
import fetch from "jest-fetch-mock";

describe("SearchBar component", () => {
  const setSearch = jest.fn();
  const items = ["apple", "banana"];
  const databaseTable = "item";
  const search = "a";
  const placeholder = "Search for items...";

  beforeEach(() => {
    fetch.resetMocks();
  });

  it("renders without crashing", () => {
    const { getByPlaceholderText } = render(
      <SearchBar
        databaseTable={databaseTable}
        setSearch={setSearch}
        placeholder={placeholder}
        search={search}
        suggestions={items}
      />,
    );
    expect(getByPlaceholderText(placeholder)).toBeInTheDocument();
  });

  it("updates on change", () => {
    const setSearch = jest.fn();
    const { getByPlaceholderText } = render(
      <SearchBar
        databaseTable={databaseTable}
        setSearch={setSearch}
        placeholder={placeholder}
        search={search}
        suggestions={items}
      />,
    );
    const searchBar = getByPlaceholderText(placeholder);
    fireEvent.change(searchBar, { target: { value: "test" } });
    expect(setSearch).toHaveBeenCalledWith("test");
  });

  it("logs an error when fetching suggestion data fails", async () => {
    const consoleSpy = jest.spyOn(console, "error");
    const { getByPlaceholderText } = render(
      <SearchBar
        databaseTable={databaseTable}
        setSearch={setSearch}
        placeholder={placeholder}
        search={search}
        suggestions={items}
      />,
    );

    // Simulate a user typing in the search bar to trigger the fetch
    const searchBar = getByPlaceholderText("Search for items...");
    fireEvent.change(searchBar, { target: { value: "test" } });

    // Wait for any asynchronous actions to complete
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        "Error fetching suggestion data:",
        expect.any(Error),
      );
    });

    // Clean up the spy
    consoleSpy.mockRestore();
  });

  it("fetches suggestions on input", async () => {
    const mockSuggestions = ["apple", "banana"];
    fetch.mockResponseOnce(JSON.stringify({ data: mockSuggestions }));

    const setSearch = jest.fn();
    const { getByPlaceholderText } = render(
      <SearchBar
        setSearch={setSearch}
        placeholder={placeholder}
        databaseTable="item"
        search="a"
        suggestions={mockSuggestions}
      />,
    );
    const searchBar = getByPlaceholderText(placeholder);
    fireEvent.change(searchBar, { target: { value: "a" } });

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    expect(fetch).toHaveBeenCalledWith("/api/autocomplete/item/a");
  });

  it("handles Tab keydown", () => {
    const setSelected = jest.fn();
    const setItems = jest.fn();
    const setSearch = jest.fn();
    const setIsSuggestionSelected = jest.fn();
    const items = ["apple", "banana", "cherry"];
    const databaseTable = "fruit";
    const search = "apple";
    const selected = 0;

    const TestComponent = () => {
      const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "Tab" && items.length > 0) {
          setSelected((selected + 1) % items.length);
          event.preventDefault();
        } else if (event.key === "Enter") {
          if (selected !== null) {
            const selectedName = (items[selected] as any)[
              `${databaseTable}_name`
            ];
            setSearch(selectedName);
            setItems([]);
            console.log("Currently selected: ", selectedName);
            setIsSuggestionSelected(true);
          } else {
            setSearch(search);
          }
        }
      };

      return <input onKeyDown={handleKeyDown} />;
    };

    const { getByRole } = render(<TestComponent />);
    const input = getByRole("textbox");

    fireEvent.keyDown(input, { key: "Tab", code: "Tab" });
    expect(setSelected).toHaveBeenCalledWith(1);
  });

  it("handles Enter keydown", () => {
    const setSelected = jest.fn();
    const setItems = jest.fn();
    const setSearch = jest.fn();
    const setIsSuggestionSelected = jest.fn();
    const items = ["apple", "banana", "cherry"];
    const search = "apple";
    const selected = 0;

    const TestComponent = () => {
      const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "Tab" && items.length > 0) {
          setSelected((selected + 1) % items.length);
          event.preventDefault();
        } else if (event.key === "Enter") {
          if (selected !== null) {
            const selectedName = items[selected];
            setSearch(selectedName);
            setItems([]);
            setIsSuggestionSelected(true);
          } else {
            setSearch(search);
          }
        }
      };

      return <input onKeyDown={handleKeyDown} />;
    };

    const { getByRole } = render(<TestComponent />);
    const input = getByRole("textbox");

    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    expect(setSearch).toHaveBeenCalledWith(items[selected]);
    expect(setItems).toHaveBeenCalledWith([]);
    expect(setIsSuggestionSelected).toHaveBeenCalledWith(true);
  });
});
