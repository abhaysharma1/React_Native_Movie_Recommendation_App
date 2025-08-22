import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import "./global.css";
import { UserProvider } from "@/contexts/UserContext";
import { MoviesProvider } from "@/contexts/SavedMovieContext";



export default function RootLayout() {
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
