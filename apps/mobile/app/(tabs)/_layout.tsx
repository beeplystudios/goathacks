import { Tabs, useFocusEffect } from "expo-router";
import React, { useState } from "react";
import { Platform } from "react-native";

import HapticTab from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";
import { setStatusBarHidden } from "expo-status-bar";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  setStatusBarHidden(true);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "dark"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
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
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="grid-outline" size={24} color={color} />
          ),
          title: "Projects",
        }}
      />
      <Tabs.Screen
        name="camera"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="camera-outline" size={24} color={color} />
          ),
          title: "Camera",
        }}
      />
    </Tabs>
  );
}
