import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { Linking, Pressable, Text, View } from "react-native";
import { useAppTheme } from "../hooks/use-app-theme";
import { styles } from "../styles/resultado-scannStyles";

export default function ResultadoScan() {
  const { data } = useLocalSearchParams<{ data: string }>();
  const { colors } = useAppTheme();

  const isLink = data?.startsWith("http");

  const handleOpenLink = async () => {
    if (isLink) {
      await Linking.openURL(data);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: colors.surface, shadowColor: colors.shadow },
          ]}
        >
          <Ionicons
            name={isLink ? "link" : "text-outline"}
            size={60}
            color={colors.accent}
          />
        </View>

        <View
          style={[
            styles.card,
            { backgroundColor: colors.card, shadowColor: colors.shadow },
          ]}
        >
          <Text style={[styles.label, { color: colors.subtleText }]}>
            {isLink ? "ENLACE DETECTADO" : "TEXTO DEL QR"}
          </Text>
          <Text style={[styles.resultText, { color: colors.text }]}>{data}</Text>
        </View>

        {isLink && (
          <Pressable
            style={[styles.linkButton, { backgroundColor: colors.accent }]}
            onPress={handleOpenLink}
          >
            <Text
              style={[
                styles.linkButtonText,
                { color: colors.accentContrast },
              ]}
            >
              Ir al sitio web
            </Text>
            <Ionicons
              name="open-outline"
              size={20}
              color={colors.accentContrast}
              style={styles.linkButtonIcon}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
}
