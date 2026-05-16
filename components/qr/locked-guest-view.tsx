import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import type { AppColors, AppThemeName } from "../../styles/theme";
import { styles } from "../../styles/crearStyles";

type LockedGuestViewProps = {
  colors: (typeof AppColors)[AppThemeName];
};

export function LockedGuestView({ colors }: LockedGuestViewProps) {
  return (
    <View
      style={[styles.lockedContainer, { backgroundColor: colors.background }]}
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
          <Text style={[styles.lockedTitle, { color: colors.text }]}>
            Funcion bloqueada para invitado
          </Text>
          <Text style={[styles.lockedDescription, { color: colors.mutedText }]}>
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
