import ThemedView from "../../components/ThemedView";
import { StyleSheet, View, Text } from "react-native";
import { Link } from "expo-router";
import { LinkingContext } from "@react-navigation/native";

export default function TabTwoScreen() {
  return (
    <ThemedView className="flex-1 p-8 gap-4 overflow-hidden pt-20">
      <Link
        href="/register-driver"
        className="text-white text-lg bg-green-500 rounded-md p-3 text-center"
      >
        Register as driver
      </Link>
    </ThemedView>
  );
}
