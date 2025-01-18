import ThemedView from "@/components/ThemedView";
import { trpc } from "@/lib/trpc";
import { StyleSheet, View, Text, Button } from "react-native";

import {Linking, Platform} from 'react-native';

export type OpenMapArgs = {
  lat: string | number;
  lng: string | number;
  label: string;
};

export const openMap = ({lat, lng, label}: OpenMapArgs) => {
  const scheme = Platform.select({
    ios: `maps://?q=${label}&ll=${lat},${lng}`,
    android: `geo:${lat},${lng}?q=${lat},${lng}(${label})`,
  });

  if (scheme) {
    Linking.openURL(scheme).catch(err =>
      console.error('Error opening map: ', err),
    );
  }
};

export default function TabTwoScreen() {
  const [data] = trpc.rat.useSuspenseQuery()

  return (
    <ThemedView className="flex-1 p-8 gap-4 overflow-hidden pt-20">
      <Text>{data}</Text>
      <Button onPress={() => openMap({lat: 42.89309036394007, lng: -71.39225539916762, label: "Londondairy"})} title="Test this" />
    </ThemedView>
  ); 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center",
    color: "white",
  },
});
