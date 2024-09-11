import { useState } from "react";
import Header from "@/components/header";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { Filter, FilterButton } from "@/components/admin-orders/filter-button";
import { orders } from "@/lib/temp"; // Import the orders data
import OrderList from "@/components/admin-orders/order-list";

export default function AdminOrders() {
  const [selectedFilter, setSelectedFilter] = useState<Filter>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filters: Filter[] = ["All", "On Progress", "Completed"];

  const filteredOrders = orders.filter((order) => {
    const statusMatch =
      selectedFilter === "All" ||
      (selectedFilter === "On Progress" &&
        order.order_status === "Preparing") ||
      order.order_status === selectedFilter;

    const searchMatch =
      order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.reference_code.toLowerCase().includes(searchTerm.toLowerCase());

    return statusMatch && searchMatch;
  });

  return (
    <div className="space-y-4">
      <Header title="Orders" />

      <div className="flex items-start justify-between">
        <div className="flex gap-2">
          {filters.map((filter) => (
            <FilterButton
              key={filter}
              label={filter}
              isActive={selectedFilter === filter}
              onClick={() => setSelectedFilter(filter)}
            />
          ))}
        </div>

        <PlaceholdersAndVanishInput
          placeholder="Looking for a specific order?"
          onChange={(e) => setSearchTerm(e.target.value)}
          onSubmit={(e) => e.preventDefault()}
          className="max-w-lg rounded-lg border p-2"
        />
      </div>

      <OrderList orders={filteredOrders} />
    </div>
  );
}
