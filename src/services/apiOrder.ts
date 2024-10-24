import { OrderSubmission } from "@/lib/types";
import axios from "axios";
import { API_URL } from "./service";

export async function createOrder(order: OrderSubmission) {
  const response = await axios.post(`${API_URL}/order`, order);

  return response.data;
}

export async function getOrders() {
  const response = await axios.get(`${API_URL}/orders`);

  return response.data.orders;
}

export async function updateOrderStatus(status: string, order_id: number) {
  const response = await axios.post(`${API_URL}/update/order`, {
    status,
    order_id,
  });
  return response.data;
}

export async function updatePaymentStatus(paymentId: number) {
  const response = await axios.put(`${API_URL}/confirm`, { paymentId });
  return response.data;
}

export async function deleteOrder(order_id: number) {
  const response = await axios.post(`${API_URL}/order/void/${order_id}`);
  return response.data;
}
