import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import type { AuthUser } from "../src/services/auth";
import { getSession } from "../src/storage/session";

export function useSession() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const loadSession = async () => {
        setLoading(true);
        const session = await getSession();
        setUser(session);
        setLoading(false);
      };

      loadSession();
    }, []),
  );

  return { user, loading };
}