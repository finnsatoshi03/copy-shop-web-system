import Header from "@/components/header";
import { beverages } from "@/lib/temp";
import { Beverage } from "@/lib/types";
import ItemList from "@/components/admin-menu/item-list";
import PopularItems from "@/components/admin-menu/popular-items";
import { useMemo } from "react";
import CreateNewItemDialog from "@/components/admin-menu/create-new-dialog";

export default function AdminMenu() {
  const beveragesData: Beverage[] = useMemo(() => {
    return beverages.map((beverage) => ({
      ...beverage,
      category: [`${beverage.category} coffee`],
      price: {
        small: beverage.price.small || 0,
        medium: beverage.price.medium || 0,
        large: beverage.price.large || 0,
      },
      calories: {
        small: beverage.calories.small || 0,
        medium: beverage.calories.medium || 0,
        large: beverage.calories.large || 0,
      },
    }));
  }, []);

  const popularItems = useMemo(
    () => beveragesData.filter((beverage) => beverage.isPopular),
    [beveragesData],
  );

  return (
    <div className="space-y-4">
      <Header title="Menu" />
      <div className="grid grid-cols-[1fr_0.4fr] gap-4">
        <ItemList beveragesData={beveragesData} />
        <div className="space-y-4">
          <CreateNewItemDialog />
          <PopularItems popularItems={popularItems} />
        </div>
      </div>
    </div>
  );
}
