import React from "react";
import MapView, { Marker } from "react-native-maps";
import { Dimensions, StyleSheet, View } from "react-native";
import MapViewDirections from "react-native-maps-directions";
import useLocation from "../../hooks/useLocation";

export default function App() {
  const origin = { latitude: 37.3318456, longitude: -122.0296002 };
  const { coords } = useLocation();
  const { width, height } = Dimensions.get("window");
  const ASPECT_RATIO = width / height;
  const destination = { latitude: 37.771707, longitude: -122.4053769 };
  const LATITUDE = 37.771707;
  const LONGITUDE = -122.4053769;
  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const coordinates = [
    {
      latitude: 37.3317876,
      longitude: -122.0054812,
    },
    coords ?? {
      latitude: 37.771707,
      longitude: -122.4053769,
    },
  ];

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}>
        {coordinates.map((coordinate, index) => (
          <Marker key={`coordinate_${index}`} coordinate={coordinate} />
        ))}
        <MapViewDirections
          origin={coordinates[0]}
          destination={coordinates[1]}
          strokeWidth={3}
          strokeColor="hotpink"
          apikey={process.env.EXPO_PUBLIC_MAPS_API_KEY ?? ""}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
