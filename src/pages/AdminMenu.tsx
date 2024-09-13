import Header from "@/components/header";
// import { beverages } from "@/lib/temp";
import { Beverage } from "@/lib/types";
import ItemList from "@/components/admin-menu/item-list";
import PopularItems from "@/components/admin-menu/popular-items";
import { useMemo } from "react";
import CreateNewItemDialog from "@/components/admin-menu/create-new-dialog";
import { useBeverages } from "@/hooks/beverages/useBeverages";

export default function AdminMenu() {
  const { beverages, isLoading, error } = useBeverages();

  const beveragesData: Beverage[] = useMemo(
    () =>
      beverages
        ? beverages.map((beverage: Beverage) => ({
            ...beverage,
            category: [`${beverage.category} coffee`],
            price: {
              ...beverage.price,
              small: beverage.price.small || 0,
              medium: beverage.price.medium || 0,
              large: beverage.price.large || 0,
            },
            calories: {
              ...beverage.calories,
              small: beverage.calories.small || 0,
              medium: beverage.calories.medium || 0,
              large: beverage.calories.large || 0,
            },
          }))
        : [],
    [beverages],
  );

  const popularItems = useMemo(
    () => beveragesData.filter((beverage) => beverage.isPopular),
    [beveragesData],
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="space-y-4">
      <Header title="Menu" />
      <div className="grid grid-cols-1 gap-4 overflow-y-auto md:grid-cols-[1fr_0.4fr]">
        <ItemList beveragesData={beveragesData} />
        <div className="space-y-4">
          <CreateNewItemDialog />
          <PopularItems popularItems={popularItems} />
        </div>
      </div>
    </div>
  );
}
