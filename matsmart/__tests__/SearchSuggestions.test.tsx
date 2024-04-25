import { render, fireEvent } from "@testing-library/react";
import { SearchSuggestions } from "@/src/app/ui/components/SearchSuggestions";

window.HTMLElement.prototype.scrollIntoView = jest.fn();
describe("SearchSuggestions component", () => {
  const setSearch = jest.fn();
  const suggestions = [
    { test_id: 1, test_name: "Test 1" },
    { test_id: 2, test_name: "Test 2" },
  ];

  it("renders suggestions", () => {
    const { getByText } = render(
      <SearchSuggestions
        setSearch={setSearch}
        suggestions={suggestions}
        selected={0}
        databaseTable="test"
      />,
    );

    expect(getByText("Test 1")).toBeInTheDocument();
    expect(getByText("Test 2")).toBeInTheDocument();
  });

  it("calls setSearch when a suggestion is clicked", () => {
    const { getByText } = render(
      <SearchSuggestions
        setSearch={setSearch}
        suggestions={suggestions}
        selected={0}
        databaseTable="test"
      />,
    );

    fireEvent.click(getByText("Test 1"));
    expect(setSearch).toHaveBeenCalledWith("Test 1");
  });

  it("calls setSearch when a suggestion is selected with keyboard", () => {
    const { getByText } = render(
      <SearchSuggestions
        setSearch={setSearch}
        suggestions={suggestions}
        selected={0}
        databaseTable="test"
      />,
    );

    fireEvent.keyDown(getByText("Test 1"), { key: "Enter" });
    expect(setSearch).toHaveBeenCalledWith("Test 1");
  });

  it("calls setSearch with a valid argument when Enter or Space is pressed", () => {
    const setSearch = jest.fn();
    const { getByText } = render(
      <SearchSuggestions
        setSearch={setSearch}
        suggestions={suggestions}
        selected={0}
        databaseTable="test"
      />,
    );

    const suggestion = getByText("Test 2");
    fireEvent.keyDown(suggestion, { key: "Enter", code: "Enter" });
    expect(setSearch).toHaveBeenCalledWith("Test 2");

    setSearch.mockClear();

    fireEvent.keyDown(suggestion, { key: " ", code: "Space" });
    expect(setSearch).toHaveBeenCalledWith("Test 2");
  });
});
