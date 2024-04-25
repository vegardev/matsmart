import { render, fireEvent } from "@testing-library/react";
import QuantityDropdown from "@/src/app/ui/shoppinglist/QuantityDropdown";

test("QuantityDropdown updates quantity and quantity type when input and select values change", () => {
  const setQuantity = jest.fn();
  const setQuantityType = jest.fn();

  const { getByPlaceholderText, getByTestId } = render(
    <QuantityDropdown
      quantity={1.5}
      setQuantity={setQuantity}
      quantityType="kopp"
      setQuantityType={setQuantityType}
    />,
  );

  const quantityInput = getByPlaceholderText("1.5");
  const quantityTypeSelect = getByTestId("measure");

  fireEvent.change(quantityInput, { target: { value: "2" } });
  fireEvent.change(quantityTypeSelect, { target: { value: "teskje" } });

  expect(setQuantity).toHaveBeenCalledWith(2);
  expect(setQuantityType).toHaveBeenCalledWith("teskje");
});
