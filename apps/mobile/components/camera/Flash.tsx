import { Ionicons } from "@expo/vector-icons";
import { FlashMode } from "expo-camera";
import { Pressable } from "react-native";

const Flash: React.FC<{
  flash: FlashMode;
  setFlash: React.Dispatch<React.SetStateAction<FlashMode>>;
}> = ({ flash, setFlash }) => {
  return (
    <Pressable
      onPress={() => {
        if (flash === "auto") {
          setFlash("on");
        } else if (flash === "on") {
          setFlash("off");
        } else {
          setFlash("auto");
        }
      }}>
      {() => {
        if (flash === "auto") {
          return <Ionicons name="flash-outline" color="white" size={24} />;
        } else if (flash === "on") {
          return <Ionicons name="flash" color="white" size={24} />;
        } else {
          return <Ionicons name="flash-off" color="white" size={24} />;
        }
      }}
    </Pressable>
  );
};

export default Flash;
