import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { QR_TYPES, type QrType } from "../../src/constants/qr";
import type { AppColors, AppThemeName } from "../../styles/theme";
import { styles } from "../../styles/crearStyles";

type QrTypeSelectorProps = {
  selectedType: QrType;
  onSelectType: (type: QrType) => void;
  colors: (typeof AppColors)[AppThemeName];
};

export function QrTypeSelector({
  selectedType,
  onSelectType,
  colors,
}: QrTypeSelectorProps) {
  return (
    <View
      style={[
        styles.card,
        styles.shadow,
        { backgroundColor: colors.card, shadowColor: colors.shadow },
      ]}
    >
      <Text style={[styles.cardSectionTitle, { color: colors.text }]}>
        Tipo de Código QR
      </Text>

      <View style={styles.typeGrid}>
        {QR_TYPES.map((item) => {
          const isSelected = selectedType === item.id;

          return (
            <Pressable
              key={item.id}
              style={[
                styles.typeButton,
                {
                  backgroundColor: isSelected ? colors.accent : colors.input,
                  borderColor: isSelected ? colors.accent : colors.border,
                },
              ]}
              onPress={() => onSelectType(item.id)}
            >
              <Ionicons
                name={item.icon}
                size={22}
                color={isSelected ? colors.accentContrast : colors.icon}
              />
              <Text
                style={[
                  styles.typeButtonText,
                  { color: isSelected ? colors.accentContrast : colors.text },
                ]}
              >
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
