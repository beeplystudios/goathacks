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
  const [selectedColor, setSelectedColor] = useState<RouteColor | undefined>();
  const [busStops, setBusStops] = useState<BusStopType[]>([]);
  const [busRoutes, setBusRoutes] = useState<BusRouteType[]>([]);
  const auth = useAuth();

  if (!auth.isSignedIn) return <Redirect href={"/(auth)"} />;

  // FUCKING HORROR SHOW
  useEffect(() => {
    const data: BusStopType[] = [
      {
        route: "M14",
        coords: {
          latitude: 42.255,
          longitude: -71.795,
        },
      },
      {
        route: "M14",
        coords: {
          latitude: 42.257,
          longitude: -71.79,
        },
      },
      {
        route: "Santiago",
        coords: {
          latitude: 42.257,
          longitude: -71.79,
        },
      },
    ];
    setBusStops(data);
    setTimeout(() => setBusStops([...data]), 250);
    setBusRoutes([
      { route: "M14", routeColor: "aqua" },
      { route: "Santiago", routeColor: "gold" },
    ]);
  }, []);

  useEffect(() => {
    setSelectedColor(
      busRoutes.find((r) => r.route === selectedRoute)?.routeColor
    );
  }, [selectedRoute]);

  return (
    <View className="flex-1 gap-4 overflow-hidden items-center justify-center bg-gray-800">
      <MapView
        style={styles.map}
        showsUserLocation
        initialRegion={
          coords && {
            ...coords,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }
        }
      >
        {busStops.map(
          (stop, index) =>
            stop.route === selectedRoute && (
              <Marker
                key={`coordinate_${index}`}
                coordinate={stop.coords}
                pinColor={selectedColor}
              />
            )
        )}
        {process.env.EXPO_PUBLIC_MAPS_API_KEY && busStops.length > 0 && (
          <MapViewDirections
            origin={busStops[0].coords}
            destination={busStops[busStops.length - 1].coords}
            waypoints={busStops.slice(1, -1).map((b) => b.coords)}
            apikey={process.env.EXPO_PUBLIC_MAPS_API_KEY}
            strokeWidth={3}
            strokeColor={selectedColor}
          />
        )}
      </MapView>
      <ScrollView className="max-h-72 w-[90%] rounded-lg bg-black/40">
        {busRoutes.map((r) => (
          <BusRoute {...r} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "90%",
    aspectRatio: 1,
    borderRadius: 12,
  },
});
