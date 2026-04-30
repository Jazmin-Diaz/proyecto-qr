import { Ionicons } from "@expo/vector-icons";
import { Pressable, ScrollView, Text, View } from "react-native";
import { AppHeader } from "../components/app-header";
import { useAppTheme } from "../hooks/use-app-theme";
import { styles } from "../styles/settingsStyles";

const themeOptions = [
  {
    key: "light" as const,
    title: "Tema claro",
    description: "Interfaz luminosa para espacios bien iluminados.",
    icon: "sunny-outline" as const,
  },
  {
    key: "dark" as const,
    title: "Tema oscuro",
    description: "Reduce el brillo y mejora el contraste nocturno.",
    icon: "moon-outline" as const,
  },
];

export default function SettingsScreen() {
  const { colorScheme, colors, setColorScheme } = useAppTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      <AppHeader title="Ajustes de la App" />

      <View
        style={[
          styles.card,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
            shadowColor: colors.shadow,
          },
        ]}
      >
        <Text style={[styles.sectionLabel, { color: colors.subtleText }]}>
          APARIENCIA
        </Text>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Elige el tema de la aplicación
        </Text>
        <Text style={[styles.sectionDescription, { color: colors.mutedText }]}>
          El cambio se guarda automáticamente y se aplica en las pantallas de la
          app.
        </Text>

        <View style={styles.options}>
          {themeOptions.map((option) => {
            const isActive = colorScheme === option.key;

            return (
              <Pressable
                key={option.key}
                onPress={() => setColorScheme(option.key)}
                style={[
                  styles.option,
                  {
                    backgroundColor: isActive
                      ? colors.accentSoft
                      : colors.background,
                    borderColor: isActive ? colors.accent : colors.border,
                  },
                ]}
              >
                <View
                  style={[
                    styles.iconWrap,
                    {
                      backgroundColor: isActive
                        ? colors.accent
                        : colors.surface,
                    },
                  ]}
                >
                  <Ionicons
                    name={option.icon}
                    size={20}
                    color={isActive ? colors.accentContrast : colors.text}
                  />
                </View>

                <View style={styles.optionText}>
                  <Text style={[styles.optionTitle, { color: colors.text }]}>
                    {option.title}
                  </Text>
                  <Text
                    style={[styles.optionDescription, { color: colors.mutedText }]}
                  >
                    {option.description}
                  </Text>
                </View>

                {isActive ? (
                  <Ionicons
                    name="checkmark-circle"
                    size={24}
                    color={colors.accent}
                  />
                ) : (
                  <Ionicons
                    name="ellipse-outline"
                    size={24}
                    color={colors.subtleText}
                  />
                )}
              </Pressable>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}
