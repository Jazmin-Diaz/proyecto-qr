import { Text, View } from "react-native";
import type { AppColors, AppThemeName } from "../../styles/theme";
import { styles } from "../../styles/crearStyles";

type SessionLoadingViewProps = {
  colors: (typeof AppColors)[AppThemeName];
};

export function SessionLoadingView({ colors }: SessionLoadingViewProps) {
  return (
    <View
      style={[styles.loadingContainer, { backgroundColor: colors.background }]}
    >
      <Text style={[styles.loadingText, { color: colors.mutedText }]}>
        Verificando sesion...
      </Text>
    </View>
  );
}
