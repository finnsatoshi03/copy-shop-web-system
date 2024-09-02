import React from "react";

interface FilterItemProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  isActive: boolean;
}

export function FilterItem({
  icon,
  label,
  onClick,
  isActive,
}: FilterItemProps) {
  return (
    <div
      className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-1 text-sm ${
        isActive ? "bg-zinc-600 text-white" : "bg-white"
      }`}
      onClick={onClick}
    >
      {icon}
      {label}
    </div>
  );
}
