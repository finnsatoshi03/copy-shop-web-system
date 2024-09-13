import { Beverage } from "@/lib/types";
import { API_URL } from "./service";

import axios from "axios";

export async function getBeverages(): Promise<Beverage[]> {
  const response = await axios.get(`${API_URL}/beverages`);

  return response.data;
}

export async function createBeverage(
  beverage: Partial<Beverage>,
): Promise<Beverage> {
  const response = await axios.post(`${API_URL}/beverages`, beverage);

  return response.data;
}

export async function updateBeverage(
  beverageId: number,
  beverage: Partial<Beverage>,
): Promise<Beverage> {
  const response = await axios.put(
    `${API_URL}/beverages/${beverageId}`,
    beverage,
  );

  return response.data;
}

export async function deleteBeverage(beverageId: number): Promise<void> {
  await axios.delete(`${API_URL}/beverages/${beverageId}`);
}
