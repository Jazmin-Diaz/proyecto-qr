import type { QrType } from "../constants/qr";

type QrFormValues = {
  selectedType: QrType;
  link: string;
  text: string;
  wifiName: string;
  wifiPassword: string;
  wifiSecurity: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
};

type QrBuildResult = { value: string } | { error: string };

export const escapeQrField = (value: string) =>
  value.replace(/\\/g, "\\\\").replace(/([;,:])/g, "\\$1").trim();

const normalizeQrTextField = (value: string) => value.trim().replace(/\s+/g, " ");

export const normalizeLink = (value: string) => {
  const trimmedValue = value.trim();

  if (/^https?:\/\//i.test(trimmedValue)) {
    return trimmedValue;
  }

  return `https://${trimmedValue}`;
};

export const buildQrValue = ({
  selectedType,
  link,
  text,
  wifiName,
  wifiPassword,
  wifiSecurity,
  contactName,
  contactPhone,
  contactEmail,
}: QrFormValues): QrBuildResult => {
  if (selectedType === "link") {
    if (!link.trim()) {
      return { error: "Escribe un link primero" };
    }

    return { value: normalizeLink(link) };
  }

  if (selectedType === "text") {
    if (!text.trim()) {
      return { error: "Escribe un texto primero" };
    }

    return { value: text.trim() };
  }

  if (selectedType === "wifi") {
    if (!wifiName.trim()) {
      return { error: "Escribe el nombre de la red WiFi" };
    }

    const security = wifiSecurity === "nopass" ? "nopass" : wifiSecurity;

    if (security !== "nopass" && !wifiPassword.trim()) {
      return { error: "Escribe la contrasena de la red WiFi" };
    }

    return {
      value: [
        "WIFI",
        `Red: ${normalizeQrTextField(wifiName)}`,
        `Seguridad: ${security === "nopass" ? "Sin clave" : security}`,
        security === "nopass"
          ? "Contrasena: Sin clave"
          : `Contrasena: ${normalizeQrTextField(wifiPassword)}`,
      ].join("\n"),
    };
  }

  if (!contactName.trim() && !contactPhone.trim() && !contactEmail.trim()) {
    return { error: "Agrega al menos un dato del contacto" };
  }

  return {
    value: [
      "CONTACTO",
      contactName.trim() ? `Nombre: ${normalizeQrTextField(contactName)}` : "",
      contactPhone.trim() ? `Telefono: ${normalizeQrTextField(contactPhone)}` : "",
      contactEmail.trim() ? `Correo: ${normalizeQrTextField(contactEmail)}` : "",
    ]
      .filter(Boolean)
      .join("\n"),
  };
};
