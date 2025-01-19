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
  const [data] = trpc.busSession.get.useSuspenseQuery();
  const mutation = trpc.busSession.delete.useMutation();
  const utils = trpc.useUtils();

  return (
    <SafeAreaView className="flex-1 p-8 gap-4 overflow-hidden bg-neutral-500">
      {!data ? (
        <Link
          href={"/check-in"}
          className="text-lg bg-primary-500 text-white font-medium rounded-md p-3 text-center"
        >
          Clock in
        </Link>
      ) : (
        <View className="flex flex-col gap-4">
          <Link
            href={{
              pathname: "/route/[id]/go",
              params: { id: data.routeId as string },
            }}
            className="text-lg bg-primary-500 text-white font-medium rounded-md p-3 text-center"
          >
            Return to Navigation
          </Link>
          <Pressable
            onPress={async () => {
              await mutation.mutateAsync();

              await utils.busSession.invalidate();
            }}
          >
            <Text className="text-lg bg-feedback-error-primary text-white font-medium rounded-md p-3 text-center">
              Clock Out
            </Text>
          </Pressable>
        </View>
      )}
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
