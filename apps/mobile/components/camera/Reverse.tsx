import { Ionicons } from "@expo/vector-icons";
import { CameraType } from "expo-camera";
import { Pressable } from "react-native";

const Reverse: React.FC<{
  setFacing: React.Dispatch<React.SetStateAction<CameraType>>;
}> = ({ setFacing }) => {
  return (
    <Pressable
      onPress={() =>
        setFacing((current) => (current === "back" ? "front" : "back"))
      }>
      <Ionicons name="camera-reverse" color="white" size={36} />
    </Pressable>
  );
};

export default Reverse;
