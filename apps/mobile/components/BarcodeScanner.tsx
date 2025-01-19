import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from "expo-camera";

export function BarcodeScanner(props: {
  onScan: (evt: BarcodeScanningResult) => void;
}) {
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView>
        <View>
          <Text>We need permission to use your camera</Text>
        </View>
        <Pressable onPress={requestPermission}>
          <Text className="bg-lime-700 text-white rounded-md text-center">
            Grant Permission
          </Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <View className="h-screen w-screen">
      <CameraView
        facing="back"
        style={{ height: "100%" }}
        onBarcodeScanned={props.onScan}
      />
    </View>
  );
}
