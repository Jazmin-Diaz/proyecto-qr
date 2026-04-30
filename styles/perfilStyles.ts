import { StyleSheet } from "react-native";
import { layoutStyles, palette, radius, spacing, textStyles } from "./sharedStyles";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: palette.neutral150 },
  header: {
    alignItems: "center",
    paddingVertical: 50,
    backgroundColor: palette.white,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 2,
    shadowColor: palette.black,
    shadowOpacity: 0.05,
  },
  avatarPlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: palette.accent,
    ...layoutStyles.contentCentered,
    marginBottom: spacing.md,
  },
  userName: { fontSize: 22, fontWeight: "bold", color: palette.neutral700 },
  userEmail: { fontSize: 14, color: palette.neutral500, marginTop: 4 },
  menuContainer: { padding: spacing.lg },
  sectionLabel: {
    ...textStyles.label,
    color: palette.neutral600,
    marginLeft: 5,
  },
  card: {
    backgroundColor: palette.white,
    borderRadius: radius.lg,
    marginBottom: spacing.xl,
    overflow: "hidden",
    elevation: 1,
  },
  optionRow: { ...layoutStyles.rowBetween, padding: 16 },
  optionLeft: layoutStyles.rowCenter,
  iconFixed: { width: 30 },
  optionTitle: { fontSize: 16, fontWeight: "500", marginLeft: 10 },
  separator: { height: 1, backgroundColor: palette.neutral300, marginLeft: 50 },
  versionText: {
    textAlign: "center",
    color: "#BBB",
    marginBottom: 30,
    fontSize: 12,
  },
});
