import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ActivityItem, ActivityKind } from "../services/activity";
import {
  addActivityItem,
  clearActivityItems,
  getActivityItems,
} from "../services/activity";
import { useAuth } from "./auth-context";

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

    try {
      const [generated, scanned] = await Promise.all([
        getActivityItems(user.id, "generated"),
        getActivityItems(user.id, "scanned"),
      ]);

      setGeneratedItems(generated);
      setScannedItems(scanned);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    refreshActivity();
  }, [refreshActivity]);

  const addGeneratedItem = useCallback(
    async (value: string) => {
      if (!user) return;
      await addActivityItem(user.id, "generated", value);
      await refreshActivity();
    },
    [refreshActivity, user],
  );

  const addScannedItem = useCallback(
    async (value: string) => {
      if (!user) return;
      await addActivityItem(user.id, "scanned", value);
      await refreshActivity();
    },
    [refreshActivity, user],
  );

  const clearGeneratedHistory = useCallback(async () => {
    if (!user) return;
    await clearActivityItems(user.id, "generated");
    setGeneratedItems([]);
  }, [user]);

  const clearScannedHistory = useCallback(async () => {
    if (!user) return;
    await clearActivityItems(user.id, "scanned");
    setScannedItems([]);
  }, [user]);

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
