import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useAppTheme } from "../../hooks/use-app-theme";
import { useSession } from "../../hooks/use-session";
import { addGeneratedItem } from "../../src/storage/activity";
import { styles } from "../../styles/crearStyles";

export default function Crear() {
  const [text, setText] = useState("");
  const maxCharacters = 150;
  const { colors } = useAppTheme();
  const { user, loading } = useSession();

  const handleGenerate = async () => {
    if (!text.trim()) {
      Alert.alert("Atención", "Escribe algo primero");
      return;
    }

    const qrValue = text.trim();
    await addGeneratedItem(qrValue);
    setText("");

    router.push({
      pathname: "/resultado",
      params: { value: qrValue },
    });
  };

  if (loading) {
    return (
      <View
        style={[
          styles.loadingContainer,
          { backgroundColor: colors.background },
        ]}
      >
        <Text style={[styles.loadingText, { color: colors.mutedText }]}>
          Verificando sesion...
        </Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View
        style={[
          styles.lockedContainer,
          { backgroundColor: colors.background },
        ]}
      >
        <View
          style={[
            styles.card,
            styles.shadow,
            { backgroundColor: colors.card, shadowColor: colors.shadow },
          ]}
        >
          <View style={styles.lockedContent}>
            <Ionicons name="lock-closed" size={42} color={colors.accent} />
            <Text
              style={[styles.lockedTitle, { color: colors.text }]}
            >
              Funcion bloqueada para invitado
            </Text>
            <Text
              style={[styles.lockedDescription, { color: colors.mutedText }]}
            >
              Inicia sesion para generar y guardar codigos QR.
            </Text>
          </View>

          <Pressable
            style={[styles.button, { backgroundColor: colors.accent }]}
            onPress={() => router.push("/login")}
          >
            <Text style={[styles.buttonText, { color: colors.accentContrast }]}>
              Iniciar sesion
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.button,
              styles.secondaryButton,
              {
                borderColor: colors.border,
              },
            ]}
            onPress={() => router.push("/register")}
          >
            <Text style={[styles.buttonText, { color: colors.text }]}>
              Registrarse
            </Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={colors.text} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Crear QR
        </Text>
      </View>

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

        <View style={[styles.inputContainer, { borderColor: colors.border }]}>
          <TextInput
            style={[
              styles.input,
              {
                color: colors.text,
              },
            ]}
            placeholder="Ingresa un texto o URL para generar un código QR.."
            placeholderTextColor={colors.mutedText}
            value={text}
            onChangeText={setText}
            multiline={true}
            maxLength={maxCharacters}
            onSubmitEditing={handleGenerate}
          />

          <Text style={[styles.charCounter, { color: colors.mutedText }]}>
            {text.length}/{maxCharacters} caracteres
          </Text>
        </View>
      </View>

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
  );
}
