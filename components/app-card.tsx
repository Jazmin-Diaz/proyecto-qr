import { View, ViewProps } from "react-native";
import { useAppTheme } from "../hooks/use-app-theme";
import { appCardStyles } from "../styles/appCardStyles";

type CardProps = ViewProps & {
  elevated?: boolean;
};

export function AppCard({ style, elevated, children, ...props }: CardProps) {
  const { colors } = useAppTheme();
  
  return (
    <View
      style={[
        elevated ? appCardStyles.elevated : appCardStyles.simple,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          shadowColor: colors.shadow,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}
