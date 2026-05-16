import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import ViewShot from "react-native-view-shot";
import { AppHeader } from "../components/app-header";
import { useAppTheme } from "../hooks/use-app-theme";
import { useQrCapture } from "../hooks/use-qr-capture";
import {
  getQrLogoIcon,
  getSafeQrBackground,
  getSafeQrColor,
  getSafeQrLogo,
} from "../src/constants/qr-customization";
import { parseQrContent } from "../src/utils/qr-content";
import { decodeRouteParam } from "../src/utils/route-params";
import { styles } from "../styles/resultadoStyles";

export default function Resultado() {
  const { value, qrColor, qrBackgroundColor, qrLogo, qrLogoImageUri } =
    useLocalSearchParams<{
    value: string;
    qrColor?: string;
    qrBackgroundColor?: string;
    qrLogo?: string;
    qrLogoImageUri?: string;
  }>();
  const { colors } = useAppTheme();
  const { viewShotRef, compartirQR } = useQrCapture();
  const qrValue = decodeRouteParam(value);
  const selectedQrColor = getSafeQrColor(decodeRouteParam(qrColor));
  const selectedQrBackground = getSafeQrBackground(decodeRouteParam(qrBackgroundColor));
  const selectedQrLogo = getSafeQrLogo(qrLogo);
  const selectedLogoImageUri = decodeRouteParam(qrLogoImageUri);
  const content = parseQrContent(qrValue);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <AppHeader title="Resultado" />

      <View
        style={[
          styles.mainCard,
          { backgroundColor: colors.card, shadowColor: colors.shadow },
        ]}
      >
        <ViewShot
          ref={viewShotRef}
          options={{ format: "png", quality: 1.0 }}
          style={[
            styles.captureWrapper,
            { backgroundColor: selectedQrBackground },
          ]}
        >
          <View style={[styles.qrWrapper, { backgroundColor: selectedQrBackground }]}>
            <QRCode
              value={qrValue}
              size={200}
              backgroundColor={selectedQrBackground}
              color={selectedQrColor}
              ecl="H"
            />
            {(selectedLogoImageUri || selectedQrLogo !== "none") && (
              <View
                pointerEvents="none"
                style={[
                  styles.qrLogoBadge,
                  {
                    backgroundColor: selectedQrBackground,
                    borderColor: selectedQrColor,
                  },
                ]}
              >
                {selectedLogoImageUri ? (
                  <Image
                    source={{ uri: selectedLogoImageUri }}
                    style={styles.qrLogoImage}
                    contentFit="cover"
                  />
                ) : (
                  <Ionicons
                    name={getQrLogoIcon(selectedQrLogo)}
                    size={28}
                    color={selectedQrColor}
                  />
                )}
              </View>
            )}
          </View>
        </ViewShot>

        <Text style={[styles.qrTitle, { color: colors.text }]}>
          Contenido del QR
        </Text>

        <View style={styles.fieldsContainer}>
          {content.fields.map((field) => (
            <View
              key={field.label}
              style={[styles.fieldRow, { borderColor: colors.separator }]}
            >
              <Text style={[styles.fieldLabel, { color: colors.mutedText }]}>
                {field.label}
              </Text>
              <Text selectable style={[styles.qrValue, { color: colors.text }]}>
                {field.value}
              </Text>
            </View>
          ))}
        </View>

      </View>

      <View style={styles.actionsContainer}>
        <Pressable
          style={[
            styles.actionButton,
            styles.btnPrimary,
            { backgroundColor: colors.accent, borderColor: colors.accent },
          ]}
          onPress={compartirQR}
        >
          <Ionicons
            name="share-social-outline"
            size={22}
            color={colors.accentContrast}
          />
          <Text
            style={[
              styles.actionText,
              styles.btnTextPrimary,
              { color: colors.accentContrast },
            ]}
          >
            Compartir código QR
          </Text>
        </Pressable>
      </View>

      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
}
