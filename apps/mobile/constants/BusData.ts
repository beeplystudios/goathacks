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

const AllRouteColors = [
  "red",
  "orange",
  "yellow",
  "tan",
  "linen",
  "green",
  "aqua",
  "violet",
];

export const getIthRouteColor = (i: number) => {
  return AllRouteColors[(i + 7) % AllRouteColors.length];
};

export interface BusStopType {
  route: string;
  coords: {
    latitude: number;
    longitude: number;
  };
}

export interface BusRouteType {
  route: string;
  routeColor: string;
}
