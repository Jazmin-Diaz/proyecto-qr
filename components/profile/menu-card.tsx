import { PropsWithChildren } from "react";
import { Text, View } from "react-native";
import type { AppColors, AppThemeName } from "../../styles/theme";
import { styles } from "../../styles/perfilStyles";

type MenuCardProps = PropsWithChildren<{
  label: string;
  colors: (typeof AppColors)[AppThemeName];
}>;

export function MenuCard({ label, colors, children }: MenuCardProps) {
  return (
    <>
      <Text style={[styles.sectionLabel, { color: colors.subtleText }]}>
        {label}
      </Text>
      <View
        style={[
          styles.card,
          { backgroundColor: colors.card, shadowColor: colors.shadow },
        ]}
      >
        {children}
      </View>
    </>
  );
}
