import Constants from "expo-constants";
import { Platform } from "react-native";

const resolveExpoHost = () => {
  const expoConfigHost = Constants.expoConfig?.hostUri;

  if (expoConfigHost) {
    return expoConfigHost.split(":")[0];
  }

  const legacyHost = (Constants as any)?.manifest2?.extra?.expoClient?.hostUri;
  if (legacyHost) {
    return String(legacyHost).split(":")[0];
  }

  return Platform.select({
    android: "10.0.2.2",
    default: "localhost",
  });
};

const resolvedBaseUrl = `http://${resolveExpoHost()}:3000`;

export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL?.trim() || resolvedBaseUrl;
