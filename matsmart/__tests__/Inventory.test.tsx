import React from "react";
import { render, waitFor } from "@testing-library/react";
import Freezer from "@/src/app/inventory/freezer/page";
import Fridge from "@/src/app/inventory/fridge/page";
import Pantry from "@/src/app/inventory/pantry/page";
import {
  freezerInventoryDummyData,
  fridgeInventoryDummyData,
  pantryInventoryDummyData,
} from "@/src/app/backend/dummyData";

describe("Freezer", () => {
  it("renders correctly", async () => {
    fetch.mockResponseOnce(JSON.stringify(freezerInventoryDummyData));

    const { asFragment } = render(<Freezer />);
    await waitFor(() => {
      expect(asFragment()).toMatchSnapshot();
    });
  });
});

describe("Fridge", () => {
  it("renders correctly", async () => {
    fetch.mockResponseOnce(JSON.stringify(fridgeInventoryDummyData));

    const { asFragment } = render(<Fridge />);
    await waitFor(() => {
      expect(asFragment()).toMatchSnapshot();
    });
  });
});

describe("Pantry", () => {
  it("renders correctly", async () => {
    fetch.mockResponseOnce(JSON.stringify(pantryInventoryDummyData));

    const { asFragment } = render(<Pantry />);
    await waitFor(() => {
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
