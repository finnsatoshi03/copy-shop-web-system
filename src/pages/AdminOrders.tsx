import { useState } from "react";
import Header from "@/components/header";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { Filter, FilterButton } from "@/components/admin-orders/filter-button";
import OrderList from "@/components/admin-orders/order-list";
import { useOrders } from "@/components/admin-orders/useOrders";
import { Order } from "@/lib/types";

export default function AdminOrders() {
  const { orders, isLoading, error } = useOrders();

  const [selectedFilter, setSelectedFilter] = useState<Filter>("On Progress");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filters: Filter[] = ["All", "On Progress", "Completed"];

  const filteredOrders = orders
    ? orders.filter((order: Order) => {
        if (!order) return false;

        const statusMatch =
          selectedFilter === "All" ||
          (selectedFilter === "On Progress" &&
            (order.order_status === "Preparing" ||
              order.order_status === "Ready for Pickup")) ||
          (selectedFilter === "Completed" &&
            (order.order_status === "Completed" ||
              order.order_status === "Served")) ||
          order.order_status === selectedFilter;

        const searchMatch =
          (order.customer_name &&
            order.customer_name
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (order.reference_code &&
            order.reference_code
              .toLowerCase()
              .includes(searchTerm.toLowerCase()));

        return statusMatch && searchMatch;
      })
    : [];

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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="space-y-4">
      <Header title="Orders" />

      <div className="flex flex-col-reverse items-start gap-2 lg:flex-row lg:justify-between lg:gap-0">
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
