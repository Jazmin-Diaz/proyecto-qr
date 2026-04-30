import { StyleSheet } from "react-native";

export const appHeaderStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 18,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
  },
  backButton: {
    marginRight: 10,
    padding: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
});
