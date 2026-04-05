import apiClient from "../lib/apiClient";

export async function register(payload) {
  const { data } = await apiClient.post("auth/register", payload);
  return data;
}

export async function login(credentials) {
  const { data } = await apiClient.post("auth/login", credentials);
  return data;
}

export async function getMe() {
  const { data } = await apiClient.get("users/me");
  return data;
}

export async function getUserById(userId) {
  const { data } = await apiClient.get(`users/${userId}`);
  return data;
}
