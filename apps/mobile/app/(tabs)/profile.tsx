import { useEffect, useState } from "react";
import ThemedView from "../../components/ThemedView";
import { Link } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabTwoScreen() {
  const [driverCertificate, setDriverCertificate] = useState<string | null>(
    null
  );

  useEffect(() => {
    AsyncStorage.getItem("driver-certificate").then((item) => {
      if (item !== null) setDriverCertificate(item);
    });
  }, [setDriverCertificate]);

  return (
    <SafeAreaView className="flex-1 p-8 gap-4 overflow-hidden bg-neutral-500">
      {driverCertificate === null ? (
        <Link
          href={"/register-driver"}
          className="text-white text-lg bg-green-600 rounded-md p-3 text-center">
          Register as driver
        </Link>
      ) : (
        <Pressable
          onPress={() => {
            AsyncStorage.removeItem("driver-certificate");
            setDriverCertificate(null);
          }}
          className="bg-red-700 rounded-md p-3">
          <Text className="text-white text-lg text-center">
            Unregister as driver
          </Text>
        </Pressable>
      )}
    </SafeAreaView>
  );
}
