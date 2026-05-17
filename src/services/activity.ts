import { API_BASE_URL } from "../config/api";
import { getSessionToken } from "../storage/session";

export type ActivityKind = "generated" | "scanned";

export type ActivityItem = {
  id: string;
  value: string;
  tipo?: ActivityKind;
  createdAt: string;
  updatedAt?: string;
};

const parseError = async (response: Response) => {
  try {
    const data = (await response.json()) as { mensaje?: string; error?: string };
    return data.error || data.mensaje || "Ocurrio un error inesperado.";
  } catch {
    return "No se pudo procesar la respuesta del servidor.";
  }
};

const request = async <T>(
  path: string,
  options?: RequestInit,
): Promise<T> => {
  const token = await getSessionToken();
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return (await response.json()) as T;
};

export const getActivityItems = async (
  userId: string,
  kind: ActivityKind,
) => request<ActivityItem[]>(`/api/historial/${userId}?tipo=${kind}`);

export const addActivityItem = async (
  userId: string,
  kind: ActivityKind,
  value: string,
) =>
  request<{ mensaje: string; item: ActivityItem }>("/api/historial", {
    method: "POST",
    body: JSON.stringify({
      usuarioId: userId,
      tipo: kind,
      valor: value,
    }),
  });

export const clearActivityItems = async (
  userId: string,
  kind: ActivityKind,
) =>
  request<{ mensaje: string }>(`/api/historial/${userId}/${kind}`, {
    method: "DELETE",
  });
