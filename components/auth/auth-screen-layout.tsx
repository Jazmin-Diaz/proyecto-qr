import { PropsWithChildren } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
} from "react-native";
import type { AppColors, AppThemeName } from "../../styles/theme";
import { styles } from "../../styles/registerStyles";

type AuthScreenLayoutProps = PropsWithChildren<{
  title: string;
  subtitle: string;
  colors: (typeof AppColors)[AppThemeName];
}>;

export function AuthScreenLayout({
  title,
  subtitle,
  colors,
  children,
}: AuthScreenLayoutProps) {
  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.subtitle, { color: colors.mutedText }]}>
          {subtitle}
        </Text>

        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
