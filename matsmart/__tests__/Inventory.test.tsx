import React, { useState } from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
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

  describe("handleCheckboxChange function", () => {
    it("updates the state correctly when a checkbox is clicked", () => {
      const TestComponent = () => {
        const [checkedStates, setCheckedStates] = useState([
          false,
          false,
          false,
        ]);

        const handleCheckboxChange = (index: number) => {
          setCheckedStates((prevCheckedStates) => {
            const newCheckedStates = [...prevCheckedStates];
            newCheckedStates[index] = !newCheckedStates[index];
            return newCheckedStates;
          });
        };

        return (
          <div>
            {checkedStates.map((checked, index) => (
              <input
                key={index}
                type="checkbox"
                checked={checked}
                onChange={() => handleCheckboxChange(index)}
              />
            ))}
          </div>
        );
      };

      const { getAllByRole } = render(<TestComponent />);
      const checkboxes = getAllByRole("checkbox");

      // Simulate a click on the second checkbox
      fireEvent.click(checkboxes[1]);

      // Check that the second checkbox is now checked
      expect(checkboxes[1]).toBeChecked();
    });
  });

  it("handles delete", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve(new Response(JSON.stringify({}))),
    );

    const items = [{ item_id: 1 }, { item_id: 2 }, { item_id: 3 }];
    const checkedStates = [true, false, true];

    const TestComponent = () => {
      const handleDelete = async () => {
        const checkedItems = items.filter((_, index) => checkedStates[index]);

        for (const item of checkedItems) {
          await fetch(`/api/inventory/${item.item_id}`, {
            method: "DELETE",
            body: JSON.stringify({
              item_id: item.item_id,
            }),
          });
        }
      };

      return <button onClick={handleDelete}>Delete</button>;
    };

    const { getByRole } = render(<TestComponent />);
    const button = getByRole("button");

    fireEvent.click(button);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(2);
      expect(fetch).toHaveBeenCalledWith(
        `/api/inventory/1`,
        expect.any(Object),
      );
      expect(fetch).toHaveBeenCalledWith(
        `/api/inventory/3`,
        expect.any(Object),
      );
    });
  });
});
