import Header from "@/components/header";
// import { beverages } from "@/lib/temp";
import { Beverage } from "@/lib/types";
import ItemList from "@/components/admin-menu/item-list";
import PopularItems from "@/components/admin-menu/popular-items";
import { useMemo, useState } from "react";
import CreateNewItemForm from "@/components/admin-menu/create-new-item-form";
import { useBeverages } from "@/hooks/beverages/useBeverages";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function AdminMenu() {
  const { beverages, isLoading, error } = useBeverages();
  const [isOpen, setIsOpen] = useState(false);

  const beveragesData: Beverage[] = useMemo(
    () =>
      beverages
        ? beverages.map((beverage: Beverage) => ({
            ...beverage,
            category: [`${beverage.category}`],
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
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="flex h-fit w-full items-center gap-2 bg-yellow-500 py-3 uppercase text-black hover:bg-yellow-400">
                <Plus size={20} />
                Create New Item
              </Button>
            </DialogTrigger>
            <DialogContent className="min-w-[90vw]">
              <DialogHeader>
                <DialogTitle>Create New Item</DialogTitle>
                <DialogDescription>
                  Fill in the details for the new item and click save when
                  you're done.
                </DialogDescription>
              </DialogHeader>
              <CreateNewItemForm onClose={() => setIsOpen(false)} />
            </DialogContent>
          </Dialog>
          <PopularItems popularItems={popularItems} />
        </div>
      </div>
    </div>
  );
}
