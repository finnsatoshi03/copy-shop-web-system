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
