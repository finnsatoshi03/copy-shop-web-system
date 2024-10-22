import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Order } from "@/lib/types";

export function useWebSocketOrders() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:4000/api/v1/orders");

    socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (Array.isArray(data)) {
          const updatedOrders: Order[] = data;

          queryClient.setQueryData<Order[]>(["orders"], (oldOrders) => {
            if (!oldOrders) return updatedOrders;

            const updatedOrderMap = new Map(
              updatedOrders.map((order) => [order.order_id, order]),
            );

            const mergedOrders = oldOrders.map(
              (order) => updatedOrderMap.get(order.order_id) || order,
            );

            updatedOrders.forEach((order) => {
              if (!mergedOrders.some((o) => o.order_id === order.order_id)) {
                mergedOrders.push(order);
              }
            });

            return mergedOrders;
          });
        } else {
          console.warn(
            "Received invalid order data from WebSocket:",
            event.data,
          );
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      socket.close();
    };
  }, [queryClient]);

  return null;
}
