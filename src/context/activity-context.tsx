import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ActivityItem } from "../storage/activity";
import {
  addGeneratedItem as saveGeneratedItem,
  addScannedItem as saveScannedItem,
  clearGeneratedItems,
  clearScannedItems,
  getGeneratedItems,
  getScannedItems,
} from "../storage/activity";
import { useAuth } from "./auth-context";

type ActivityKind = "generated" | "scanned";

type ActivityContextValue = {
  generatedItems: ActivityItem[];
  scannedItems: ActivityItem[];
  loading: boolean;
  refreshActivity: () => Promise<void>;
  addGeneratedItem: (value: string) => Promise<void>;
  addScannedItem: (value: string) => Promise<void>;
  clearGeneratedHistory: () => Promise<void>;
  clearScannedHistory: () => Promise<void>;
};

const ActivityContext = createContext<ActivityContextValue | null>(null);

export function ActivityProvider({ children }: PropsWithChildren) {
  const { user } = useAuth();
  const [generatedItems, setGeneratedItems] = useState<ActivityItem[]>([]);
  const [scannedItems, setScannedItems] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshActivity = useCallback(async () => {
    setLoading(true);

    if (!user) {
      setGeneratedItems([]);
      setScannedItems([]);
      setLoading(false);
      return;
    }

    const [generated, scanned] = await Promise.all([
      getGeneratedItems(),
      getScannedItems(),
    ]);

    setGeneratedItems(generated);
    setScannedItems(scanned);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    refreshActivity();
  }, [refreshActivity]);

  const addGeneratedItem = useCallback(
    async (value: string) => {
      await saveGeneratedItem(value);
      await refreshActivity();
    },
    [refreshActivity],
  );

  const addScannedItem = useCallback(
    async (value: string) => {
      await saveScannedItem(value);
      await refreshActivity();
    },
    [refreshActivity],
  );

  const clearGeneratedHistory = useCallback(async () => {
    await clearGeneratedItems();
    setGeneratedItems([]);
  }, []);

  const clearScannedHistory = useCallback(async () => {
    await clearScannedItems();
    setScannedItems([]);
  }, []);

  const value = useMemo<ActivityContextValue>(
    () => ({
      generatedItems,
      scannedItems,
      loading,
      refreshActivity,
      addGeneratedItem,
      addScannedItem,
      clearGeneratedHistory,
      clearScannedHistory,
    }),
    [
      addGeneratedItem,
      addScannedItem,
      clearGeneratedHistory,
      clearScannedHistory,
      generatedItems,
      loading,
      refreshActivity,
      scannedItems,
    ],
  );

  return (
    <ActivityContext.Provider value={value}>
      {children}
    </ActivityContext.Provider>
  );
}

export function useActivityContext() {
  const context = useContext(ActivityContext);

  if (!context) {
    throw new Error("useActivityContext must be used inside ActivityProvider");
  }

  return context;
}

export type { ActivityKind };
