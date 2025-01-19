import "../global.css";
import { Stack } from "expo-router";
import { setStatusBarHidden, StatusBar } from "expo-status-bar";
import { ClerkProvider, ClerkLoaded, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from "@/../cache";
import { Platform } from "react-native";
import { trpc } from "../lib/trpc";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";
import SuperJSON from "superjson";

const InnerLayout = () => {
  const { isSignedIn, getToken } = useAuth();
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${process.env.EXPO_PUBLIC_API_URL}/trpc`,
          async headers() {
            const token = await getToken();
            return {
              Authorization: !isSignedIn ? undefined : `Bearer ${token}`,
            };
          },
          transformer: SuperJSON,
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
              statusBarHidden: Platform.OS !== "ios",
            }}
          />
          <Stack.Screen
            name="(auth)"
            options={{
              headerShown: false,
              statusBarHidden: Platform.OS !== "ios",
            }}
          />
          <Stack.Screen
            name="check-in"
            options={{
              presentation: "modal",
              statusBarHidden: Platform.OS !== "ios",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="route/[id]/index"
            options={{
              statusBarHidden: Platform.OS !== "ios",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="route/[id]/go"
            options={{
              statusBarHidden: Platform.OS !== "ios",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="register-driver"
            options={{
              statusBarHidden: Platform.OS !== "ios",
              headerShown: false,
            }}
          />
          {/* <StatusBar hidden /> */}
        </Stack>
      </QueryClientProvider>
    </trpc.Provider>
  );
};

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
        <InnerLayout />
      </ClerkLoaded>
    </ClerkProvider>
  );
};

export default RootLayout;
