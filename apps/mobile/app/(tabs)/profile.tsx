import { useEffect, useState } from "react";
import ThemedView from "../../components/ThemedView";
import { Link } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { trpc } from "../../lib/trpc";

export default function TabTwoScreen() {
  const [isDriver] = trpc.driver.isRegistered.useSuspenseQuery();
  const unregister = trpc.driver.unregister.useMutation();
  const utils = trpc.useUtils();

  return (
    <SafeAreaView className="flex-1 p-8 gap-4 overflow-hidden bg-neutral-500">
      {!isDriver ? (
        <Link
          href={"/register-driver"}
          className="text-white text-lg bg-green-600 rounded-md p-3 text-center"
        >
          Register as driver
        </Link>
      ) : (
        <Pressable
          onPress={async () => {
            await unregister.mutateAsync();
            await utils.driver.invalidate();
          }}
          className="bg-red-700 rounded-md p-3"
        >
          <Text className="text-white text-lg text-center">
            Unregister as driver
          </Text>
        </Pressable>
      )}
    </SafeAreaView>
  );
}
