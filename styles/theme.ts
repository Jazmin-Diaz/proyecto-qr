import { Platform } from "react-native";

export type AppThemeName = "light" | "dark";

export const AppColors = {
  light: {
    background: "#F4F7FB",
    surface: "#FFFFFF",
    card: "#FFFFFF",
    header: "#FFFFFF",
    input: "#FFFFFF",
    text: "#16202A",
    mutedText: "#73808C",
    subtleText: "#9AA6B2",
    border: "#D9E2EC",
    separator: "#EDF2F7",
    accent: "#00C2E0",
    accentSoft: "#D8F7FC",
    accentContrast: "#FFFFFF",
    icon: "#5B6772",
    tabIconDefault: "#7B8A97",
    tabIconSelected: "#00C2E0",
    shadow: "rgba(15, 23, 42, 0.08)",
    danger: "#EF4444",
  },
  dark: {
    background: "#0B1220",
    surface: "#111827",
    card: "#111827",
    header: "#111827",
    input: "#0F172A",
    text: "#F3F4F6",
    mutedText: "#A8B3C2",
    subtleText: "#7B8796",
    border: "#233047",
    separator: "#1E293B",
    accent: "#22D3EE",
    accentSoft: "#12313C",
    accentContrast: "#081018",
    icon: "#A8B3C2",
    tabIconDefault: "#7B8796",
    tabIconSelected: "#22D3EE",
    shadow: "rgba(0, 0, 0, 0.35)",
    danger: "#F87171",
  },
} as const;

export const Colors = {
  light: {
    text: AppColors.light.text,
    background: AppColors.light.background,
    tint: AppColors.light.accent,
    icon: AppColors.light.icon,
    tabIconDefault: AppColors.light.tabIconDefault,
    tabIconSelected: AppColors.light.tabIconSelected,
    card: AppColors.light.card,
    border: AppColors.light.border,
    notification: AppColors.light.accent,
  },
  dark: {
    text: AppColors.dark.text,
    background: AppColors.dark.background,
    tint: AppColors.dark.accent,
    icon: AppColors.dark.icon,
    tabIconDefault: AppColors.dark.tabIconDefault,
    tabIconSelected: AppColors.dark.tabIconSelected,
    card: AppColors.dark.card,
    border: AppColors.dark.border,
    notification: AppColors.dark.accent,
  },
} as const;

export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
