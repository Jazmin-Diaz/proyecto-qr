import { StyleSheet } from "react-native";

export const appCardStyles = StyleSheet.create({
  simple: {
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 15,
    marginTop: 15,
  },
  elevated: {
    borderRadius: 22,
    padding: 24,
    marginHorizontal: 16,
    marginTop: 20,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 4,
  },
});
