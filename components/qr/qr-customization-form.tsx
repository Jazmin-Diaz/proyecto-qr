import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { Pressable, Text, View } from "react-native";
import type { QrFormState } from "../../hooks/use-qr-form";
import {
  QR_BACKGROUND_OPTIONS,
  QR_COLOR_OPTIONS,
} from "../../src/constants/qr-customization";
import type { AppColors, AppThemeName } from "../../styles/theme";
import { styles } from "../../styles/crearStyles";

type QrCustomizationFormProps = {
  form: QrFormState;
  colors: (typeof AppColors)[AppThemeName];
};

export function QrCustomizationForm({ form, colors }: QrCustomizationFormProps) {
  const pickBrandImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.85,
    });

    if (result.canceled || !result.assets[0]?.uri) {
      return;
    }

    form.setQrLogoImageUri(result.assets[0].uri);
    form.setQrLogo("none");
  };

  const clearBrandImage = () => {
    form.setQrLogoImageUri("");
  };

  return (
    <View
      style={[
        styles.card,
        styles.shadow,
        { backgroundColor: colors.card, shadowColor: colors.shadow },
      ]}
    >
      <Text style={[styles.cardSectionTitle, { color: colors.text }]}>
        Personalizacion
      </Text>

      <Text style={[styles.customizationLabel, { color: colors.mutedText }]}>
        Color del QR
      </Text>
      <View style={styles.swatchRow}>
        {QR_COLOR_OPTIONS.map((option) => {
          const isSelected = form.qrColor === option.value;

          return (
            <Pressable
              key={option.value}
              style={[
                styles.swatchButton,
                {
                  backgroundColor: option.value,
                  borderColor: isSelected ? colors.accent : colors.border,
                },
              ]}
              onPress={() => form.setQrColor(option.value)}
              accessibilityRole="button"
              accessibilityLabel={option.label}
            >
              {isSelected && (
                <Ionicons name="checkmark" size={18} color={colors.accentContrast} />
              )}
            </Pressable>
          );
        })}
      </View>

      <Text style={[styles.customizationLabel, { color: colors.mutedText }]}>
        Fondo
      </Text>
      <View style={styles.swatchRow}>
        {QR_BACKGROUND_OPTIONS.map((option) => {
          const isSelected = form.qrBackgroundColor === option.value;

          return (
            <Pressable
              key={option.value}
              style={[
                styles.swatchButton,
                {
                  backgroundColor: option.value,
                  borderColor: isSelected ? colors.accent : colors.border,
                },
              ]}
              onPress={() => form.setQrBackgroundColor(option.value)}
              accessibilityRole="button"
              accessibilityLabel={option.label}
            >
              {isSelected && (
                <Ionicons name="checkmark" size={18} color={colors.accent} />
              )}
            </Pressable>
          );
        })}
      </View>

      <Text style={[styles.customizationLabel, { color: colors.mutedText }]}>
        Agregar Imagen/Logo
      </Text>
      <View style={styles.brandImageRow}>
        <Pressable
          style={[
            styles.brandImageButton,
            { backgroundColor: colors.input, borderColor: colors.border },
          ]}
          onPress={pickBrandImage}
        >
          {form.qrLogoImageUri ? (
            <Image source={{ uri: form.qrLogoImageUri }} style={styles.brandImagePreview} />
          ) : (
            <Ionicons name="image-outline" size={24} color={colors.icon} />
          )}
          <Text style={[styles.brandImageText, { color: colors.text }]}>
            {form.qrLogoImageUri ? "Cambiar Imagen/Logo" : "Agregar Imagen/Logo"}
          </Text>
        </Pressable>

        {form.qrLogoImageUri ? (
          <Pressable
            style={[
              styles.brandImageClearButton,
              { borderColor: colors.border },
            ]}
            onPress={clearBrandImage}
          >
            <Ionicons name="trash-outline" size={20} color={colors.mutedText} />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}
