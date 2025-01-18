import { LocationObjectCoords } from "expo-location";

export type RouteColor =
  | "red"
  | "tomato"
  | "orange"
  | "yellow"
  | "gold"
  | "wheat"
  | "tan"
  | "linen"
  | "green"
  | "blue"
  | "aqua"
  | "violet"
  | "indigo";

export interface BusStopType {
  route: string;
  routeColor: RouteColor;
  coords: {
    latitude: number;
    longitude: number;
  };
}
