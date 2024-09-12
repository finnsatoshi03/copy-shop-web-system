import { Beverage } from "@/lib/types";
import { API_URL } from "./service";

import axios from "axios";

export async function getBeverages(): Promise<Beverage[]> {
  const response = await axios.get(`${API_URL}/beverages`);

  console.log(response.data);

  return response.data;
}
