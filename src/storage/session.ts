import AsyncStorage from "@react-native-async-storage/async-storage";
import type { AuthUser } from "../services/auth";

const SESSION_KEY = "auth_user_v1";

export const saveSession = async (user: AuthUser) => {
  await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(user));
};

export const getSession = async () => {
  const rawData = await AsyncStorage.getItem(SESSION_KEY);
  if (!rawData) {
    return null;
  }

  try {
    return JSON.parse(rawData) as AuthUser;
  } catch {
    await AsyncStorage.removeItem(SESSION_KEY);
    return null;
  }
};

export const clearSession = async () => {
  await AsyncStorage.removeItem(SESSION_KEY);
};
