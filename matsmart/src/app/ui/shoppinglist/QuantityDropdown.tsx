import {
  QuantityDropdownProps,
  ingredientTypes,
} from "@/src/app/backend/definitions";

/**
 * QuantityDropdown component.
 * @param {Object} props - The props for the component.
 * @param {number} props.quantity - The current quantity.
 * @param {(value: number) => void} props.setQuantity - Function to set the quantity.
 * @param {string} props.quantityType - The current quantity type.
 * @param {(value: string) => void} props.setQuantityType - Function to set the quantity type.
 * @returns The rendered QuantityDropdown component.
 */
export default function QuantityDropdown({
  quantity,
  setQuantity,
  quantityType,
  setQuantityType,
}: QuantityDropdownProps) {
  return (
    <div className="flex flex-row">
      <input
        type="number"
        min={0.5}
        step={0.5}
        className="rounded-l-md border border-gray-200 py-[9px] pl-3 text-sm outline-2"
        placeholder="1.5"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />
      <select
        id="measure"
        name="measure"
        className="rounded-r-md border border-gray-200 bg-gray-50 py-[9px] text-sm outline-2"
        value={quantityType}
        onChange={(e) => setQuantityType(e.target.value)}
      >
        {ingredientTypes.map((type) => (
          <option key={type.name} value={type.name}>
            {type.abbreviation}
          </option>
        ))}
      </select>
    </div>
  );
}
