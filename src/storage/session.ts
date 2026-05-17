import * as SecureStore from "expo-secure-store";

const SESSION_TOKEN_KEY = "auth_session_token_v1";

export const saveSessionToken = async (token: string) => {
  await SecureStore.setItemAsync(SESSION_TOKEN_KEY, token);
};

export const getSessionToken = async () =>
  SecureStore.getItemAsync(SESSION_TOKEN_KEY);

export const clearSessionToken = async () => {
  await SecureStore.deleteItemAsync(SESSION_TOKEN_KEY);
};
