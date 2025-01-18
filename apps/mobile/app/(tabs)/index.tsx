import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import useLocation from "../../hooks/useLocation";
import { LocationObjectCoords } from "expo-location";
import { BusStopType } from "../../constants/BusData";

export default function App() {
  const { coords } = useLocation();
  const [location, setLocation] = useState<LocationObjectCoords | undefined>();

  const busStops: BusStopType[] = [
    {
      route: "M14",
      routeColor: "aqua",
      coords: {
        latitude: 30,
        longitude: -70,
      },
    },
  ];

  useEffect(() => {
    setLocation(coords);
  }, [coords]);

  return (
    <View className="flex-1 gap-4 overflow-hidden pt-20 items-center justify-center bg-gray-800">
      <MapView
        style={styles.map}
        initialRegion={
          location && {
            ...location,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }
        }>
        <Marker coordinate={location ?? { latitude: 0, longitude: 0 }} />

        {/* {coordinates.map((coordinate, index) => (
          <Marker key={`coordinate_${index}`} coordinate={coordinate} />
        ))} 
        <MapViewDirections
          origin={coordinates[0]}
          destination={coordinates[1]}
          strokeWidth={3}
          strokeColor="hotpink"
          apikey={process.env.EXPO_PUBLIC_MAPS_API_KEY ?? ""}
        /> */}
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
