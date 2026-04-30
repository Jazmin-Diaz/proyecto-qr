import { StyleSheet } from "react-native";
import {
  buttonStyles,
  layoutStyles,
  palette,
  radius,
  spacing,
  textStyles,
} from "./sharedStyles";

export const styles = StyleSheet.create({
  container: {
    ...layoutStyles.container,
    backgroundColor: palette.neutral200,
    paddingTop: 60,
    paddingHorizontal: spacing.xl,
  },

  content: {
    ...layoutStyles.container,
    alignItems: "center",
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
    marginBottom: spacing.xxl,
  },
  label: {
    ...textStyles.label,
    color: palette.neutral600,
  },
  resultText: {
    fontSize: 18,
    color: palette.neutral700,
    lineHeight: 24,
  },
  linkButton: {
    ...buttonStyles.primaryButton,
    ...layoutStyles.rowCenter,
    width: "100%",
    padding: 18,
    borderRadius: radius.lg,
    justifyContent: "center",
  },
  linkButtonText: buttonStyles.buttonText,
  linkButtonIcon: {
    marginLeft: spacing.sm,
  },
});
