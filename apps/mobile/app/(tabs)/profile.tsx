import { useEffect, useState } from "react";
import ThemedView from "../../components/ThemedView";
import { Link } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Pressable, Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { trpc } from "../../lib/trpc";
import { useAuth, useUser } from "@clerk/clerk-expo";

export default function TabTwoScreen() {
  const [isDriver] = trpc.driver.isRegistered.useSuspenseQuery();
  const unregister = trpc.driver.unregister.useMutation();
  const utils = trpc.useUtils();

  const { user, isLoaded } = useUser();

  return (
    <SafeAreaView className="flex-1 p-8 gap-8 overflow-hidden bg-neutral-500">
      <Text className="text-white font-semibold text-xl">My Profile</Text>

      {isLoaded && (
        <View className="bg-neutral-400 border-[0.125rem] border-neutral-300 p-4 rounded-xl flex flex-row items-center gap-4">
          <Image
            source={{ uri: user?.imageUrl }}
            height={64}
            width={64}
            className="rounded-full"
          />
          <View>
            <Text className="text-lg font-medium text-white">
              {user?.fullName}
            </Text>
            <Text className="text-lg font-medium text-neutral-50">
              {user?.emailAddresses[0].toString()}
            </Text>
          </View>
        </View>
      )}

      <View className="bg-neutral-400 border-[0.125rem] border-neutral-300 p-4 rounded-xl flex flex-col gap-4">
        <View>
          <Text className="text-white font-medium text-lg">Driver Status</Text>
          <Text className="text-neutral-50">
            {isDriver
              ? "You are currently registered as a bus driver with your local transit authority. If you are no longer employed in this position, you can unregister below. Please note that in order to re-register you will need to contact your employer."
              : "If you are currently employed as a bus driver with your local transit authority, you can contact them for a key and register below."}
          </Text>
        </View>
        {!isDriver ? (
          <Link
            href={"/register-driver"}
            className="text-lg bg-primary-500 text-white font-medium rounded-md p-3 text-center"
          >
            Register as Driver
          </Link>
        ) : (
          <Pressable
            onPress={async () => {
              await unregister.mutateAsync();
              await utils.driver.invalidate();
            }}
            className="w-full"
          >
            <Text className="text-lg bg-feedback-error-primary text-neutral-400 font-medium rounded-md p-3 text-center">
              Unregister as Driver
            </Text>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
}
