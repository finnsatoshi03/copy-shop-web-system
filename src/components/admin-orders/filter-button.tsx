export type Filter = "All" | "On Progress" | "Completed";

interface FilterButtonProps {
  label: Filter;
  isActive: boolean;
  onClick: () => void;
}

export const FilterButton: React.FC<FilterButtonProps> = ({
  label,
  isActive,
  onClick,
}) => (
  <button
    className={`rounded-lg px-3 py-1 text-sm ${
      isActive ? "bg-yellow-500 text-black" : "bg-white"
    }`}
    onClick={onClick}
  >
    {label}
  </button>
);
