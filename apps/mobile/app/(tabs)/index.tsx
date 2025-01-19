import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import useLocation from "../../hooks/useLocation";
import { LocationObjectCoords } from "expo-location";
import { BusRouteType, BusStopType, RouteColor } from "../../constants/BusData";
import MapViewDirections from "react-native-maps-directions";
import BusRoute from "../../components/BusRoute";
import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import { trpc } from "../../lib/trpc";

export default function App() {
  const { coords } = useLocation();
  const [selectedRoute, setSelectedRoute] = useState();
  const [selectedColor, setSelectedColor] = useState<string | undefined>();
  const [activeStops, setActiveStops] = useState<BusStopType[]>([]);
  // const [busStops, setBusStops] = useState<BusStopType[]>([]);
  // const [busRoutes, setBusRoutes] = useState<BusRouteType[]>([]);

  const [{ stops: busStops, routes: busRoutes }] =
    trpc.busSession.getAllRoutes.useSuspenseQuery(undefined, {
      refetchInterval: 5_000,
    });
  const auth = useAuth();

  if (!auth.isSignedIn) return <Redirect href={"/(auth)"} />;

  // // FUCKING HORROR SHOW
  useEffect(() => {
    setActiveStops(
      busStops.filter((stop) =>
        busRoutes.map((r) => r.route).includes(stop.route)
      )
    );
    setTimeout(
      () =>
        setActiveStops(
          busStops.filter((stop) =>
            busRoutes.map((r) => r.route).includes(stop.route)
          )
        ),
      250
    );
    // setBusRoutes([
    //   { route: "M14", routeColor: "aqua" },
    //   { route: "Santiago", routeColor: "gold" },
    // ]);
  }, [busStops]);

  useEffect(() => {
    setSelectedColor(
      busRoutes.find((r) => r.route === selectedRoute)?.routeColor
    );
  }, [selectedRoute]);

  return (
    <>
      <MapView
        style={styles.map}
        showsUserLocation
        initialRegion={
          coords && {
            ...coords,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }
        }>
        {activeStops?.map((stop, index) => (
          <Marker
            key={`coordinate_${index}`}
            coordinate={stop.coords}
            pinColor={busRoutes.find((r) => r.route === stop.route)?.routeColor}
          />
        ))}
        {process.env.EXPO_PUBLIC_MAPS_API_KEY &&
          activeStops.length > 0 &&
          busRoutes.map((route) => {
            const theseStops = activeStops.filter(
              (s) => s.route === route.route
            );
            if (theseStops.length < 2) return <View />;
            return (
              <MapViewDirections
                origin={theseStops[0].coords}
                destination={theseStops[theseStops.length - 1].coords}
                waypoints={theseStops.slice(1, -1).map((b) => b.coords)}
                apikey={process.env.EXPO_PUBLIC_MAPS_API_KEY ?? ""}
                strokeWidth={3}
                strokeColor={route.routeColor}
              />
            );
          })}
      </MapView>
      {busRoutes.length > 0 && (
        <ScrollView className="absolute bg-neutral-700 w-full bottom-0 h-[20%] rounded-t-lg">
          {busRoutes.map((r, i) => (
            <BusRoute {...r} key={i} />
          ))}
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
    aspectRatio: 1,
    borderRadius: 12,
  },
});
