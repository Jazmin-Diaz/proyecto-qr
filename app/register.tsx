import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useAppTheme } from "../hooks/use-app-theme";
import { registerUser } from "../src/services/auth";
import { saveSession } from "../src/storage/session";
import { styles } from "../styles/registerStyles";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { colors } = useAppTheme();

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Campos incompletos", "Completa todos los campos");
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      Alert.alert("Correo invalido", "Ingresa un correo electrónico válido");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Contraseña invalida", "La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden");
      return;
    }

    try {
      setIsLoading(true);
      const response = await registerUser({
        nombre: name.trim(),
        correo: normalizedEmail,
        password,
      });

      await saveSession(response.usuario);
      Alert.alert("Cuenta creada", "Tu cuenta se registró correctamente");
      router.replace("/(tabs)/perfil");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "No se pudo registrar usuario";
      Alert.alert("Error", message);
    } finally {
      setIsLoading(false);
    }
  };

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
        <Text style={[styles.title, { color: colors.text }]}>Registrarse</Text>
        <Text style={[styles.subtitle, { color: colors.mutedText }]}>
          Crea tu cuenta para guardar tus datos y tu actividad.
        </Text>

        <TextInput
          style={[
            styles.input,
            {
              color: colors.text,
              borderColor: colors.border,
              backgroundColor: colors.input,
            },
          ]}
          placeholder="Nombre completo"
          placeholderTextColor={colors.mutedText}
          value={name}
          onChangeText={setName}
          returnKeyType="next"
        />

        <TextInput
          style={[
            styles.input,
            {
              color: colors.text,
              borderColor: colors.border,
              backgroundColor: colors.input,
            },
          ]}
          placeholder="Correo"
          placeholderTextColor={colors.mutedText}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          returnKeyType="next"
        />

        <View
          style={[
            styles.inputWrapper,
            {
              borderColor: colors.border,
              backgroundColor: colors.input,
            },
          ]}
        >
          <TextInput
            style={[styles.inputWithIcon, { color: colors.text }]}
            placeholder="Contraseña"
            placeholderTextColor={colors.mutedText}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            value={password}
            onChangeText={setPassword}
            returnKeyType="next"
          />
          <Pressable
            onPress={() => setShowPassword((prev) => !prev)}
            style={styles.iconButton}
          >
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={20}
              color={colors.mutedText}
            />
          </Pressable>
        </View>

        <View
          style={[
            styles.inputWrapper,
            {
              borderColor: colors.border,
              backgroundColor: colors.input,
            },
          ]}
        >
          <TextInput
            style={[styles.inputWithIcon, { color: colors.text }]}
            placeholder="Confirmar contraseña"
            placeholderTextColor={colors.mutedText}
            secureTextEntry={!showConfirmPassword}
            autoCapitalize="none"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            returnKeyType="done"
          />
          <Pressable
            onPress={() => setShowConfirmPassword((prev) => !prev)}
            style={styles.iconButton}
          >
            <Ionicons
              name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
              size={20}
              color={colors.mutedText}
            />
          </Pressable>
        </View>

        <Pressable
          style={[styles.button, { backgroundColor: colors.accent }]}
          disabled={isLoading}
          onPress={handleRegister}
        >
          <Text style={[styles.buttonText, { color: colors.accentContrast }]}>
            {isLoading ? "Registrando..." : "Registrarse"}
          </Text>
        </Pressable>

        <Pressable onPress={() => router.push("/login")}>
          <Text style={[styles.linkText, { color: colors.accent }]}>
            ¿Ya tienes cuenta? Inicia sesión
          </Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
