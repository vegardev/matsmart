import React from "react";
import { render, waitFor } from "@testing-library/react";
import InventoryPage from "@/src/app/inventory/[location]/page";
import {
  freezerInventoryDummyData,
  fridgeInventoryDummyData,
  pantryInventoryDummyData,
} from "@/src/app/backend/dummyData";
import fetch from "jest-fetch-mock";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("InventoryPage", () => {
  it("renders Freezer correctly", async () => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      route: "/inventory/[location]",
      pathname: "/inventory/[location]",
      query: { location: "fryser" },
      asPath: "/inventory/fryser",
    }));

    fetch.mockResponseOnce(JSON.stringify(freezerInventoryDummyData));

    const { asFragment } = render(
      <InventoryPage params={{ location: "fryser" }} />,
    );
    await waitFor(() => {
      expect(asFragment()).toMatchSnapshot();
    });
  });

  it("renders Fridge correctly", async () => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      route: "/inventory/[location]",
      pathname: "/inventory/[location]",
      query: { location: "kjøleskap" },
      asPath: "/inventory/kjøleskap",
    }));

    fetch.mockResponseOnce(JSON.stringify(fridgeInventoryDummyData));

    const { asFragment } = render(
      <InventoryPage params={{ location: "kjøleskap" }} />,
    );
    await waitFor(() => {
      expect(asFragment()).toMatchSnapshot();
    });
  });

  it("renders Pantry correctly", async () => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      route: "/inventory/[location]",
      pathname: "/inventory/[location]",
      query: { location: "skuff" },
      asPath: "/inventory/skuff",
    }));

    fetch.mockResponseOnce(JSON.stringify(pantryInventoryDummyData));

    const { asFragment } = render(
      <InventoryPage params={{ location: "skuff" }} />,
    );
    await waitFor(() => {
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
