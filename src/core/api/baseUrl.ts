const configuredBaseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3003/api";

export const API_BASE_URL = configuredBaseUrl.replace(/\/+$/, "");

export function apiUrl(path: string) {
  return `${API_BASE_URL}/${path.replace(/^\/+/, "")}`;
}
