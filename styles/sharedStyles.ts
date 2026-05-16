import { Platform, type TextStyle, type ViewStyle } from "react-native";

export const appFontFamily = Platform.select({
  ios: "ArialMT",
  android: "Roboto",
  web: "Arial, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, sans-serif",
  default: undefined,
});

export const appTextStyle = {
  ...(appFontFamily ? { fontFamily: appFontFamily } : {}),
} as TextStyle;

export const palette = {
  accent: "#00C2E0",
  white: "#FFFFFF",
  black: "#000000",
  neutral100: "#FBFBFB",
  neutral150: "#F8F9FA",
  neutral200: "#F5F6F8",
  neutral300: "#F0F0F0",
  neutral500: "#888888",
  neutral600: "#AAAAAA",
  neutral700: "#333333",
  neutral900: "#1A1A1A",
  borderDefault: "#CCCCCC",
};

export const radius = {
  sm: 10,
  md: 12,
  lg: 15,
  xl: 20,
  xxl: 25,
  round: 999,
};

export const spacing = {
  xs: 5,
  sm: 10,
  md: 15,
  lg: 20,
  xl: 25,
  xxl: 30,
  section: 40,
};

export const layoutStyles = {
  container: { flex: 1 } as ViewStyle,
  centered: { flex: 1, justifyContent: "center", alignItems: "center" } as ViewStyle,
  contentCentered: { justifyContent: "center", alignItems: "center" } as ViewStyle,
  rowCenter: { flexDirection: "row", alignItems: "center" } as ViewStyle,
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  } as ViewStyle,
};

export const headerStyles = {
  screenHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
  } as ViewStyle,
  compactHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
  } as ViewStyle,
  backButton: { padding: spacing.xs } as ViewStyle,
  backButtonSpaced: { padding: spacing.xs, marginRight: spacing.sm } as ViewStyle,
  title: { ...appTextStyle, fontSize: 20, fontWeight: "700" } as TextStyle,
};

export const cardStyles = {
  card: {
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
  } as ViewStyle,
  elevatedCard: {
    borderRadius: radius.xl,
    padding: spacing.xl,
    elevation: 3,
  } as ViewStyle,
  softShadow: {
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  } as ViewStyle,
};

export const inputStyles = {
  input: {
    ...appTextStyle,
    borderWidth: 1,
    borderColor: palette.borderDefault,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: radius.sm,
    marginBottom: spacing.md,
    fontSize: 16,
  } as TextStyle,
  inputWrapper: {
    borderWidth: 1,
    borderColor: palette.borderDefault,
    borderRadius: radius.sm,
    marginBottom: spacing.md,
    flexDirection: "row",
    alignItems: "center",
  } as ViewStyle,
  inputWithIcon: {
    ...appTextStyle,
    flex: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  } as TextStyle,
};

export const buttonStyles = {
  primaryButton: {
    backgroundColor: palette.accent,
    paddingVertical: 18,
    borderRadius: radius.md,
    alignItems: "center",
  } as ViewStyle,
  roundedActionButton: {
    backgroundColor: palette.accent,
    paddingVertical: 14,
    paddingHorizontal: spacing.section,
    borderRadius: radius.xxl,
    flexDirection: "row",
    alignItems: "center",
  } as ViewStyle,
  buttonText: {
    ...appTextStyle,
    color: palette.white,
    fontWeight: "bold",
    fontSize: 16,
  } as TextStyle,
  iconButton: {
    paddingHorizontal: 12,
    paddingVertical: spacing.sm,
  } as ViewStyle,
  linkText: {
    marginTop: 18,
    textAlign: "center",
    fontWeight: "600",
  } as TextStyle,
};

export const textStyles = {
  title: { ...appTextStyle, fontSize: 22, fontWeight: "bold", marginBottom: 8 } as TextStyle,
  subtitle: { ...appTextStyle, fontSize: 14, lineHeight: 20, marginBottom: 24 } as TextStyle,
  label: {
    ...appTextStyle,
    fontSize: 12,
    fontWeight: "800",
    marginBottom: 10,
    letterSpacing: 1,
  } as TextStyle,
  mutedText: { ...appTextStyle, fontSize: 14, color: palette.neutral500 } as TextStyle,
};
