import { useAuth } from "../src/context/auth-context";

export function useSession() {
  const { user, loading } = useAuth();

  return { user, loading };
}
