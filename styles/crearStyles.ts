import { StyleSheet } from "react-native";
import {
  buttonStyles,
  cardStyles,
  headerStyles,
  layoutStyles,
  radius,
  spacing,
} from "./sharedStyles";

export const styles = StyleSheet.create({
  container: layoutStyles.container,
  loadingContainer: {
    ...layoutStyles.container,
    justifyContent: "center",
  },
  loadingText: {
    textAlign: "center",
  },
  lockedContainer: {
    ...layoutStyles.container,
    justifyContent: "center",
    paddingHorizontal: spacing.lg,
  },
  lockedContent: {
    alignItems: "center",
    gap: spacing.sm,
  },
  lockedTitle: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
  lockedDescription: {
    textAlign: "center",
    lineHeight: 20,
  },
  header: headerStyles.compactHeader,
  backButton: {
    marginRight: 15,
  },
  headerTitle: headerStyles.title,
  card: cardStyles.card,
  cardSectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: spacing.sm,
    textTransform: "none",
  },
  shadow: cardStyles.softShadow,
  inputContainer: {
    borderWidth: 1,
    borderRadius: radius.sm,
    minHeight: 180,
    padding: spacing.md,
    justifyContent: "space-between",
  },
  input: {
    fontSize: 16,
    flex: 1,
    height: 150,
    paddingTop: 0,
    textAlignVertical: "top",
    textTransform: "none",
  },
  charCounter: {
    fontSize: 12,
    textAlign: "right",
    marginTop: spacing.sm,
  },
  button: {
    ...buttonStyles.primaryButton,
    marginHorizontal: spacing.md,
    marginTop: spacing.xl,
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    marginTop: 12,
  },
  buttonText: buttonStyles.buttonText,
  bottomSpacer: {
    height: spacing.section,
  },
});
