import React from "react";
import ShoppingList from "@/src/app/shoppinglist/page";
import { shoppingListDummyData } from "@/src/app/backend/dummyData";
import { render, waitFor, fireEvent } from "@testing-library/react";
import fetch from "jest-fetch-mock";

describe("Shopping List page", () => {
  beforeEach(() => {
    fetch.resetMocks();
    fetch.mockResponse(JSON.stringify(shoppingListDummyData));
  });

  it("renders correctly", async () => {
    const { asFragment } = render(<ShoppingList />);
    await waitFor(() => {
      expect(asFragment()).toMatchSnapshot();
    });
  });

  it("fetches data and updates state", async () => {
    const { getByText } = render(<ShoppingList />);
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(2);
      expect(getByText(shoppingListDummyData[0].item_name)).toBeInTheDocument();
    });
  });

  it("handles checkbox change", async () => {
    const { findAllByTestId } = render(<ShoppingList />);
    const checkboxInputs = await findAllByTestId("checkbox-input");
    fireEvent.click(checkboxInputs[1]);
    await waitFor(() => {
      expect(checkboxInputs[1]).toBeChecked();
    });
  });

  it("handles quantity change", async () => {
    const { findAllByTestId } = render(<ShoppingList />);
    const quantityInputs = await findAllByTestId("quantity-input");
    fireEvent.change(quantityInputs[0], { target: { value: 2 } });
    await waitFor(() => {
      expect(quantityInputs[0]).toHaveValue(2);
    });
  });

  it("handles expiry date change", async () => {
    const { findAllByTestId } = render(<ShoppingList />);
    const checkboxes = await findAllByTestId("checkbox-input");
    fireEvent.click(checkboxes[0]);
    const dateInputs = await findAllByTestId("expiry-date-input");
    fireEvent.change(dateInputs[0], { target: { value: "2025-12-31" } });
    await waitFor(() => {
      expect(dateInputs[0]).toHaveValue("2025-12-31");
    });
  });

  it("handles location change", async () => {
    const { findAllByTestId, findByTestId } = render(<ShoppingList />);
    const checkboxes = await findAllByTestId("checkbox-input");
    fireEvent.click(checkboxes[0]);
    const locationInput = await findByTestId("location-input");
    fireEvent.change(locationInput, { target: { value: "kjøleskap" } });
    await waitFor(() => {
      expect(locationInput).toHaveValue("kjøleskap");
    });
  });

  it("handles delete", async () => {
    const { findAllByTestId } = render(<ShoppingList />);
    const deleteButtons = await findAllByTestId("delete-button");
    fireEvent.click(deleteButtons[0]);
    await waitFor(() => {
      expect(deleteButtons[0]).toBeInTheDocument();
    });
  });
});
