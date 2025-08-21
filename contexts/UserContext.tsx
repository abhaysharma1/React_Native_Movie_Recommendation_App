import { account } from "@/lib/appwrite";
import { toast } from "@/lib/toast";
import { useRouter } from "expo-router";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ID } from "react-native-appwrite";

interface User {
  $id: string;
  name?: string;
  email?: string;
  emailVerification?: boolean;
}

interface UserContextValue {
  current: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  toast: (message: string) => void;
}

const UserContext = createContext<UserContextValue | null>(null);

export function useUser() {
  return useContext(UserContext);
}

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
    const router = useRouter()

  const [user, setUser] = useState<User | null>(null);

  async function login(email: string, password: string) {
    try {
      await account.createEmailPasswordSession(email, password);
      const userData = await account.get();
      setUser(userData);
      toast('Welcome back. You are logged in');
      router.push("/(tabs)");
    } catch (error) {
      toast('Login failed');
      throw error;
    }
  }

  async function logout() {
    try {
      await account.deleteSession("current");
      setUser(null);
      toast('Logged out');
      router.push('/(tabs)')
    } catch (error) {
      toast('Logout failed');
      throw error;
    }
  }

  async function register(email: string, password: string) {
    try {
      await account.create(ID.unique(), email, password);
      await login(email, password);
      toast('Account created');
    } catch (error) {
      toast('Registration failed');
      throw error;
    }
  }

  async function init() {
    try {
      const userData = await account.get();
      setUser(userData);
      toast('Welcome back. You are logged in');
    } catch {
      setUser(null); // no active user session
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <UserContext.Provider value={{ current: user, login, logout, register, toast }}>
      {children}
    </UserContext.Provider>
  );
}
