import { SafeAreaView } from "react-native-safe-area-context";
import ThemedView from "../../../components/ThemedView";
import { trpc } from "../../../lib/trpc";
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
    <SafeAreaView className="flex-1 p-8 gap-4 overflow-hidden bg-neutral-500">
      <Link
        href={"/check-in"}
        className="text-lg bg-[#5DA8EC] rounded-md p-3 text-center">
        Clock in
      </Link>
      <Link
        href={{
          pathname: "/route/[id]/go",
          params: {
            id: "cm62ksg1g00000cjl2k9cd0z",
          },
        }}></Link>
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
