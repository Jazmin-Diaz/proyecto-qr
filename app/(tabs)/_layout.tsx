import { Colors } from "../../styles/theme";
import { useAppTheme } from "../../hooks/use-app-theme";
import { useColorScheme } from "../../hooks/use-color-scheme";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { colors } = useAppTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarInactiveTintColor: colors.tabIconDefault,
        headerShown: false,
        tabBarLabelStyle: {
          fontWeight: "900",
          fontSize: 11,
          marginBottom: 4,
        },
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color }) => (
            <Ionicons size={24} name="home" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="crear"
        options={{
          title: "",
          tabBarLabel: () => null,
          tabBarIcon: ({ color }) => (
            <Ionicons name="add-circle" size={30} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="perfil"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => (
            <Ionicons size={24} name="person" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
