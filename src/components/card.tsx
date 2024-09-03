/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "./ui/button";

export default function Card({ data }: { data: any }) {
  return (
    <div className="grid h-full grid-rows-[auto_1fr_auto] rounded-lg border p-2">
      <img src={data.image} className="w-full rounded-lg" alt={data.name} />
      <div className="flex h-full flex-col justify-between">
        <h1 className="mb-2 mt-4 line-clamp-2 font-label text-xs font-semibold md:text-sm">
          {data.name}
        </h1>
        <div className="mb-2 flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <p className="font-label text-xs">Medium: ${data.price.medium}</p>
          <p className="font-label text-xs opacity-60">
            {data.calories.medium} cal
          </p>
        </div>
      </div>
      <Button className="h-fit w-full border border-green-100 bg-green-100 text-xs text-black shadow-none hover:border-gray-200 hover:bg-transparent">
        Add to Cart
      </Button>
    </div>
  );
}
