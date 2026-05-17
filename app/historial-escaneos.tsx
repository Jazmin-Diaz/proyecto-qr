import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import {
  Alert,
  Linking,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { AppHeader } from "../components/app-header";
import { useAppTheme } from "../hooks/use-app-theme";
import { useActivity, formatDate } from "../hooks/use-activity";
import { useActivityContext } from "../src/context/activity-context";
import type { ActivityItem } from "../src/services/activity";
import { styles } from "../styles/historialEscaneosStyles";

export default function HistorialEscaneosScreen() {
  const { colors } = useAppTheme();
  const { items, user } = useActivity("scanned");
  const { clearScannedHistory } = useActivityContext();

  const clearHistory = () => {
    if (!items.length) return;
    void (async () => {
      await clearScannedHistory();
    })();
  };

  const onOpenItem = async (item: ActivityItem) => {
    const isLink = /^(?:https?:\/\/|www\.)/i.test(item.value);
    if (isLink) {
      await Linking.openURL(
        item.value.startsWith("www.") ? `https://${item.value}` : item.value,
      );
      return;
    }
    await Clipboard.setStringAsync(item.value);
    Alert.alert("Copiado", "El contenido se copio al portapapeles.");
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      <AppHeader title="Historial de Escaneos" />

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
        {!user ? (
          <>
            <View style={[styles.iconWrap, { backgroundColor: colors.accentSoft }]}>
              <Ionicons name="lock-closed-outline" size={34} color={colors.accent} />
            </View>
            <Text style={[styles.title, { color: colors.text }]}>
              Inicia sesión para ver tu historial
            </Text>
            <Text style={[styles.description, { color: colors.mutedText }]}>
              El historial de escaneos se activa con tu cuenta.
            </Text>
          </>
        ) : items.length === 0 ? (
          <>
            <View style={[styles.iconWrap, { backgroundColor: colors.accentSoft }]}>
              <Ionicons name="time-outline" size={34} color={colors.accent} />
            </View>
            <Text style={[styles.title, { color: colors.text }]}>
              Todavia no hay escaneos guardados
            </Text>
            <Text style={[styles.description, { color: colors.mutedText }]}>
              Escanea un código desde la pantalla Inicio y aparecera aquí.
            </Text>
          </>
        ) : (
          <View style={styles.listWrap}>
            <Text style={[styles.noteTitle, { color: colors.text }]}>
              Total: {items.length}
            </Text>
            {items.map((item) => (
              <Pressable
                key={item.id}
                onPress={() => onOpenItem(item)}
                style={[
                  styles.itemRow,
                  { backgroundColor: colors.surface, borderColor: colors.border },
                ]}
              >
                <Text numberOfLines={2} style={[styles.itemValue, { color: colors.text }]}>
                  {item.value}
                </Text>
                <Text style={[styles.itemDate, { color: colors.mutedText }]}>
                  {formatDate(item.createdAt)}
                </Text>
                <Text style={[styles.itemHelp, { color: colors.accent }]}>
                  {item.value.startsWith("http")
                    ? "Toca para abrir enlace"
                    : "Toca para copiar texto"}
                </Text>
              </Pressable>
            ))}
            <Pressable
              onPress={clearHistory}
              style={[styles.clearBtn, { borderColor: colors.danger }]}
            >
              <Text style={[styles.clearBtnText, { color: colors.danger }]}>
                Limpiar historial
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
