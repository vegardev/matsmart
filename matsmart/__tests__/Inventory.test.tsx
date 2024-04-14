import React from "react";
import { render } from "@testing-library/react";
import Freezer from "@/src/app/inventory/freezer/page";
import Fridge from "@/src/app/inventory/fridge/page";
import Pantry from "@/src/app/inventory/pantry/page";
import { fetchInventoryItems } from "@/src/app/backend/databaseCalls";
import {
  freezerInventoryDummyData,
  fridgeInventoryDummyData,
  pantryInventoryDummyData,
} from "@/src/app/backend/dummyData";
import { waitFor } from "@testing-library/react";

jest.mock("../src/app/backend/databaseCalls", () => ({
  fetchInventoryItems: jest.fn(),
}));

describe("Freezer", () => {
  it("renders correctly", async () => {
    (fetchInventoryItems as jest.Mock).mockResolvedValueOnce(
      freezerInventoryDummyData,
    );

    const { asFragment } = render(<Freezer />);
    await waitFor(() => {
      expect(asFragment()).toMatchSnapshot();
    });
  });
});

describe("Fridge", () => {
  it("renders correctly", async () => {
    (fetchInventoryItems as jest.Mock).mockResolvedValueOnce(
      fridgeInventoryDummyData,
    );

    const { asFragment } = render(<Fridge />);
    await waitFor(() => {
      expect(asFragment()).toMatchSnapshot();
    });
  });
});

describe("Pantry", () => {
  it("renders correctly", async () => {
    (fetchInventoryItems as jest.Mock).mockResolvedValueOnce(
      pantryInventoryDummyData,
    );

    const { asFragment } = render(<Pantry />);
    await waitFor(() => {
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
