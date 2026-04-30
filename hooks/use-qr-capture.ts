import { useRef, useState } from "react";
import ViewShot from "react-native-view-shot";
import * as FileSystem from "expo-file-system/legacy";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import Constants from "expo-constants";
import { Alert, Platform } from "react-native";

export function useQrCapture() {
  const viewShotRef = useRef<ViewShot | null>(null);
  const [activeAction, setActiveAction] = useState<"save" | "share">("save");

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

  const guardarQR = async () => {
    setActiveAction("save");
    try {
      const permission = await MediaLibrary.requestPermissionsAsync(true, ["photo"]);
      if (!permission.granted) {
        Alert.alert("Permiso Denegado", "Ve a Ajustes y permite el acceso a Fotos.");
        return;
      }
      const uri = await createPngFileFromCapture();
      await MediaLibrary.saveToLibraryAsync(uri);
      Alert.alert("¡Logrado!", "El código QR ya está en tu galería.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "No se pudo guardar la imagen.";
      const isExpoGoAndroid = Platform.OS === "android" && Constants.appOwnership === "expo";
      try {
        const uri = await createPngFileFromCapture();
        Alert.alert("No se pudo guardar directo", isExpoGoAndroid ? "" : message);
        await compartirUri(uri);
      } catch {
        Alert.alert("Error al guardar", isExpoGoAndroid ? "" : message);
      }
    }
  };

  const compartirQR = async () => {
    setActiveAction("share");
    try {
      const uri = await createPngFileFromCapture();
      await compartirUri(uri);
    } catch {
      Alert.alert("Error", "No se pudo compartir.");
    }
  };

  return {
    viewShotRef,
    activeAction,
    guardarQR,
    compartirQR,
  };
}
