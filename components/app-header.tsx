import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { useAppTheme } from "../hooks/use-app-theme";
import { appHeaderStyles } from "../styles/appHeaderStyles";

type HeaderProps = {
  title: string;
  showBack?: boolean;
};

export function AppHeader({ title, showBack = true }: HeaderProps) {
  const { colors } = useAppTheme();

  return (
    <View
      style={[
        appHeaderStyles.container,
        { backgroundColor: colors.header, borderBottomColor: colors.border },
      ]}
    >
      {showBack && (
        <Pressable
          onPress={() => router.back()}
          style={appHeaderStyles.backButton}
        >
          <Ionicons name="chevron-back" size={26} color={colors.text} />
        </Pressable>
      )}
      <Text style={[appHeaderStyles.title, { color: colors.text }]}>{title}</Text>
    </View>
  );
}
