export function OrderTypeSelector({
  orderType,
  onOrderTypeChange,
}: {
  orderType: "dine-in" | "take-out";
  onOrderTypeChange: (type: "dine-in" | "take-out") => void;
}) {
  return (
    <div className="my-4 grid grid-cols-2 rounded-lg border bg-gray-100 text-center">
      <div
        className={`cursor-pointer py-2 lg:py-4 ${
          orderType === "dine-in"
            ? "rounded-lg bg-neutral-900 text-neutral-50"
            : ""
        }`}
        onClick={() => onOrderTypeChange("dine-in")}
      >
        Dine-in
      </div>
      <div
        className={`cursor-pointer py-2 lg:py-4 ${
          orderType === "take-out"
            ? "rounded-lg bg-neutral-900 text-neutral-50"
            : ""
        }`}
        onClick={() => onOrderTypeChange("take-out")}
      >
        Take Out
      </div>
    </div>
  );
}
