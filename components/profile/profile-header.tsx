import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import type { AuthUser } from "../../src/services/auth";
import type { AppColors, AppThemeName } from "../../styles/theme";
import { styles } from "../../styles/perfilStyles";

type ProfileHeaderProps = {
  user: AuthUser | null;
  colors: (typeof AppColors)[AppThemeName];
};

export function ProfileHeader({ user, colors }: ProfileHeaderProps) {
  return (
    <View
      style={[
        styles.header,
        {
          backgroundColor: colors.header,
          shadowColor: colors.shadow,
        },
      ]}
    >
      <View
        style={[styles.avatarPlaceholder, { backgroundColor: colors.accent }]}
      >
        <Ionicons name="person" size={50} color={colors.accentContrast} />
      </View>
      <Text style={[styles.userName, { color: colors.text }]}>
        {user ? user.nombre : "Usuario Invitado"}
      </Text>
      <Text style={[styles.userEmail, { color: colors.mutedText }]}>
        {user ? user.correo : "Inicia sesion para guardar tus datos"}
      </Text>
    </View>
  );
}
