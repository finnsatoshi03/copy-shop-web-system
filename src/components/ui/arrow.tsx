import { ChevronLeft, ChevronRight } from "lucide-react";

export function Arrow({
  direction,
  onClick,
  className,
}: {
  direction: "left" | "right";
  onClick: () => void;
  className: string;
}) {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;
  return (
    <Icon
      size={24}
      className={`${className} absolute z-10 hidden -translate-y-1/2 transform rounded-full bg-gray-300 p-0.5 text-white hover:bg-gray-400 hover:text-white md:block`}
      style={direction === "left" ? { left: "-2rem" } : { right: "-2rem" }}
      onClick={onClick}
    />
  );
}
