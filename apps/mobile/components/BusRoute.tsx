import { Text, View } from "react-native";
import { BusRouteType } from "../constants/BusData";

const BusRoute: React.FC<BusRouteType> = ({ route, routeColor }) => {
  return (
    <View className="w-full p-12">
      <Text
        className="px-8 py-4 rounded"
        style={{ backgroundColor: routeColor }}>
        {route}
      </Text>
    </View>
  );
};

export default BusRoute;
