import { StyleSheet } from "react-native";
import { buttonStyles, layoutStyles, palette, radius, spacing } from "./sharedStyles";

export const styles = StyleSheet.create({
  container: layoutStyles.container,
  header: {
    ...layoutStyles.rowCenter,
    paddingTop: 60,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
  },
  backButton: { padding: 5 },
  headerTitle: { fontSize: 22, fontWeight: "bold", marginLeft: 10 },
  mainCard: {
    margin: spacing.lg,
    borderRadius: radius.xxl,
    padding: spacing.xxl,
    alignItems: "center",
    shadowColor: palette.black,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  qrWrapper: {
    padding: spacing.lg,
    backgroundColor: palette.white,
    borderRadius: radius.xl,
    marginBottom: spacing.lg,
  },
  captureWrapper: {
    backgroundColor: palette.white,
    borderRadius: radius.xl,
  },
  qrTitle: { fontSize: 20, fontWeight: "bold", marginTop: 15, marginBottom: 8 },
  qrValue: { fontSize: 15, textAlign: "center", lineHeight: 22 },
  actionsContainer: { paddingHorizontal: spacing.lg, gap: spacing.md },
  actionButton: {
    ...layoutStyles.rowCenter,
    padding: 18,
    borderRadius: radius.lg,
    gap: 12,
    justifyContent: "center",
  },
  btnPrimary: {
    backgroundColor: palette.accent,
    borderWidth: 1.5,
  },
  btnTextPrimary: buttonStyles.buttonText,
  btnOutline: {
    borderWidth: 1.5,
  },
  actionText: { fontSize: 16 },
  btnTextOutline: { fontWeight: "700", fontSize: 16 },
  bottomSpacer: { height: spacing.section },
});
