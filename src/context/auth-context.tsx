import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { AuthUser } from "../services/auth";
import { getCurrentSession, logoutUser } from "../services/auth";
import {
  clearSessionToken,
  getSessionToken,
  saveSessionToken,
} from "../storage/session";

type AuthSession = {
  usuario: AuthUser;
  token: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  loading: boolean;
  refreshSession: () => Promise<void>;
  signIn: (session: AuthSession) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshSession = useCallback(async () => {
    setLoading(true);
    try {
      const token = await getSessionToken();

      if (!token) {
        setUser(null);
        return;
      }

      const response = await getCurrentSession(token);
      await saveSessionToken(response.token);
      setUser(response.usuario);
    } catch {
      await clearSessionToken();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshSession();
  }, [refreshSession]);

  const signIn = useCallback(async (session: AuthSession) => {
    await saveSessionToken(session.token);
    setUser(session.usuario);
  }, []);

  const signOut = useCallback(async () => {
    const token = await getSessionToken();
    if (token) {
      try {
        await logoutUser(token);
      } catch {
        // The local token is removed even if the server is unreachable.
      }
    }

    await clearSessionToken();
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      refreshSession,
      signIn,
      signOut,
    }),
    [loading, refreshSession, signIn, signOut, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
