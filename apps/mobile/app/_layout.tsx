import "../global.css";
import { Stack } from "expo-router";
import { setStatusBarHidden, StatusBar } from "expo-status-bar";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { tokenCache } from "@/../cache";
import { Platform } from "react-native";
import { trpc } from "../lib/trpc";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";
import SuperJSON from "superjson";

const RootLayout = () => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${process.env.EXPO_PUBLIC_API_URL}/trpc`,
          transformer: SuperJSON,
        }),
      ],
    })
  );

  setStatusBarHidden(true);
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

  if (!publishableKey) {
    throw new Error(
      "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
    );
  }
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
          <ClerkLoaded>
            <Stack>
              <Stack.Screen
                name="(tabs)"
                options={{
                  headerShown: false,
                  statusBarHidden: Platform.OS !== "ios",
                }}
              />
              <Stack.Screen
                name="check-in"
                options={{
                  presentation: "modal",
                  statusBarHidden: true,
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="route/[id]/go"
                options={{
                  statusBarHidden: true,
                  headerShown: false,
                }}
              />
              <StatusBar hidden />
            </Stack>
          </ClerkLoaded>
        </ClerkProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default RootLayout;
