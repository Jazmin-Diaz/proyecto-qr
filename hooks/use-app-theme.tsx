import { AppColors, AppThemeName } from "../styles/theme";
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";
import { useColorScheme as useNativeColorScheme } from "react-native";

type ThemeContextValue = {
  colorScheme: AppThemeName;
  colors: (typeof AppColors)[AppThemeName];
  setColorScheme: (theme: AppThemeName) => Promise<void>;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function AppThemeProvider({ children }: PropsWithChildren) {
  const systemScheme = useNativeColorScheme();
  const [selectedTheme, setSelectedTheme] = useState<AppThemeName | null>(null);

  const colorScheme: AppThemeName =
    selectedTheme ?? (systemScheme === "dark" ? "dark" : "light");

  const value = useMemo<ThemeContextValue>(
    () => ({
      colorScheme,
      colors: AppColors[colorScheme],
      setColorScheme: async (theme) => {
        setSelectedTheme(theme);
      },
    }),
    [colorScheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useAppTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useAppTheme must be used inside AppThemeProvider");
  }

  return context;
}

export function useAppColorScheme(): AppThemeName {
  const systemScheme = useNativeColorScheme();
  const context = useContext(ThemeContext);

  return context?.colorScheme ?? (systemScheme === "dark" ? "dark" : "light");
}
