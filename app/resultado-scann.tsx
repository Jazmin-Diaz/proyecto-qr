import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { router, useLocalSearchParams } from "expo-router";
import { Alert, Linking, Pressable, ScrollView, Text, View } from "react-native";
import { AppHeader } from "../components/app-header";
import { useAppTheme } from "../hooks/use-app-theme";
import { parseQrContent } from "../src/utils/qr-content";
import { decodeRouteParam } from "../src/utils/route-params";
import { styles } from "../styles/resultado-scannStyles";

type ResultField = {
  label: string;
  value: string;
};

const getActionLabel = (type: string) => {
  if (type === "wifi") return "Conectar";
  if (type === "link") return "Abrir en el navegador";
  if (type === "email") return "Enviar correo";
  if (type === "phone") return "Llamar";
  if (type === "contact") return "Importar contacto";
  return "Aceptar";
};

const getIconName = (type: string) => {
  if (type === "wifi") return "wifi";
  if (type === "link") return "link";
  if (type === "email") return "mail";
  if (type === "phone") return "call";
  if (type === "contact") return "person";
  return "text";
};

const getFieldDisplayValue = (field: ResultField) => {
  if (
    field.label === "Contraseña" &&
    field.value &&
    field.value !== "No incluida" &&
    field.value !== "Sin clave" &&
    field.value !== "Sin contrasena"
  ) {
    return "*".repeat(Math.min(Math.max(field.value.length, 8), 14));
  }

  return field.value;
};

export default function ResultadoScan() {
  const { data } = useLocalSearchParams<{ data: string }>();
  const { colors } = useAppTheme();
  const scannedValue = decodeRouteParam(data);
  const content = parseQrContent(scannedValue);

  const getFieldValue = (label: string) =>
    content.fields.find((field) => field.label === label)?.value ?? "";

  const resultFields: ResultField[] =
    content.type === "wifi"
      ? [
          { label: "Nombre de la red", value: getFieldValue("Red") },
          { label: "Contraseña", value: getFieldValue("Contrasena") },
          { label: "Cifrado", value: getFieldValue("Seguridad") },
        ]
      : content.type === "contact"
        ? content.fields.map((field) => ({
            label:
              field.label === "Telefono"
                ? "Teléfono"
                : field.label === "Correo"
                  ? "Correo electrónico"
                  : field.label,
            value: field.value,
          }))
        : content.type === "link"
          ? [{ label: "Enlace", value: getFieldValue("Link") }]
          : content.type === "email"
            ? [{ label: "Correo electrónico", value: getFieldValue("Correo") }]
            : content.type === "phone"
              ? [{ label: "Teléfono", value: getFieldValue("Telefono") }]
          : [{ label: "Texto", value: getFieldValue("Texto") }];

  const visibleFields = resultFields.filter((field) => field.value);

  const handleAction = async () => {
    if (content.type === "link" && content.actionUrl) {
      await Linking.openURL(content.actionUrl);
      return;
    }

    if (content.type === "wifi") {
      Alert.alert(
        "Red WiFi detectada",
        "El QR ya fue leído. Copia los datos mostrados para conectarte a la red."
      );
      return;
    }

    if (content.type === "contact") {
      Alert.alert(
        "Contacto detectado",
        "Los datos del contacto ya están separados para que puedas guardarlos."
      );
      return;
    }

    router.back();
  };

  const handleCopy = async () => {
    await Clipboard.setStringAsync(content.actionUrl ?? content.rawValue);
    Alert.alert("Copiado", "El contenido se copio al portapapeles.");
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.scrollContent}
    >
      <AppHeader title="Resultado" />

      <View style={styles.content}>
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: colors.surface, shadowColor: colors.shadow },
          ]}
        >
          <Ionicons name={getIconName(content.type)} size={60} color={colors.accent} />
        </View>

        <View
          style={[
            styles.card,
            { backgroundColor: colors.card, shadowColor: colors.shadow },
          ]}
        >
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            Contenido del QR
          </Text>

          <View style={styles.fieldsContainer}>
          {visibleFields.map((field) => (
            <View
              key={field.label}
              style={[styles.fieldRow, { borderColor: colors.separator }]}
            >
              <Text style={[styles.fieldLabel, { color: colors.mutedText }]}>
                {field.label}
              </Text>
              <Text selectable style={[styles.fieldValue, { color: colors.text }]}>
                {getFieldDisplayValue(field)}
              </Text>
            </View>
          ))}
          </View>
        </View>

        <Pressable
          style={[
            styles.actionButton,
            { backgroundColor: colors.accent, borderColor: colors.accent },
          ]}
          onPress={handleAction}
        >
          <Text style={[styles.actionText, { color: colors.accentContrast }]}>
            {getActionLabel(content.type)}
          </Text>
        </Pressable>

        {["link", "email", "phone", "text"].includes(content.type) ? (
          <Pressable
            style={[
              styles.secondaryButton,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
            onPress={handleCopy}
          >
            <Text style={[styles.secondaryActionText, { color: colors.text }]}>
              Copiar contenido
            </Text>
          </Pressable>
        ) : null}
      </View>

      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
}
