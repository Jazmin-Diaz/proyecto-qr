import { router } from "expo-router";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { CreateQrHeader } from "../../components/qr/create-qr-header";
import { LockedGuestView } from "../../components/qr/locked-guest-view";
import { QrContentForm } from "../../components/qr/qr-content-form";
import { QrCustomizationForm } from "../../components/qr/qr-customization-form";
import { QrTypeSelector } from "../../components/qr/qr-type-selector";
import { SessionLoadingView } from "../../components/qr/session-loading-view";
import { useAppTheme } from "../../hooks/use-app-theme";
import { useQrForm } from "../../hooks/use-qr-form";
import { useSession } from "../../hooks/use-session";
import { useActivityContext } from "../../src/context/activity-context";
import { buildQrValue } from "../../src/utils/qr-builder";
import { encodeRouteParam } from "../../src/utils/route-params";
import { styles } from "../../styles/crearStyles";

export default function Crear() {
  const form = useQrForm();
  const { colors } = useAppTheme();
  const { user, loading } = useSession();
  const { addGeneratedItem } = useActivityContext();

  const handleGenerate = async () => {
    const result = buildQrValue({
      selectedType: form.selectedType,
      link: form.link,
      text: form.text,
      wifiName: form.wifiName,
      wifiPassword: form.wifiPassword,
      wifiSecurity: form.wifiSecurity,
      contactName: form.contactName,
      contactPhone: form.contactPhone,
      contactEmail: form.contactEmail,
    });

    if ("error" in result) {
      Alert.alert("Atención", result.error);
      return;
    }

    const qrValue = result.value;
    const qrCustomization = {
      qrColor: form.qrColor,
      qrBackgroundColor: form.qrBackgroundColor,
      qrLogo: form.qrLogo,
      qrLogoImageUri: form.qrLogoImageUri,
    };

    await addGeneratedItem(qrValue);
    form.resetCurrentForm();

    router.push({
      pathname: "/resultado",
      params: {
        value: encodeRouteParam(qrValue),
        qrColor: encodeRouteParam(qrCustomization.qrColor),
        qrBackgroundColor: encodeRouteParam(qrCustomization.qrBackgroundColor),
        qrLogo: qrCustomization.qrLogo,
        qrLogoImageUri: encodeRouteParam(qrCustomization.qrLogoImageUri),
      },
    });
  };

  if (loading) {
    return <SessionLoadingView colors={colors} />;
  }

  if (!user) {
    return <LockedGuestView colors={colors} />;
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        <CreateQrHeader colors={colors} />

        <QrTypeSelector
          selectedType={form.selectedType}
          onSelectType={form.setSelectedType}
          colors={colors}
        />

        <QrContentForm form={form} colors={colors} onSubmit={handleGenerate} />

        <QrCustomizationForm form={form} colors={colors} />

        <Pressable
          style={[styles.button, { backgroundColor: colors.accent }]}
          onPress={handleGenerate}
        >
          <Text style={[styles.buttonText, { color: colors.accentContrast }]}>
            Generar Código QR
          </Text>
        </Pressable>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
