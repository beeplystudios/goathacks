import ThemedView from "../../components/ThemedView";
import { StyleSheet, View, Text } from "react-native";
import { Link } from "expo-router";

export default function TabTwoScreen() {
  return (
    <ThemedView className="flex-1 p-8 gap-4 overflow-hidden pt-20">
      <Link href={"/register-driver"}>
        <Text className="text-white text-lg bg-green-500 rounded-md p-3 text-center">
          Register as driver
        </Text>
      </Link>
    </ThemedView>
  );
}
