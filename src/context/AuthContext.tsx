import { createContext, useContext, useState, ReactNode } from "react";

interface AuthState {
  isLoggedIn: boolean;
  isNewUser: boolean;
  hasSeenWelcome: boolean;
  hasCompletedOnboarding: boolean;
  username: string;
}

interface AuthContextType extends AuthState {
  signIn: (username: string) => void;
  signUp: (username: string) => void;
  markWelcomeSeen: () => void;
  completeOnboarding: () => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    isLoggedIn: false,
    isNewUser: false,
    hasSeenWelcome: false,
    hasCompletedOnboarding: false,
    username: "",
  });

  const signIn = (username: string) =>
    setState({
      isLoggedIn: true,
      isNewUser: false,
      hasSeenWelcome: false,
      hasCompletedOnboarding: false,
      username,
    });

  const signUp = (username: string) =>
    setState({
      isLoggedIn: true,
      isNewUser: true,
      hasSeenWelcome: false,
      hasCompletedOnboarding: false,
      username,
    });

  const markWelcomeSeen = () =>
    setState((prev) => ({ ...prev, hasSeenWelcome: true }));

  const completeOnboarding = () =>
    setState((prev) => ({ ...prev, hasCompletedOnboarding: true }));

  const signOut = () =>
    setState({
      isLoggedIn: false,
      isNewUser: false,
      hasSeenWelcome: false,
      hasCompletedOnboarding: false,
      username: "",
    });

  return (
    <AuthContext.Provider
      value={{ ...state, signIn, signUp, markWelcomeSeen, completeOnboarding, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
