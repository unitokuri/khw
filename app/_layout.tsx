import { Stack } from "expo-router";
import { UserContextProvider } from "@/contexts";

export default function RootLayout() {
  return (
    <UserContextProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </UserContextProvider>
  );
}
