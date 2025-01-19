import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import useLocation from "../../hooks/useLocation";
import { LocationObjectCoords } from "expo-location";
import { BusStopType } from "../../constants/BusData";
import MapViewDirections from "react-native-maps-directions";

export default function App() {
  const { coords } = useLocation();
  const [selectedRoute, setSelectedRoute] = useState();
  const [busStops, setBusStops] = useState<BusStopType[]>([]);

  // FUCKING HORROR SHOW
  useEffect(() => {
    const data: BusStopType[] = [
      {
        route: "M14",
        routeColor: "aqua",
        coords: {
          latitude: 42.255,
          longitude: -71.795,
        },
      },
      {
        route: "M14",
        routeColor: "aqua",
        coords: {
          latitude: 42.257,
          longitude: -71.79,
        },
      },
    ];
    setBusStops(data);
    setTimeout(() => setBusStops([...data]), 250);
  }, []);

  return (
    <View className="flex-1 gap-4 overflow-hidden pt-20 items-center justify-center bg-gray-800">
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
        {busStops.map(
          (stop, index) =>
            stop.route === selectedRoute && (
              <Marker
                key={`coordinate_${index}`}
                coordinate={stop.coords}
                pinColor={stop.routeColor}
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
            strokeColor={busStops[0].routeColor}
          />
        )}
      </MapView>
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
