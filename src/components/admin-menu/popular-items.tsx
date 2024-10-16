import { Beverage } from "@/lib/types";
import React from "react";

interface PopularItemsProps {
  popularItems: Beverage[];
}

const PopularItems: React.FC<PopularItemsProps> = ({ popularItems }) => {
  return (
    <div className="space-y-4 rounded-lg bg-white px-5 py-4">
      <h1 className="font-label text-lg font-bold">Popular Items</h1>
      <div className="grid grid-cols-[0.1fr_1fr] items-center gap-2 text-xs opacity-50">
        <h2>Rank</h2>
        <h2>Name</h2>
      </div>
      <div className="grid h-[calc(100vh-18.5rem)] grid-cols-[0.1fr_1fr] items-center gap-2 space-y-2 overflow-y-auto">
        {popularItems.map((beverage, index) => (
          <React.Fragment key={index}>
            <p className="flex items-center justify-center text-xs">
              {index + 1 <= 9 ? `0${index + 1}` : index + 1}
            </p>
            <div className="flex h-full gap-2 border-b">
              <img
                src={beverage.beverageImg || "images/placeholder.jpg"}
                className="size-10 rounded-full"
                alt={beverage.name}
              />
              <div>
                <h1 className="line-clamp-2 text-sm">{beverage.name}</h1>
                <p className="text-xs opacity-60">{beverage.category[0]}</p>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default PopularItems;
