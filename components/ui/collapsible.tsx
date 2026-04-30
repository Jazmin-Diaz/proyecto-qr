import { PropsWithChildren, useState } from 'react';
import { TouchableOpacity } from 'react-native';

import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";
import { IconSymbol } from "./icon-symbol";
import { Colors } from "../../styles/theme";
import { useColorScheme } from "../../hooks/use-color-scheme";
import { collapsibleStyles } from "../../styles/collapsibleStyles";

export function Collapsible({ children, title }: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useColorScheme() ?? 'light';

  return (
    <ThemedView>
      <TouchableOpacity
        style={collapsibleStyles.heading}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}>
        <IconSymbol
          name="chevron.right"
          size={18}
          weight="medium"
          color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
          style={isOpen ? collapsibleStyles.chevronOpen : collapsibleStyles.chevronClosed}
        />

        <ThemedText type="defaultSemiBold">{title}</ThemedText>
      </TouchableOpacity>
      {isOpen && <ThemedView style={collapsibleStyles.content}>{children}</ThemedView>}
    </ThemedView>
  );
}
