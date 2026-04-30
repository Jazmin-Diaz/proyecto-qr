import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import { Colors } from "../styles/theme";
import { AppThemeProvider } from "../hooks/use-app-theme";
import { useColorScheme } from "../hooks/use-color-scheme";

function RootNavigator() {
  const colorScheme = useColorScheme();

  const customDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: Colors.dark.tint,
      background: Colors.dark.background,
      card: Colors.dark.card,
      border: Colors.dark.border,
      text: Colors.dark.text,
      notification: Colors.dark.notification,
    },
  };

  const customLightTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: Colors.light.tint,
      background: Colors.light.background,
      card: Colors.light.card,
      border: Colors.light.border,
      text: Colors.light.text,
      notification: Colors.light.notification,
    },
  };

  return (
    <ThemeProvider
      value={colorScheme === "dark" ? customDarkTheme : customLightTheme}
    >
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="historial-generados" />
        <Stack.Screen name="historial-escaneos" />
        <Stack.Screen name="settings" />
        <Stack.Screen name="resultado" />
        <Stack.Screen name="resultado-scann" />
        <Stack.Screen name="register" />
        <Stack.Screen name="login" />
      </Stack>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <AppThemeProvider>
      <RootNavigator />
    </AppThemeProvider>
  );
}
