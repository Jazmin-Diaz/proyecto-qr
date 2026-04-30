import AsyncStorage from "@react-native-async-storage/async-storage";
import { getSession } from "./session";

export type ActivityItem = {
  id: string;
  value: string;
  createdAt: string;
};

const MAX_ITEMS = 100;

const buildKey = (userId: string, kind: "generated" | "scanned") =>
  `activity_${kind}_v1_${userId}`;

const getUserId = async () => {
  const session = await getSession();
  return session?.id ?? null;
};

const readItems = async (key: string) => {
  const rawValue = await AsyncStorage.getItem(key);

  if (!rawValue) {
    return [] as ActivityItem[];
  }

  try {
    const parsed = JSON.parse(rawValue) as ActivityItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    await AsyncStorage.removeItem(key);
    return [] as ActivityItem[];
  }
};

const writeItems = async (key: string, items: ActivityItem[]) => {
  await AsyncStorage.setItem(key, JSON.stringify(items.slice(0, MAX_ITEMS)));
};

const addItem = async (kind: "generated" | "scanned", value: string) => {
  const userId = await getUserId();
  if (!userId || !value.trim()) {
    return;
  }

  const key = buildKey(userId, kind);
  const currentItems = await readItems(key);
  const newItem: ActivityItem = {
    id: `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    value: value.trim(),
    createdAt: new Date().toISOString(),
  };

  await writeItems(key, [newItem, ...currentItems]);
};

const getItems = async (kind: "generated" | "scanned") => {
  const userId = await getUserId();
  if (!userId) {
    return [] as ActivityItem[];
  }

  return readItems(buildKey(userId, kind));
};

const clearItems = async (kind: "generated" | "scanned") => {
  const userId = await getUserId();
  if (!userId) {
    return;
  }

  await AsyncStorage.removeItem(buildKey(userId, kind));
};

export const addGeneratedItem = async (value: string) =>
  addItem("generated", value);
export const addScannedItem = async (value: string) => addItem("scanned", value);
export const getGeneratedItems = async () => getItems("generated");
export const getScannedItems = async () => getItems("scanned");
export const clearGeneratedItems = async () => clearItems("generated");
export const clearScannedItems = async () => clearItems("scanned");
