import { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet } from "react-native";

import * as Device from "expo-device";

import * as Location from "expo-location";

export interface LocationType {
  coords?: Location.LocationObjectCoords;
  error?: string | null;
}

export default function useLocation() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function getCurrentLocation() {
      if (Platform.OS === "android" && !Device.isDevice) {
        setErrorMsg(
          "Oops, this will not work on Snack in an Android Emulator. Try it on your device!"
        );
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }

    getCurrentLocation();
  }, []);

  const res: LocationType = { ...location, error: errorMsg };
  return res;
}
