import { router } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, Text, TextInput } from "react-native";
import { AuthScreenLayout } from "../components/auth/auth-screen-layout";
import { PasswordInput } from "../components/auth/password-input";
import { useAppTheme } from "../hooks/use-app-theme";
import { useAuth } from "../src/context/auth-context";
import { loginUser } from "../src/services/auth";
import { styles } from "../styles/registerStyles";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { colors } = useAppTheme();
  const { signIn } = useAuth();

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

      await signIn(response);
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
    <AuthScreenLayout
      title="Iniciar sesión"
      subtitle="Accede con tu cuenta para ver y guardar tu información."
      colors={colors}
    >
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

      <PasswordInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        visible={showPassword}
        onToggleVisible={() => setShowPassword((prev) => !prev)}
        returnKeyType="done"
        colors={colors}
      />

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
    </AuthScreenLayout>
  );
}
