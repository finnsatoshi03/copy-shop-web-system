import React from "react";

type Direction = "top-right" | "top-left" | "bottom-right" | "bottom-left";

interface NotifBadgeProps {
  children: React.ReactNode;
  direction?: Direction;
}

export function NotifBadge({
  children,
  direction = "top-right",
}: NotifBadgeProps) {
  const positionClasses = {
    "top-right": "top-0 right-0",
    "top-left": "top-0 left-0",
    "bottom-right": "bottom-0 right-0",
    "bottom-left": "bottom-0 left-0",
  };

  return (
    <div
      className={`absolute ${positionClasses[direction]} flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white`}
    >
      {children}
    </div>
  );
}
