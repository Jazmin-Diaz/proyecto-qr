import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import type { ActivityItem } from "../src/storage/activity";
import { getGeneratedItems, getScannedItems } from "../src/storage/activity";
import { getSession } from "../src/storage/session";
import type { AuthUser } from "../src/services/auth";

export function useActivity(type: "generated" | "scanned") {
  const [items, setItems] = useState<ActivityItem[]>([]);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    const session = await getSession();
    setUser(session);

    if (!session) {
      setItems([]);
      setLoading(false);
      return;
    }

    const data = type === "generated" 
      ? await getGeneratedItems() 
      : await getScannedItems();
    
    setItems(data);
    setLoading(false);
  }, [type]);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData]),
  );

  return { items, user, loading };
}

export const formatDate = (value: string) =>
  new Date(value).toLocaleString("es-MX", {
    dateStyle: "medium",
    timeStyle: "short",
  });