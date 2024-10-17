import type { CartItem } from "@/lib/types";
import { Minus, Plus, Trash } from "lucide-react";

export function CartItem({
  item,
  isEditing,
  handleRemove,
  handleIncrement,
  handleDecrement,
}: {
  item: CartItem;
  isEditing: boolean;
  handleRemove: (beverage_id: string, size: string) => void;
  handleIncrement: (
    beverage_id: string,
    size: string,
    quantity: number,
  ) => void;
  handleDecrement: (
    beverage_id: string,
    size: string,
    quantity: number,
  ) => void;
}) {
  return (
    <div className="grid grid-cols-[100px_1fr_auto] items-center gap-4">
      <img
        src={item.beverageImg || "images/placeholder.jpg"}
        className="rounded-xl"
      />
      <div className="h-[80%] w-[80%] font-label">
        <h1 className="font-bold">{item.name}</h1>
        <p className="flex items-end gap-2 font-bold">
          <span className="font-medium">
            ({item.size.charAt(0).toUpperCase()})
          </span>{" "}
          ₱{item.price}{" "}
          <span className="font-normal opacity-60">x{item.quantity}</span>
        </p>
        <p className="text-xs opacity-60">Sugar: {item.sugar_level}%</p>
      </div>
      <div
        className={`flex ${isEditing ? "h-[80%]" : "h-full"} flex-col items-end justify-between`}
      >
        {isEditing ? (
          <button onClick={() => handleRemove(item.beverage_id, item.size)}>
            <Trash size={16} className="text-red-500" />
          </button>
        ) : (
          <div className="flex flex-col rounded-lg bg-neutral-900 text-white">
            <button
              className="rounded-lg hover:bg-neutral-700"
              onClick={() =>
                handleIncrement(item.beverage_id, item.size, item.quantity)
              }
            >
              <Plus size={14} className="size-8 rounded-lg p-2" />
            </button>
            <button
              className="rounded-lg hover:bg-neutral-700"
              onClick={() =>
                handleDecrement(item.beverage_id, item.size, item.quantity)
              }
            >
              <Minus size={14} className="size-8 rounded-lg p-2" />
            </button>
          </div>
        )}
        <p className="font-bold">₱{item.total.toFixed(2)}</p>
      </div>
    </div>
  );
}
