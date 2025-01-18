import { useEffect, useState } from "react";
import ThemedView from "../../components/ThemedView";
import { Link } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Pressable, Text } from "react-native";

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
    <ThemedView className="flex-1 p-8 gap-4 overflow-hidden pt-20">
      {driverCertificate === null ? (
        <Link
          href={"/register-driver"}
          className="text-white text-lg bg-green-600 rounded-md p-3 text-center"
        >
          Register as driver
        </Link>
      ) : (
        <Pressable
          onPress={() => {
            AsyncStorage.removeItem("driver-certificate");
            setDriverCertificate(null);
          }}
          className="text-white text-lg bg-red-600 rounded-md p-3 text-center"
        >
          <Text>Unregister as driver</Text>
        </Pressable>
      )}
    </ThemedView>
  );
}
