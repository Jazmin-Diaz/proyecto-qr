import { View } from "react-native";
import type { AppColors, AppThemeName } from "../../styles/theme";
import { styles } from "../../styles/perfilStyles";

type MenuSeparatorProps = {
  colors: (typeof AppColors)[AppThemeName];
};

export function MenuSeparator({ colors }: MenuSeparatorProps) {
  return (
    <View style={[styles.separator, { backgroundColor: colors.separator }]} />
  );
}
