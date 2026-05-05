import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import ViewShot from "react-native-view-shot";
import { AppHeader } from "../components/app-header";
import { useAppTheme } from "../hooks/use-app-theme";
import { useQrCapture } from "../hooks/use-qr-capture";
import { styles } from "../styles/resultadoStyles";

export default function Resultado() {
  const { value } = useLocalSearchParams<{ value: string }>();
  const { colors } = useAppTheme();
  const { viewShotRef, compartirQR } = useQrCapture();

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
          style={styles.captureWrapper}
        >
          <View style={styles.qrWrapper}>
            <QRCode
              value={value}
              size={200}
              backgroundColor="white"
              color="black"
            />
          </View>
        </ViewShot>

        <Text style={[styles.qrTitle, { color: colors.text }]}>
          Contenido del QR
        </Text>
        <Text style={[styles.qrValue, { color: colors.mutedText }]}>
          {value}
        </Text>
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
