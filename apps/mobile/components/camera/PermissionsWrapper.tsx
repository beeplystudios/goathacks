import { useCameraPermissions } from "expo-camera";
import { useEffect } from "react";
import { Button, Linking, StyleSheet, View } from "react-native";
import { ThemedText } from "../ThemedText";

const PermissionsWrapper: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [permission, requestPermission] = useCameraPermissions();
  const getPermission = () => {
    if (permission && !permission.granted) {
      if (permission.canAskAgain) {
        requestPermission();
      } else {
        Linking.openSettings();
      }
    }
  };

  useEffect(() => {
    if (permission && !permission.granted && permission.canAskAgain) {
      requestPermission();
    }
  }, [permission]);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  } else if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <ThemedText style={styles.message}>
          We need your permission to show the camera
        </ThemedText>
        <Button onPress={getPermission} title="Grant Permission" />
      </View>
    );
  }

  return children;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
    color: "white",
  },
});

export default PermissionsWrapper;
