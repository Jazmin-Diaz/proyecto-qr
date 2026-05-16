import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import type { QrFormState } from "../../hooks/use-qr-form";
import { QR_MAX_CHARACTERS } from "../../src/constants/qr";
import type { AppColors, AppThemeName } from "../../styles/theme";
import { styles } from "../../styles/crearStyles";

type QrContentFormProps = {
  form: QrFormState;
  colors: (typeof AppColors)[AppThemeName];
  onSubmit: () => void;
};

const wifiSecurityOptions = ["WPA", "WEP", "nopass"];

export function QrContentForm({ form, colors, onSubmit }: QrContentFormProps) {
  const [wifiPasswordVisible, setWifiPasswordVisible] = useState(false);
  const canShowWifiPassword = form.wifiSecurity !== "nopass";

  return (
    <View
      style={[
        styles.card,
        styles.shadow,
        { backgroundColor: colors.card, shadowColor: colors.shadow },
      ]}
    >
      <Text style={[styles.cardSectionTitle, { color: colors.text }]}>
        Contenido del Código QR
      </Text>

      {form.selectedType === "link" && (
        <TextInput
          style={[
            styles.singleInput,
            {
              backgroundColor: colors.input,
              borderColor: colors.border,
              color: colors.text,
            },
          ]}
          placeholder="https://ejemplo.com"
          placeholderTextColor={colors.mutedText}
          value={form.link}
          onChangeText={form.setLink}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="url"
          onSubmitEditing={onSubmit}
        />
      )}

      {form.selectedType === "text" && (
        <View style={[styles.inputContainer, { borderColor: colors.border }]}>
          <TextInput
            style={[styles.input, { color: colors.text }]}
            placeholder="Ingresa el texto para generar el codigo QR"
            placeholderTextColor={colors.mutedText}
            value={form.text}
            onChangeText={form.setText}
            multiline={true}
            maxLength={QR_MAX_CHARACTERS}
            onSubmitEditing={onSubmit}
          />

          <Text style={[styles.charCounter, { color: colors.mutedText }]}>
            {form.text.length}/{QR_MAX_CHARACTERS} caracteres
          </Text>
        </View>
      )}

      {form.selectedType === "wifi" && (
        <View style={styles.formGroup}>
          <TextInput
            style={[
              styles.singleInput,
              {
                backgroundColor: colors.input,
                borderColor: colors.border,
                color: colors.text,
              },
            ]}
            placeholder="Nombre de la red"
            placeholderTextColor={colors.mutedText}
            value={form.wifiName}
            onChangeText={form.setWifiName}
            autoCapitalize="none"
          />

          <View
            style={[
              styles.passwordInputWrapper,
              {
                backgroundColor: colors.input,
                borderColor: colors.border,
              },
            ]}
          >
            <TextInput
              style={[styles.passwordInput, { color: colors.text }]}
              placeholder="Contrasena"
              placeholderTextColor={colors.mutedText}
              value={form.wifiPassword}
              onChangeText={form.setWifiPassword}
              secureTextEntry={canShowWifiPassword && !wifiPasswordVisible}
              editable={canShowWifiPassword}
              autoCapitalize="none"
            />

            <Pressable
              style={[
                styles.passwordIconButton,
                { opacity: canShowWifiPassword ? 1 : 0.45 },
              ]}
              onPress={() => setWifiPasswordVisible((visible) => !visible)}
              disabled={!canShowWifiPassword}
              accessibilityRole="button"
              accessibilityLabel={
                wifiPasswordVisible ? "Ocultar contrasena" : "Mostrar contrasena"
              }
            >
              <Ionicons
                name={wifiPasswordVisible ? "eye-off-outline" : "eye-outline"}
                size={22}
                color={colors.mutedText}
              />
            </Pressable>
          </View>

          <View style={styles.securityRow}>
            {wifiSecurityOptions.map((security) => {
              const isSelected = form.wifiSecurity === security;

              return (
                <Pressable
                  key={security}
                  style={[
                    styles.securityButton,
                    {
                      backgroundColor: isSelected
                        ? colors.accentSoft
                        : colors.input,
                      borderColor: isSelected ? colors.accent : colors.border,
                    },
                  ]}
                  onPress={() => form.setWifiSecurity(security)}
                >
                  <Text
                    style={[
                      styles.securityButtonText,
                      { color: isSelected ? colors.accent : colors.text },
                    ]}
                  >
                    {security === "nopass" ? "Sin clave" : security}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      )}

      {form.selectedType === "contact" && (
        <View style={styles.formGroup}>
          <TextInput
            style={[
              styles.singleInput,
              {
                backgroundColor: colors.input,
                borderColor: colors.border,
                color: colors.text,
              },
            ]}
            placeholder="Nombre"
            placeholderTextColor={colors.mutedText}
            value={form.contactName}
            onChangeText={form.setContactName}
          />

          <TextInput
            style={[
              styles.singleInput,
              {
                backgroundColor: colors.input,
                borderColor: colors.border,
                color: colors.text,
              },
            ]}
            placeholder="Telefono"
            placeholderTextColor={colors.mutedText}
            value={form.contactPhone}
            onChangeText={form.setContactPhone}
            keyboardType="phone-pad"
          />

          <TextInput
            style={[
              styles.singleInput,
              {
                backgroundColor: colors.input,
                borderColor: colors.border,
                color: colors.text,
              },
            ]}
            placeholder="Correo"
            placeholderTextColor={colors.mutedText}
            value={form.contactEmail}
            onChangeText={form.setContactEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>
      )}
    </View>
  );
}
