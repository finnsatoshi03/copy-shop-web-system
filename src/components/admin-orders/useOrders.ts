import { getOrders } from "@/services/apiOrder";
import { useWebSocketOrders } from "@/services/useWebSocketOrders";
import { useQuery } from "@tanstack/react-query";

export function useOrders() {
  const {
    data: orders,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  useWebSocketOrders();

  return { orders, isLoading, error };
}
