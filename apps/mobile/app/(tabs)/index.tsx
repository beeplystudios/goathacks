import React, { useEffect, useState } from "react";
import MapView, { LatLng, Marker } from "react-native-maps";
import { ScrollView, StyleSheet, View } from "react-native";
import useLocation from "../../hooks/useLocation";
import { BusStopType, getIthRouteColor } from "../../constants/BusData";
import MapViewDirections from "react-native-maps-directions";
import BusRoute from "../../components/BusRoute";
import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import { trpc } from "../../lib/trpc";
import BusIcon from "../../assets/images/bus-icon.png";

export default function App() {
  const { coords } = useLocation();
  const [activeStops, setActiveStops] = useState<BusStopType[]>([]);

  const [{ stops: busStops, routes: busRoutes }] =
    trpc.busSession.getAllRoutes.useSuspenseQuery(undefined, {
      refetchInterval: 5_000,
    });

  const [busLocations] = trpc.busSession.getLocations.useSuspenseQuery(
    undefined,
    {
      refetchInterval: 5_000,
    }
  );
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
  }, [busStops]);

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
        }
      >
        {activeStops?.map((stop, index) => (
          <Marker
            key={`coordinate_${index}`}
            coordinate={stop.coords}
            pinColor={getIthRouteColor(
              busRoutes.findIndex((r) => r.route === stop.route)
            )}
          />
        ))}
        {busLocations?.map((bus, index) =>
          bus.latitude !== null && bus.longitude !== null ? (
            <Marker
              key={`bus_${index}`}
              coordinate={bus as LatLng}
              image={BusIcon}
            />
          ) : (
            <View />
          )
        )}
        {process.env.EXPO_PUBLIC_MAPS_API_KEY &&
          activeStops.length > 0 &&
          busRoutes.map((route, i) => {
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
                key={`route-${route.route}`}
                strokeColor={getIthRouteColor(i)}
              />
            );
          })}
      </MapView>
      {busRoutes.length > 0 && (
        <ScrollView className="absolute bg-neutral-700 w-full bottom-0 h-[35%] rounded-t-lg">
          {busRoutes.map((r, i) => (
            <BusRoute
              route={r.route}
              routeColor={getIthRouteColor(i)}
              key={i}
            />
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
