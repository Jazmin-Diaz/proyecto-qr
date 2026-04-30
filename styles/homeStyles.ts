import { StyleSheet } from "react-native";
import { buttonStyles, layoutStyles, palette, radius, spacing } from "./sharedStyles";

export const styles = StyleSheet.create({
  container: {
    ...layoutStyles.container,
    backgroundColor: palette.neutral100,
    paddingBottom: spacing.section,
  },
  headerCornerContainer: {
    paddingTop: 65,
    paddingHorizontal: spacing.xl,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  titleIcon: {
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "900",
    color: palette.neutral900,
    letterSpacing: -1,
  },
  mainContent: {
    ...layoutStyles.centered,
  },
  cameraContainer: {
    width: "88%",
    height: 380,
    borderRadius: spacing.section,
    overflow: "hidden",
    backgroundColor: palette.black,
    elevation: 15,
    shadowColor: palette.black,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
  },
  camera: { ...StyleSheet.absoluteFillObject },
  centerFrameContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  corner: {
    position: "absolute",
    width: 35,
    height: 35,
    borderColor: palette.accent,
  },
  cornerTopLeft: {
    top: "23%",
    left: "12%",
    borderTopWidth: 5,
    borderLeftWidth: 5,
    borderTopLeftRadius: 15,
  },
  cornerTopRight: {
    top: "23%",
    right: "12%",
    borderTopWidth: 5,
    borderRightWidth: 5,
    borderTopRightRadius: 15,
  },
  cornerBottomLeft: {
    bottom: "23%",
    left: "12%",
    borderBottomWidth: 5,
    borderLeftWidth: 5,
    borderBottomLeftRadius: 15,
  },
  cornerBottomRight: {
    bottom: "23%",
    right: "12%",
    borderBottomWidth: 5,
    borderRightWidth: 5,
    borderBottomRightRadius: 15,
  },
  laserLine: {
    width: 200,
    height: 3,
    backgroundColor: palette.accent,
    borderRadius: 2,
    shadowColor: palette.accent,
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  footerContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: spacing.lg,
  },
  scanButton: {
    ...buttonStyles.roundedActionButton,
    elevation: 4,
  },
  buttonText: {
    ...buttonStyles.buttonText,
    fontWeight: "800",
  },
  center: layoutStyles.centered,
  permissionButton: {
    padding: 15,
    backgroundColor: palette.accent,
    borderRadius: radius.md,
  },
  permissionText: {
    color: palette.white,
  },
});
