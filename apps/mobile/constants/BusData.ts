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
  coords: {
    latitude: number;
    longitude: number;
  };
}

export interface BusRouteType {
  route: string;
  routeColor: RouteColor;
}
