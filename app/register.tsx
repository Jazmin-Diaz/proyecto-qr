import { router } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, Text, TextInput } from "react-native";
import { AuthScreenLayout } from "../components/auth/auth-screen-layout";
import { PasswordInput } from "../components/auth/password-input";
import { useAppTheme } from "../hooks/use-app-theme";
import { useAuth } from "../src/context/auth-context";
import { registerUser } from "../src/services/auth";
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
  const { signIn } = useAuth();

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

      await signIn(response.usuario);
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
    <AuthScreenLayout
      title="Registrarse"
      subtitle="Crea tu cuenta para guardar tus datos y tu actividad."
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

      <PasswordInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        visible={showPassword}
        onToggleVisible={() => setShowPassword((prev) => !prev)}
        returnKeyType="next"
        colors={colors}
      />

      <PasswordInput
        placeholder="Confirmar contraseña"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        visible={showConfirmPassword}
        onToggleVisible={() => setShowConfirmPassword((prev) => !prev)}
        returnKeyType="done"
        colors={colors}
      />

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
    </AuthScreenLayout>
  );
}
