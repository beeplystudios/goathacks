import { SafeAreaView } from "react-native-safe-area-context";
import ThemedView from "../../components/ThemedView";
import { trpc } from "../../lib/trpc";
import { StyleSheet, View, Text, Button, Pressable } from "react-native";
import { verifyInstallation } from "nativewind";
import { Linking, Platform } from "react-native";
import { Link } from "expo-router";

export type OpenMapArgs = {
  lat: string | number;
  lng: string | number;
  label: string;
};

export const openMap = ({ lat, lng, label }: OpenMapArgs) => {
  const scheme = Platform.select({
    ios: `maps://?q=${label}&ll=${lat},${lng}`,
    android: `geo:${lat},${lng}?q=${lat},${lng}(${label})`,
  });

  if (scheme) {
    Linking.openURL(scheme).catch((err) =>
      console.error("Error opening map: ", err)
    );
  }
};

export default function TabTwoScreen() {
  verifyInstallation();

  return (
    <SafeAreaView className="">
      <View className="p-8">
        <View className="w-full bg-neutral-50 p-4 rounded-md border-neutral-200 border-[0.0125rem] flex flex-col gap-2">
          <Text className="text-2xl font-semibold">Good Morning</Text>
          <Link
            href="/check-in"
            className="bg-[#5DA8EC] flex text-center items-center p-2 rounded-md border-[0.0125rem] ">
            <Text className="font-bold">Check In</Text>
          </Link>
          <Link
            href={{
              pathname: "/driver/route/[id]/go",
              params: {
                id: "cm62ksg1g00000cjl2k9cd0z",
              },
            }}></Link>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center",
    color: "white",
  },
});
