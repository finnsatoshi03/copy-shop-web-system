import { useState } from "react";
import Header from "@/components/header";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { Filter, FilterButton } from "@/components/admin-orders/filter-button";
import { orders } from "@/lib/temp";
import OrderList from "@/components/admin-orders/order-list";

export default function AdminOrders() {
  const [selectedFilter, setSelectedFilter] = useState<Filter>("On Progress");
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

  const orderCountDescription = (() => {
    const orderCount = filteredOrders.length;
    const filterDescription =
      selectedFilter === "All"
        ? "all orders"
        : selectedFilter === "On Progress"
          ? "orders in progress"
          : "completed orders";

    if (orderCount === 0) {
      return `No ${filterDescription}`;
    } else if (orderCount === 1) {
      return `1 ${filterDescription.slice(0, -1)}`;
    } else {
      return `${orderCount} ${filterDescription}`;
    }
  })();

  return (
    <div className="space-y-4">
      <Header title="Orders" />

      <div className="flex items-start justify-between">
        <div>
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
          <p className="mt-2 text-xs opacity-60">{orderCountDescription}</p>
        </div>

        <PlaceholdersAndVanishInput
          placeholder="Looking for a specific order?"
          onChange={(e) => setSearchTerm(e.target.value)}
          onSubmit={(e) => e.preventDefault()}
          className="max-w-lg rounded-lg border p-2"
        />
      </div>

      <div className="h-[calc(100vh-13rem)] space-y-2 overflow-y-auto pr-3">
        <OrderList orders={filteredOrders} />
      </div>
    </div>
  );
}
