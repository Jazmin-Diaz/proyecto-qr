import { useRef } from "react";
import ViewShot from "react-native-view-shot";
import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";
import { Alert } from "react-native";

export function useQrCapture() {
  const viewShotRef = useRef<ViewShot | null>(null);

  const captureQrImage = async () => {
    if (!viewShotRef.current) {
      throw new Error("No se pudo preparar la imagen del QR.");
    }
    const uri = await viewShotRef.current.capture?.();
    if (!uri) {
      throw new Error("No se pudo capturar la imagen del QR.");
    }
    return uri;
  };

  const createPngFileFromCapture = async () => {
    const capturedUri = await captureQrImage();
    if (!FileSystem.cacheDirectory) return capturedUri;
    const targetUri = `${FileSystem.cacheDirectory}qr-${Date.now()}.png`;
    await FileSystem.copyAsync({ from: capturedUri, to: targetUri });
    return targetUri;
  };

  const compartirUri = async (uri: string) => {
    if (!(await Sharing.isAvailableAsync())) {
      Alert.alert("Error", "Compartir no está disponible.");
      return;
    }
    await Sharing.shareAsync(uri, {
      mimeType: "image/png",
      dialogTitle: "Guardar o compartir código QR",
      UTI: "public.png",
    });
  };

  const compartirQR = async () => {
    try {
      const uri = await createPngFileFromCapture();
      await compartirUri(uri);
    } catch {
      Alert.alert("Error", "No se pudo compartir.");
    }
  };

  return {
    viewShotRef,
    compartirQR,
  };
}
