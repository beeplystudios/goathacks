import { Link, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable, Text, View } from "react-native";
import { trpc } from "../../../lib/trpc";
import { setStatusBarHidden } from "expo-status-bar";

export default function Screen() {
  const { id } = useLocalSearchParams();
  const [data] = trpc.route.get.useSuspenseQuery({
    routeId: id as string,
  });

  setStatusBarHidden(true);

  return (
    <SafeAreaView className="bg-neutral-700 p-8 h-screen flex flex-col gap-4">
      <Text className="text-white text-2xl font-semibold">
        Today's trip is on {data.name}
      </Text>
      <Text className="text-white text-xl font-medium">Stops</Text>
      {data.stops.map((stop) => (
        <View className="bg-neutral-500 p-6 border-[0.5px] border-neutral-300 rounded-lg">
          <Text key={stop.id} className="text-white">
            {stop.name}
          </Text>
        </View>
      ))}
      <Link
        href={{
          pathname: "/route/[id]/go",
          params: { id: id as string },
        }}
        className="text-lg bg-primary-500 text-white font-medium rounded-md p-3 text-center"
      >
        Start Trip
      </Link>
    </SafeAreaView>
  );
}
