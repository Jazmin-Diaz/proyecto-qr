import { API_BASE_URL } from "../config/api";

export type AuthUser = {
  id: string;
  nombre: string;
  correo: string;
};

type AuthResponse = {
  mensaje: string;
  usuario: AuthUser;
};

const parseError = async (response: Response) => {
  try {
    const data = (await response.json()) as { mensaje?: string; error?: string };

    if (data.mensaje && data.mensaje !== "Error al crear el usuario") {
      return data.mensaje;
    }

    return data.error || data.mensaje || "Ocurrio un error inesperado.";
  } catch {
    return "No se pudo procesar la respuesta del servidor.";
  }
};

const request = async (path: string, body: Record<string, string>) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return (await response.json()) as AuthResponse;
};

export const registerUser = async (payload: {
  nombre: string;
  correo: string;
  password: string;
}) => request("/api/usuarios", payload);

export const loginUser = async (payload: {
  correo: string;
  password: string;
}) => request("/api/usuarios/login", payload);
