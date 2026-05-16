import { Ionicons } from "@expo/vector-icons";
import { Pressable, TextInput, View } from "react-native";
import type { AppColors, AppThemeName } from "../../styles/theme";
import { styles } from "../../styles/registerStyles";

type PasswordInputProps = {
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
  visible: boolean;
  onToggleVisible: () => void;
  returnKeyType: "next" | "done";
  colors: (typeof AppColors)[AppThemeName];
};

export function PasswordInput({
  placeholder,
  value,
  onChangeText,
  visible,
  onToggleVisible,
  returnKeyType,
  colors,
}: PasswordInputProps) {
  return (
    <View
      style={[
        styles.inputWrapper,
        {
          borderColor: colors.border,
          backgroundColor: colors.input,
        },
      ]}
    >
      <TextInput
        style={[styles.inputWithIcon, { color: colors.text }]}
        placeholder={placeholder}
        placeholderTextColor={colors.mutedText}
        secureTextEntry={!visible}
        autoCapitalize="none"
        value={value}
        onChangeText={onChangeText}
        returnKeyType={returnKeyType}
      />
      <Pressable onPress={onToggleVisible} style={styles.iconButton}>
        <Ionicons
          name={visible ? "eye-off-outline" : "eye-outline"}
          size={20}
          color={colors.mutedText}
        />
      </Pressable>
    </View>
  );
}
