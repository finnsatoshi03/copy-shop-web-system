import { Button } from "./ui/button";

export default function Card() {
  return (
    <div className="rounded-xl border p-3">
      <img
        src="https://globalassets.starbucks.com/digitalassets/products/bev/SBX20211029_SaltedCaramelCreamColdBrew.jpg?impolicy=1by1_wide_topcrop_630"
        className="w-full rounded-lg"
      />
      <h1 className="font-label mb-2 mt-4 text-sm font-semibold">
        Sample Name of the Food
      </h1>
      <div className="mb-2 flex items-center justify-between">
        <p className="font-label text-xs">Price</p>
        <p className="font-label text-xs opacity-60">Cal</p>
      </div>
      <Button className="h-fit w-full border border-green-100 bg-green-100 text-xs text-black shadow-none hover:border-gray-200 hover:bg-transparent">
        Add to Cart
      </Button>
    </div>
  );
}
