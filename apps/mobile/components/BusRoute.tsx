import { Pressable, Text, View } from "react-native";
import { BusRouteType } from "../constants/BusData";
import { useState } from "react";
import CustomModal from "./CustomModal";

const BusRoute: React.FC<BusRouteType> = ({ route, routeColor }) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <Pressable
      onPress={() => setModalVisible(true)}
      style={{
        padding: 12,
        borderColor: "rgba(255,255,255,0.2)",
        borderBottomWidth: 1,
        width: "100%",
        flexDirection: "row",
      }}>
      <CustomModal
        isVisible={modalVisible}
        onClose={() => {
          setModalVisible(false);
        }}>
        <Text style={{ fontWeight: "bold", color: "white", fontSize: 20 }}>
          {route}
        </Text>
      </CustomModal>
      <View
        style={{
          width: "25%",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}>
        <View
          style={{
            backgroundColor: routeColor,
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 8,
          }}>
          <Text>{route}</Text>
        </View>
      </View>
      <View
        style={{
          flex: 7,
          flexDirection: "row",
          alignItems: "center",
          paddingLeft: 10,
        }}>
        <Text style={{ color: "white", fontWeight: "medium" }}>All good!</Text>
      </View>
    </Pressable>
  );
};

export default BusRoute;
