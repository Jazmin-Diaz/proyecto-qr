import { useRouter } from "expo-router";
import { Alert, ScrollView, Text, View } from "react-native";
import { MenuCard } from "../../components/profile/menu-card";
import { MenuOption } from "../../components/profile/menu-option";
import { MenuSeparator } from "../../components/profile/menu-separator";
import { ProfileHeader } from "../../components/profile/profile-header";
import { useAppTheme } from "../../hooks/use-app-theme";
import { useSession } from "../../hooks/use-session";
import { useAuth } from "../../src/context/auth-context";
import { styles } from "../../styles/perfilStyles";

export default function PerfilScreen() {
  const router = useRouter();
  const { colors } = useAppTheme();
  const { user } = useSession();
  const { signOut } = useAuth();

  const handleLogout = () => {
    Alert.alert("Cerrar sesión", "Se cerrara tu sesión en este dispositivo.", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Cerrar sesión",
        style: "destructive",
        onPress: async () => {
          await signOut();
          router.replace("/(tabs)/perfil");
        },
      },
    ]);
  };

  const handleGuestBlockedSection = () => {
    Alert.alert(
      "Disponible con cuenta",
      "Inicia sesión para acceder a tu actividad y funciones personales.",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Iniciar sesión", onPress: () => router.push("/login") },
      ],
    );
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ProfileHeader user={user} colors={colors} />

      <View style={styles.menuContainer}>
        <MenuCard label="CUENTA" colors={colors}>
          {user ? (
            <MenuOption
              icon="log-out-outline"
              title="Cerrar sesión"
              onPress={handleLogout}
              color={colors.accent}
              arrowColor={colors.subtleText}
            />
          ) : (
            <>
              <MenuOption
                icon="log-in-outline"
                title="Iniciar sesión"
                onPress={() => router.push("/login")}
                color={colors.accent}
                arrowColor={colors.subtleText}
              />

              <MenuSeparator colors={colors} />

              <MenuOption
                icon="person-add-outline"
                title="Registrarse"
                onPress={() => router.push("/register")}
                color={colors.accent}
                arrowColor={colors.subtleText}
              />
            </>
          )}
        </MenuCard>

        <MenuCard label="ACTIVIDAD" colors={colors}>
          <MenuOption
            icon="qr-code-outline"
            title="Mis QRs Generados"
            onPress={
              user
                ? () => router.push("/historial-generados" as never)
                : handleGuestBlockedSection
            }
            color={colors.text}
            arrowColor={colors.subtleText}
            disabled={!user}
          />

          <MenuSeparator colors={colors} />

          <MenuOption
            icon="time-outline"
            title="Historial de Escaneos"
            onPress={
              user
                ? () => router.push("/historial-escaneos" as never)
                : handleGuestBlockedSection
            }
            color={colors.text}
            arrowColor={colors.subtleText}
            disabled={!user}
          />

          <MenuSeparator colors={colors} />

          <MenuOption
            icon="settings-outline"
            title="Ajustes de la App"
            onPress={user ? () => router.push("/settings") : handleGuestBlockedSection}
            color={colors.text}
            arrowColor={colors.subtleText}
            disabled={!user}
          />
        </MenuCard>

        <MenuCard label="OTROS" colors={colors}>
          <MenuOption
            icon="help-circle-outline"
            title="Ayuda y Soporte"
            onPress={() => Alert.alert("jazmindiaz2170@gmail.com")}
            color={colors.text}
            arrowColor={colors.subtleText}
          />
        </MenuCard>
      </View>

      <Text style={[styles.versionText, { color: colors.subtleText }]}>
        Versión 1.0.0
      </Text>
    </ScrollView>
  );
}
