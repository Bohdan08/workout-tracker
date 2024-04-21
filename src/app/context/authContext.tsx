"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/src/firebase/config";
import { addUserToken } from "../lib/actions/actions";

const TEN_MINUTES = 10 * 60 * 1000;

type UserContextType = { user: null | User; loadingUser: boolean };

// Create the authentication context
export const AuthContext = createContext<UserContextType>({
  user: null,
  loadingUser: false,
});

// // Custom hook to access the authentication context
// export const useAuthContext = () => useContext(AuthContext);

interface AuthContextProviderProps {
  children: ReactNode;
}

export function AuthContextProvider({
  children,
}: AuthContextProviderProps): JSX.Element {
  // Set up state to track the authenticated user and loading status
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Subscribe to the authentication state changes
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in
        const token = await user.getIdToken();
        setUser(user);
        addUserToken(token);
        setLoading(true);
      } else {
        // User is signed out
        setUser(null);
        addUserToken("");
      }
      // Set loading to false once authentication state is determined
      setLoading(false);
    });

    // Unsubscribe from the authentication state changes when the component is unmounted
    return () => unsubscribe();
  }, []);

  // refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      const user = auth.currentUser;

      if (user) await user.getIdToken(true);
    }, TEN_MINUTES);

    // clean up setInterval
    return () => clearInterval(handle);
  }, []);

  // Provide the authentication context to child components
  return (
    <AuthContext.Provider value={{ user, loadingUser: loading }}>
      {children}
      {/* {loading ? <div>Loading...</div> : children} */}
    </AuthContext.Provider>
  );
}
// Custom hook to access the authentication context
export const useAuth = () => useContext(AuthContext);
