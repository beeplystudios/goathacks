import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function Modal() {
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <View />
  }

  if (!permission.granted) {
    return (
      <SafeAreaView>
        <View>We need permission to use your camera</View>
        <Pressable onPress={requestPermission}>
          <Text>Grant Permission</Text>
        </Pressable>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className="h-screen">
      <View className="h-screen">
        <CameraView facing="back" style={{height: "50%"}} onBarcodeScanned={evt => {
          console.log(evt.data)
        }}>
        </CameraView>
      </View>
    </SafeAreaView> 
  );
}