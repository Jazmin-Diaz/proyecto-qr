import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Pressable, Text, View } from "react-native";
import { useAppTheme } from "../../hooks/use-app-theme";
import { addScannedItem } from "../../src/storage/activity";
import { styles } from "../../styles/homeStyles";

const CameraGuide = () => (
  <>
    <View style={[styles.corner, styles.cornerTopLeft]} />
    <View style={[styles.corner, styles.cornerTopRight]} />
    <View style={[styles.corner, styles.cornerBottomLeft]} />
    <View style={[styles.corner, styles.cornerBottomRight]} />
  </>
);

export default function Home() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const router = useRouter();
  const translateY = useRef(new Animated.Value(0)).current;
  const { colors } = useAppTheme();

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: 100,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: -100,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [translateY]);

  if (!permission?.granted) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Pressable onPress={requestPermission} style={styles.permissionButton}>
          <Text style={[styles.permissionText, { color: colors.accentContrast }]}>
            Activar Cámara
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.headerCornerContainer}>
        <Ionicons
          name="qr-code"
          size={26}
          color={colors.accent}
          style={styles.titleIcon}
        />
        <Text style={[styles.title, { color: colors.text }]}>My ScannApp</Text>
      </View>

      <View style={styles.mainContent}>
        <View style={[styles.cameraContainer, { shadowColor: colors.shadow }]}>
          <CameraView
            style={styles.camera}
            onBarcodeScanned={
              scanned
                ? undefined
                : async (event) => {
                    setScanned(true);
                    Haptics.notificationAsync(
                      Haptics.NotificationFeedbackType.Success,
                    );
                    await addScannedItem(event.data);
                    router.push({
                      pathname: "/resultado-scann",
                      params: { data: event.data },
                    });
                  }
            }
            barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
          />
          <View style={styles.centerFrameContainer}>
            <CameraGuide />
            <Animated.View
              style={[styles.laserLine, { transform: [{ translateY }] }]}
            />
          </View>
        </View>
      </View>

      <View style={styles.footerContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.scanButton,
            { opacity: pressed ? 0.8 : 1 },
          ]}
          onPress={() => {
            setScanned(false);
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }}
        >
          <Text style={[styles.buttonText, { color: colors.accentContrast }]}>
            Escanear
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
