import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Href, RelativePathString, useRouter } from "expo-router";

type HrefType = Parameters<ReturnType<typeof useRouter>["replace"]>[0][];

export function BarcodeScanner(props: { redirect: string }) {
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
          <Text className="bg-lime-700 text-white rounded-md text-center">
            Grant Permission
          </Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="h-screen w-screen">
      <View className="h-screen w-screen">
        <CameraView
          facing="back"
          style={{ height: "100%" }}
          onBarcodeScanned={(evt) => {
            // console.log(evt.data);
            router.replace({
              pathname: props.redirect,
              params: {
                id: evt.data,
              },
            });
          }}
        ></CameraView>
      </View>
    </SafeAreaView>
  );
}
