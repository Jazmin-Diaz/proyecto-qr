import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { styles } from "../../styles/perfilStyles";

type MenuOptionProps = {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  title: string;
  onPress: () => void;
  color: string;
  arrowColor: string;
  disabled?: boolean;
};

export function MenuOption({
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
