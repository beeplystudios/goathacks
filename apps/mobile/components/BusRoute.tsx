import { Text, View } from "react-native";
import { BusRouteType } from "../constants/BusData";

const BusRoute: React.FC<BusRouteType> = ({ route, routeColor }) => {
  return (
    <View
      style={{
        padding: 12,
        borderColor: "rgba(255,255,255,0.2)",
        borderBottomWidth: 1,
        width: "100%",
        flexDirection: "row",
      }}>
      <View
        style={{ flex: 2, flexDirection: "row", justifyContent: "flex-end" }}>
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
    </View>
  );
};

export default BusRoute;
