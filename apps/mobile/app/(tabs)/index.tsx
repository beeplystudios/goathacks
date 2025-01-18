import "../../global.css"
import { StyleSheet, Text } from "react-native";

import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import { trpc } from "@/lib/trpc";

export default function HomeScreen() {
  const [data] = trpc.rat.useSuspenseQuery();

  return (
    <ThemedView style={styles.content}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Projects</ThemedText>
        <Text className="text-white">{data}</Text>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: "hidden",
    paddingTop: 86,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  noProjectsWrapper: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    width: "100%",
    padding: "10%",
    marginBottom: 86,
    gap: 8,
  },
  noProjectsText: {
    fontSize: 32,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  grid: {
    marginBottom: 52,
  },
  footer: {
    position: "absolute",
    right: 12,
  },
});
