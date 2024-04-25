import {
  QuantityDropdownProps,
  ingredientTypes,
} from "@/src/app/backend/definitions";

/**
 * QuantityDropdown component for selecting the quantity and measurement unit of a grocery item.
 *
 * @param {QuantityDropdownProps} props The props passed to the component.
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
        data-testid="measure"
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
