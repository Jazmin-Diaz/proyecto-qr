const DEFAULT_API_BASE_URL = "https://proyecto-qr-backend1.onrender.com";

const removeTrailingSlash = (url: string) => url.replace(/\/+$/, "");

export const API_BASE_URL =
  removeTrailingSlash(
    process.env.EXPO_PUBLIC_API_BASE_URL?.trim() || DEFAULT_API_BASE_URL,
  );
