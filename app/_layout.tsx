import { MoviesProvider } from "@/contexts/SavedMovieContext";
import { UserProvider } from "@/contexts/UserContext";
import env from '@/env';
import { Stack } from "expo-router";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import "./global.css";



export default function RootLayout() {

  useEffect(() => {
    if (typeof process === 'undefined') {
      (global as any).process = { env };
    } else {
      process.env = { ...process.env, ...env };
    }
  }, [])

  return (
    <>
      <UserProvider>
        <MoviesProvider>
          <StatusBar hidden={true} />
          <Stack >
            <Stack.Screen
              name="(tabs)"
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="movies/[id]"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="login"
              options={{ headerShown: false }}
            />
          </ Stack>
        </MoviesProvider>
      </UserProvider>
    </>);
}
