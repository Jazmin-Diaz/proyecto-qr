import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: 40,
  },
  card: {
    marginHorizontal: 16,
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 22,
    padding: 20,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 4,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 20,
  },
  options: {
    gap: 14,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  optionText: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
});
