import { Link, Tabs, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable, Text, View } from "react-native";

import { useEffect, useState } from "react";
import { getDistance } from "geolib";

import * as Location from "expo-location";
import { trpc } from "../../../../lib/trpc";

const StopView = (props: {
  origin: {
    lat: number;
    lon: number;
  };
  dest: {
    lat: number;
    lon: number;
  };
}) => {
  const [data] = trpc.route.getRouteInstructions.useSuspenseQuery({
    origin: props.origin,
    dest: props.dest,
  });

  return <View></View>;
};

export default function Screen() {
  const { id } = useLocalSearchParams();
  const [data] = trpc.route.get.useSuspenseQuery({
    routeId: id as string,
  });
  const [initialLocation, setInitialLocation] = useState<{
    lat: number;
    lon: number;
  } | null>(null);
  const [completedStepOne, setCompletedStepOne] = useState(false);

  const dest = {
    lat: data.stops[0].lat!,
    lon: data.stops[0].lon!,
  };

  useEffect(() => {
    let status: Location.PermissionStatus;

    const interval = setInterval(async () => {
      const { status: status_ } =
        await Location.requestForegroundPermissionsAsync();

      if (status_ !== "granted") {
        console.log("test");
        throw new Error();
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.LocationAccuracy.BestForNavigation,
      });

      const distance = getDistance(
        { lat: location.coords.latitude, lon: location.coords.longitude },
        {
          lat: dest.lat,
          lon: dest.lon,
        }
      );

      console.log(Date.now(), distance);

      if (distance <= 5) {
        setCompletedStepOne(true);
        console.log("COMPLETED STEP ONE!!");
      }

      if (!initialLocation) {
        setInitialLocation({
          lat: location.coords.latitude,
          lon: location.coords.longitude,
        });
      }
    }, 1_000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView>
      <Text>{data.name}</Text>
      {initialLocation && (
        <StopView
          origin={initialLocation}
          dest={{ lat: dest.lat, lon: dest.lon }}
        />
      )}
      {completedStepOne && (
        <Text className="font-bold text-red-300 text-2xl">
          COMPLETED STEP ONE!!
        </Text>
      )}
    </SafeAreaView>
  );
}
