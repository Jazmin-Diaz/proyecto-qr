import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { useAppTheme } from "../../hooks/use-app-theme";
import { useSession } from "../../hooks/use-session";
import { clearSession } from "../../src/storage/session";
import { styles } from "../../styles/perfilStyles";

type MenuOptionProps = {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  title: string;
  onPress: () => void;
  color: string;
  arrowColor: string;
  disabled?: boolean;
};

function MenuOption({
  icon,
  title,
  onPress,
  color,
  arrowColor,
  disabled = false,
}: MenuOptionProps) {
  return (
    <Pressable
      style={[styles.optionRow, disabled && { opacity: 0.45 }]}
      onPress={onPress}
    >
      <View style={styles.optionLeft}>
        <Ionicons name={icon} size={22} color={color} style={styles.iconFixed} />
        <Text style={[styles.optionTitle, { color }]}>{title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={arrowColor} />
    </Pressable>
  );
}

export default function PerfilScreen() {
  const router = useRouter();
  const { colors } = useAppTheme();
  const { user } = useSession();

  const handleLogout = () => {
    Alert.alert("Cerrar sesión", "Se cerrara tu sesión en este dispositivo.", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Cerrar sesión",
        style: "destructive",
        onPress: async () => {
          await clearSession();
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
          style={[
            styles.avatarPlaceholder,
            { backgroundColor: colors.accent },
          ]}
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

      <View style={styles.menuContainer}>
        <Text style={[styles.sectionLabel, { color: colors.subtleText }]}>CUENTA</Text>
        <View
          style={[
            styles.card,
            { backgroundColor: colors.card, shadowColor: colors.shadow },
          ]}
        >
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

              <View
                style={[styles.separator, { backgroundColor: colors.separator }]}
              />

              <MenuOption
                icon="person-add-outline"
                title="Registrarse"
                onPress={() => router.push("/register")}
                color={colors.accent}
                arrowColor={colors.subtleText}
              />
            </>
          )}
        </View>

        <Text style={[styles.sectionLabel, { color: colors.subtleText }]}>
          ACTIVIDAD
        </Text>
        <View
          style={[
            styles.card,
            { backgroundColor: colors.card, shadowColor: colors.shadow },
          ]}
        >
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

          <View
            style={[styles.separator, { backgroundColor: colors.separator }]}
          />

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

          <View
            style={[styles.separator, { backgroundColor: colors.separator }]}
          />

          <MenuOption
            icon="settings-outline"
            title="Ajustes de la App"
            onPress={user ? () => router.push("/settings") : handleGuestBlockedSection}
            color={colors.text}
            arrowColor={colors.subtleText}
            disabled={!user}
          />
        </View>

        <Text style={[styles.sectionLabel, { color: colors.subtleText }]}>
          OTROS
        </Text>
        <View
          style={[
            styles.card,
            { backgroundColor: colors.card, shadowColor: colors.shadow },
          ]}
        >
          <MenuOption
            icon="help-circle-outline"
            title="Ayuda y Soporte"
            onPress={() => Alert.alert("jazmindiaz2170@gmail.com")}
            color={colors.text}
            arrowColor={colors.subtleText}
          />
        </View>
      </View>

      <Text style={[styles.versionText, { color: colors.subtleText }]}>
        Versión 1.0.0
      </Text>
    </ScrollView>
  );
}
