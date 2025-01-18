import "../../global.css";
import { StyleSheet, Text } from "react-native";

import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import { trpc } from "@/lib/trpc";

export default function HomeScreen() {
  const [data] = trpc.rat.useSuspenseQuery();

  return (
    <ThemedView className="flex-1 p-8 gap-4 overflow-hidden pt-20">
      <ThemedView className="flex-row items-center gap-2">
        <ThemedText type="title">Projects</ThemedText>
        <Text className="text-white">{data}</Text>
      </ThemedView>
    </ThemedView>
  );
}
