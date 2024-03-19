export default function MeasurementDropdown() {
  return (
    <div className="flex ml-auto">
      <input
        type="number"
        min={0.5}
        step={0.5}
        className="block rounded-md border border-gray-200 py-[9px] pl-3 text-sm outline-2"
      />
      <select
        id="measure"
        name="measure"
        className="block rounded-md border border-gray-200 py-[9px] pl-3 text-sm outline-2"
      >
        <option value="stk">stk.</option>
        <option value="liter">L</option>
        <option value="desiliter">dL</option>
        <option value="milliliter">mL</option>
        <option value="kilogram">kg</option>
        <option value="gram">g</option>
      </select>
    </div>
  );
}
