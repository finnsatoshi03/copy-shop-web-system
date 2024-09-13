import axios from "axios";
import { API_URL } from "./service";

export async function login({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  const response = await axios.post(`${API_URL}/login`, {
    username,
    password,
  });

  if (response.status !== 200) {
    throw new Error(response.statusText);
  }

  const { token } = response.data;
  if (token) {
    localStorage.setItem("jwtToken", token);
  }

  return response.data;
}

export function getToken() {
  return localStorage.getItem("jwtToken");
}

export function removeToken() {
  localStorage.removeItem("jwtToken");
}

axios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
