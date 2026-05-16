import type { ActivityKind } from "../src/context/activity-context";
import { useActivityContext } from "../src/context/activity-context";
import { useAuth } from "../src/context/auth-context";

export function useActivity(type: ActivityKind) {
  const { user } = useAuth();
  const { generatedItems, scannedItems, loading, refreshActivity } =
    useActivityContext();
  const items = type === "generated" ? generatedItems : scannedItems;

  return { items, user, loading, refreshActivity };
}

export const formatDate = (value: string) =>
  new Date(value).toLocaleString("es-MX", {
    dateStyle: "medium",
    timeStyle: "short",
  });
