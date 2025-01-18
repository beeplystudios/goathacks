import { Stack } from "expo-router";
import { setStatusBarHidden, StatusBar } from "expo-status-bar";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { tokenCache } from "@/../cache";

const RootLayout = () => {
  setStatusBarHidden(true);
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

  if (!publishableKey) {
    throw new Error(
      "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
    );
  }
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false, statusBarHidden: true }}
          />
          <StatusBar hidden />
        </Stack>
      </ClerkLoaded>
    </ClerkProvider>
  );
};

export default RootLayout;
