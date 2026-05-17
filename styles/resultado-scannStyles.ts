import { StyleSheet } from "react-native";
import {
  appTextStyle,
  buttonStyles,
  layoutStyles,
  palette,
  radius,
  spacing,
} from "./sharedStyles";

export const styles = StyleSheet.create({
  container: layoutStyles.container,
  scrollContent: {
    paddingBottom: spacing.section,
  },
  content: {
    alignItems: "center",
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxl,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: palette.white,
    ...layoutStyles.contentCentered,
    marginBottom: spacing.xxl,
    elevation: 3,
    shadowColor: palette.black,
    shadowOpacity: 0.1,
  },
  card: {
    backgroundColor: palette.white,
    borderRadius: radius.xl,
    padding: spacing.xl,
    width: "100%",
    elevation: 2,
    shadowColor: palette.black,
    shadowOpacity: 0.05,
    marginBottom: spacing.xl,
  },
  cardTitle: {
    ...appTextStyle,
    fontSize: 20,
    fontWeight: "700",
    marginBottom: spacing.sm,
  },
  fieldsContainer: {
    alignSelf: "stretch",
  },
  fieldRow: {
    borderBottomWidth: 1,
    paddingVertical: spacing.sm,
    gap: spacing.xs,
  },
  fieldLabel: {
    ...appTextStyle,
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  fieldValue: {
    ...appTextStyle,
    fontSize: 15,
    lineHeight: 22,
  },
  actionButton: {
    ...layoutStyles.rowCenter,
    width: "100%",
    padding: 18,
    borderRadius: radius.lg,
    borderWidth: 1.5,
    justifyContent: "center",
  },
  actionText: {
    ...buttonStyles.buttonText,
    fontSize: 16,
  },
  secondaryButton: {
    ...layoutStyles.rowCenter,
    width: "100%",
    padding: 18,
    borderRadius: radius.lg,
    borderWidth: 1.5,
    justifyContent: "center",
    marginTop: spacing.md,
  },
  secondaryActionText: {
    ...buttonStyles.buttonText,
    fontSize: 16,
  },
  bottomSpacer: {
    height: spacing.section,
  },
});
