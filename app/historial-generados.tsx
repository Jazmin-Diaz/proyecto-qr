import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { AppHeader } from "../components/app-header";
import { formatDate, useActivity } from "../hooks/use-activity";
import { useAppTheme } from "../hooks/use-app-theme";
import { useActivityContext } from "../src/context/activity-context";
import { encodeRouteParam } from "../src/utils/route-params";
import { styles } from "../styles/historialGeneradosStyles";

export default function HistorialGeneradosScreen() {
  const { colors } = useAppTheme();
  const { items, user } = useActivity("generated");
  const { clearGeneratedHistory } = useActivityContext();

  const clearHistory = () => {
    if (!items.length) return;
    void (async () => {
      await clearGeneratedHistory();
    })();
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      <AppHeader title="Mis QRs Generados" />

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
            <View
              style={[styles.iconWrap, { backgroundColor: colors.accentSoft }]}
            >
              <Ionicons
                name="lock-closed-outline"
                size={34}
                color={colors.accent}
              />
            </View>
            <Text style={[styles.title, { color: colors.text }]}>
              Inicia sesión para ver tu historial
            </Text>
            <Text style={[styles.description, { color: colors.mutedText }]}>
              El historial de códigos generados se activa con tu cuenta.
            </Text>
          </>
        ) : items.length === 0 ? (
          <>
            <View
              style={[styles.iconWrap, { backgroundColor: colors.accentSoft }]}
            >
              <Ionicons
                name="qr-code-outline"
                size={34}
                color={colors.accent}
              />
            </View>
            <Text style={[styles.title, { color: colors.text }]}>
              Aun no hay códigos generados
            </Text>
            <Text style={[styles.description, { color: colors.mutedText }]}>
              Crea un QR desde la pestaña Crear y aqui aparecera
              automaticamente.
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
                onPress={() =>
                  router.push({
                    pathname: "/resultado",
                    params: { value: encodeRouteParam(item.value) },
                  })
                }
                style={[
                  styles.itemRow,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                  },
                ]}
              >
                <Text
                  numberOfLines={2}
                  style={[styles.itemValue, { color: colors.text }]}
                >
                  {item.value}
                </Text>
                <Text style={[styles.itemDate, { color: colors.mutedText }]}>
                  {formatDate(item.createdAt)}
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
