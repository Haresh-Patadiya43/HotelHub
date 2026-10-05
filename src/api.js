const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();

if (import.meta.env.PROD && !configuredApiUrl) {
  throw new Error("VITE_API_URL must be set to the backend's public URL.");
}

export const API_BASE_URL = (
  configuredApiUrl || "http://localhost:5000"
).replace(/\/+$/, "");

export const apiUrl = (path) =>
  `${API_BASE_URL}/${path.replace(/^\/+/, "")}`;
