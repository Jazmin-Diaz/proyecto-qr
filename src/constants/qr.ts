import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";

export type QrType = "link" | "text" | "wifi" | "contact";
export type QrIconName = ComponentProps<typeof Ionicons>["name"];

export const QR_MAX_CHARACTERS = 150;

export const QR_TYPES: {
  id: QrType;
  label: string;
  icon: QrIconName;
}[] = [
  { id: "link", label: "Link", icon: "link-outline" },
  { id: "text", label: "Texto", icon: "document-text-outline" },
  { id: "wifi", label: "WiFi", icon: "wifi-outline" },
  { id: "contact", label: "Contacto", icon: "person-outline" },
];
