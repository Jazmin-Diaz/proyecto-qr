import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppColors, AppThemeName } from "../styles/theme";
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useColorScheme as useNativeColorScheme } from "react-native";

const THEME_STORAGE_KEY = "@qr-app/theme";

type ThemeContextValue = {
  colorScheme: AppThemeName;
  colors: (typeof AppColors)[AppThemeName];
  setColorScheme: (theme: AppThemeName) => Promise<void>;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function AppThemeProvider({ children }: PropsWithChildren) {
  const systemScheme = useNativeColorScheme();
  const [selectedTheme, setSelectedTheme] = useState<AppThemeName | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);

        if (
          isMounted &&
          (savedTheme === "light" || savedTheme === "dark")
        ) {
          setSelectedTheme(savedTheme);
        }
      } catch {
        // If storage is unavailable, the app falls back to the system theme.
      }
    };

    loadTheme();

    return () => {
      isMounted = false;
    };
  }, []);

  const colorScheme: AppThemeName =
    selectedTheme ?? (systemScheme === "dark" ? "dark" : "light");

  const value = useMemo<ThemeContextValue>(
    () => ({
      colorScheme,
      colors: AppColors[colorScheme],
      setColorScheme: async (theme) => {
        setSelectedTheme(theme);

        try {
          await AsyncStorage.setItem(THEME_STORAGE_KEY, theme);
        } catch {
          // The selected theme still applies for this session.
        }
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
