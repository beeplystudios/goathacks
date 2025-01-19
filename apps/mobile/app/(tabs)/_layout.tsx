import { Tabs } from "expo-router";
import React, { useEffect, useState } from "react";
import { Platform } from "react-native";

import TabBarBackground from "../../components/ui/TabBarBackground";
import { Colors } from "../../constants/Colors";
import { useColorScheme } from "../../hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "../../lib/trpc";
import { httpBatchLink } from "@trpc/client";
import SuperJSON from "superjson";
import { setStatusBarHidden } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  setStatusBarHidden(true);

  // const [driverCertificate, setDriverCertificate] = useState<string | null>(
  //   null
  // );

  // useEffect(() => {
  //   AsyncStorage.getItem("driver-certificate").then((val) => {
  //     if (val) setDriverCertificate(val);
  //   });
  // }, [setDriverCertificate, AsyncStorage]);

  const [isRegistered] = trpc.driver.isRegistered.useSuspenseQuery();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "dark"].tint,
        headerShown: false,
        tabBarBackground: TabBarBackground,
        headerStatusBarHeight: 0,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
            borderTopWidth: 0,
          },
          default: { borderTopWidth: 0 },
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="map" size={24} color={color} />
          ),
          title: "Go",
        }}
      />
      <Tabs.Screen
        name="driver/index"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="bus" size={24} color={color} />
          ),
          title: "Drive",
          href: isRegistered ? "/(tabs)/driver" : null,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={24} color={color} />
          ),
          title: "Profile",
        }}
      />
    </Tabs>
  );
}
