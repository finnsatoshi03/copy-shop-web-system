import { Flame } from "lucide-react";
import { Button } from "./ui/button";
import { Beverage } from "@/lib/types";

export default function Card({
  data,
  onList,
  onDetails,
}: {
  data: Beverage;
  onList?: boolean;
  onDetails?: (order: Beverage) => void;
}) {
  return (
    <div className="grid h-full grid-rows-[auto_1fr_auto] rounded-lg border p-2">
      {data.isPopular && (
        <div
          className={`absolute ${onList ? "top-5" : "top-8"} rounded-br-lg bg-red-700 px-2 py-0.5 text-xs text-white`}
        >
          <Flame size={12} />
        </div>
      )}
      {data.beverageImg ? (
        <img
          src={data.beverageImg}
          className="w-full rounded-lg"
          alt={data.name}
        />
      ) : (
        <div className="flex h-44 w-full items-center justify-center rounded-lg bg-gray-100 md:h-32 lg:h-44">
          <span className="text-gray-500">No image available</span>
        </div>
      )}
      <div className="flex h-full flex-col justify-between">
        <h1 className="mb-2 mt-4 line-clamp-2 font-label text-xs font-semibold md:text-sm">
          {data.name}
        </h1>
        <div className="mb-2 flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <p className="font-label text-xs">Medium: ₱{data.price.medium}</p>
          <p className="font-label text-xs opacity-60">
            {data.calories.medium} cal
          </p>
        </div>
      </div>
      <Button
        className="h-fit w-full border border-green-100 bg-green-100 text-xs text-black shadow-none hover:border-gray-200 hover:bg-transparent"
        onClick={() => onDetails?.(data)}
      >
        Add to Cart
      </Button>
    </div>
  );
}
