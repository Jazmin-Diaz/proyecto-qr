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
    padding: 24,
    alignItems: "center",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 4,
  },
  iconWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    textAlign: "center",
  },
  noteTitle: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 8,
  },
  listWrap: {
    width: "100%",
    gap: 10,
  },
  itemRow: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 12,
  },
  itemValue: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
  },
  itemDate: {
    fontSize: 12,
  },
  itemHelp: {
    fontSize: 12,
    fontWeight: "700",
    marginTop: 6,
  },
  clearBtn: {
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 6,
  },
  clearBtnText: {
    fontSize: 13,
    fontWeight: "700",
  },
});
