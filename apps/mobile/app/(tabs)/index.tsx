import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import MapViewDirections from "react-native-maps-directions";
import useLocation from "../../hooks/useLocation";
import { LocationObjectCoords } from "expo-location";

export default function App() {
  const { coords } = useLocation();
  const { width, height } = Dimensions.get("window");
  const ASPECT_RATIO = width / height;
  const LATITUDE = 37.771707;
  const LONGITUDE = -122.4053769;
  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const [location, setLocation] = useState<LocationObjectCoords | undefined>();
  // const coordinates = [
  //   {
  //     latitude: 37.3317876,
  //     longitude: -122.0054812,
  //   },
  //   coords ?? {
  //     latitude: 37.771707,
  //     longitude: -122.4053769,
  //   },
  // ];

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
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
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
