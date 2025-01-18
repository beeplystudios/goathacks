import ThemedView from "@/components/ThemedView";
import { StyleSheet, View } from "react-native";

export default function TabTwoScreen() {
  return <ThemedView style={styles.container}></ThemedView>;
}

const styles = StyleSheet.create({
  projectPreview: {
    borderRadius: 2,
    width: "100%",
    height: "100%",
  },
  projectPreviewWrapper: {
    borderRadius: 6,
    width: 48,
    aspectRatio: 0.75,
    padding: 4,
    borderWidth: 2,
    borderColor: "white",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    padding: 12,
    alignItems: "center",
    width: "100%",
  },
  actionBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    marginTop: 12,
    width: "100%",
    alignItems: "center",
  },
  actionElement: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cameraSettings: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 12,
  },
  viewport: {
    position: "relative",
    width: "100%",
    aspectRatio: 0.75,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 100,
    width: "100%",
    height: "100%",
  },
  camera: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    paddingTop: 24,
    paddingBottom: 88,
    alignItems: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
    color: "white",
  },
});
