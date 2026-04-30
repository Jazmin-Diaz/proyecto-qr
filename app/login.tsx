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
import { loginUser } from "../src/services/auth";
import { saveSession } from "../src/storage/session";
import { styles } from "../styles/registerStyles";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { colors } = useAppTheme();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Campos incompletos", "Ingresa tu correo y contraseña");
      return;
    }

    try {
      setIsLoading(true);
      const response = await loginUser({
        correo: email,
        password,
      });

      await saveSession(response.usuario);
      Alert.alert("Sesión iniciada", `Bienvenida/o ${response.usuario.nombre}`);
      router.replace("/(tabs)/perfil");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "No se pudo iniciar sesión";
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
        <Text style={[styles.title, { color: colors.text }]}>Iniciar sesión</Text>
        <Text style={[styles.subtitle, { color: colors.mutedText }]}>
          Accede con tu cuenta para ver y guardar tu información.
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
            returnKeyType="done"
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

        <Pressable
          style={[styles.button, { backgroundColor: colors.accent }]}
          disabled={isLoading}
          onPress={handleLogin}
        >
          <Text style={[styles.buttonText, { color: colors.accentContrast }]}>
            {isLoading ? "Ingresando..." : "Iniciar sesión"}
          </Text>
        </Pressable>

        <Pressable onPress={() => router.push("/register")}>
          <Text style={[styles.linkText, { color: colors.accent }]}>
            ¿Aún no tienes cuenta? Regístrate
          </Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
