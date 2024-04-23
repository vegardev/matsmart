import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";

// Mapping of card types to their corresponding icons
const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
};

/**
 * Card component.
 * @param {Object} props - The props for the component.
 * @param {string} props.title - The title of the card.
 * @param {number | string} props.value - The value to be displayed on the card.
 * @param {"invoices" | "customers" | "pending" | "collected"} props.type - The type of the card, which determines the icon to be displayed.
 * @returns The rendered Card component.
 */
export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: "invoices" | "customers" | "pending" | "collected";
}) {
  // Get the icon for the card type from the icon map
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {/* Render the icon if it exists */}
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`$
            truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
