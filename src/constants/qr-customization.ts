import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";

export type QrLogoId = "none" | "business" | "storefront" | "wifi" | "person";
export type QrLogoIconName = ComponentProps<typeof Ionicons>["name"];

export const QR_COLOR_OPTIONS = [
  { label: "Negro", value: "#000000" },
  { label: "Azul", value: "#0F5BFF" },
  { label: "Turquesa", value: "#00AFCB" },
  { label: "Verde", value: "#168A4A" },
  { label: "Morado", value: "#6B3FD6" },
];

export const QR_BACKGROUND_OPTIONS = [
  { label: "Blanco", value: "#FFFFFF" },
  { label: "Azul claro", value: "#EAF4FF" },
  { label: "Menta", value: "#E9FFF5" },
  { label: "Lila", value: "#F1ECFF" },
];

export const QR_LOGO_OPTIONS: {
  id: QrLogoId;
  label: string;
  icon: QrLogoIconName;
}[] = [
  { id: "none", label: "Sin logo", icon: "ban-outline" },
  { id: "business", label: "Empresa", icon: "business-outline" },
  { id: "storefront", label: "Tienda", icon: "storefront-outline" },
  { id: "wifi", label: "WiFi", icon: "wifi-outline" },
  { id: "person", label: "Contacto", icon: "person-outline" },
];

export const DEFAULT_QR_COLOR = QR_COLOR_OPTIONS[0].value;
export const DEFAULT_QR_BACKGROUND = QR_BACKGROUND_OPTIONS[0].value;
export const DEFAULT_QR_LOGO: QrLogoId = "none";

export const getSafeQrColor = (value?: string) =>
  QR_COLOR_OPTIONS.some((option) => option.value === value)
    ? value
    : DEFAULT_QR_COLOR;

export const getSafeQrBackground = (value?: string) =>
  QR_BACKGROUND_OPTIONS.some((option) => option.value === value)
    ? value
    : DEFAULT_QR_BACKGROUND;

export const getSafeQrLogo = (value?: string): QrLogoId =>
  QR_LOGO_OPTIONS.some((option) => option.id === value)
    ? (value as QrLogoId)
    : DEFAULT_QR_LOGO;

export const getQrLogoIcon = (logo: QrLogoId) =>
  QR_LOGO_OPTIONS.find((option) => option.id === logo)?.icon ?? "ban-outline";
