import { StyleSheet } from "react-native";
import {
  buttonStyles,
  inputStyles,
  layoutStyles,
  spacing,
  textStyles,
} from "./sharedStyles";

export const styles = StyleSheet.create({
  container: layoutStyles.container,
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: spacing.lg,
    paddingBottom: spacing.section,
  },
  title: {
    ...textStyles.title,
    textAlign: "center",
  },
  subtitle: {
    ...textStyles.subtitle,
    textAlign: "center",
  },
  input: inputStyles.input,
  inputWrapper: inputStyles.inputWrapper,
  inputWithIcon: inputStyles.inputWithIcon,
  iconButton: buttonStyles.iconButton,
  button: {
    ...buttonStyles.primaryButton,
    paddingHorizontal: spacing.md,
  },
  buttonText: buttonStyles.buttonText,
  linkText: buttonStyles.linkText,
});
