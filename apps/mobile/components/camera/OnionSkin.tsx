import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";

const OnionSkin: React.FC<{
  onionSkin: boolean;
  setOnionSkin: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ onionSkin, setOnionSkin }) => {
  return (
    <Pressable onPress={() => setOnionSkin((p) => !p)}>
      <Ionicons
        color="white"
        size={24}
        name={onionSkin ? "image" : "image-outline"}
      />
    </Pressable>
  );
};

export default OnionSkin;
