import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Link, useRouter } from "expo-router";

export default function Modal() {
  const router = useRouter();
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
          <Text>Grant Permission</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="h-screen">
      <View className="h-screen">
        <CameraView facing="back" style={{height: "50%"}} onBarcodeScanned={evt => {
          console.log(evt.data)
          router.replace({
            pathname: "/driver/route/[id]",
            params: {
              id: evt.data
            }
          }) 
        }}> 
        </CameraView>
      </View>
    </SafeAreaView>
  );
}
