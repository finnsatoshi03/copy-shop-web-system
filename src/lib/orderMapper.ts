import { Order, OrderSubmission } from "@/lib/types";

export function convertOrderToSubmission(order: Order): OrderSubmission {
  return {
    order: {
      payment_type: order.payment_type,
      customer_name: order.customer_name,
      customer_msg: order.customer_msg,
      total_amt: order.total_amt,
      order_type: order.order_type,
    },
    order_items: order.items.map((item) => ({
      beverage_id: item["Beverage ID"],
      sugar_level: parseInt(item["Sugar Level"]) || 0,
      size: item.Size,
      price: parseFloat(item.Price),
      quantity: parseInt(item.Quantity),
      total: parseFloat(item["Total Price"]),
    })),
    id: order.order_id,
  };
}

export function convertSubmissionToOrder(
  orderSubmission: OrderSubmission,
): Partial<Order> {
  return {
    customer_name: orderSubmission.order.customer_name,
    payment_type: orderSubmission.order.payment_type,
    customer_msg: orderSubmission.order.customer_msg,
    total_amt: orderSubmission.order.total_amt,
    order_type: orderSubmission.order.order_type,
    items: orderSubmission.order_items.map((item) => ({
      "Beverage ID": item.beverage_id,
      Name: "",
      Description: "",
      "Sugar Level": item.sugar_level.toString(),
      Size: item.size,
      Price: item.price.toString(),
      Quantity: item.quantity.toString(),
      "Total Price": item.total.toString(),
    })),
  };
}
