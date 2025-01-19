import { Link, Tabs, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable, Text } from "react-native";
import { trpc } from "../../../lib/trpc";
import { setStatusBarHidden } from "expo-status-bar";

export default function Screen() {
  const { id } = useLocalSearchParams();
  const [data] = trpc.route.get.useSuspenseQuery({
    routeId: id as string,
  });

  return (
    <SafeAreaView>
      <Text>{data.name}</Text>
      {data.stops.map((stop) => (
        <Text key={stop.id}>{stop.name}</Text>
      ))}
      <Link
        href={{
          pathname: "/route/[id]/go",
          params: { id: id as string },
        }}
      >
        Go
      </Link>
    </SafeAreaView>
  );
}
