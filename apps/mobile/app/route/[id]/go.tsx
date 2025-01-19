import {
  Link,
  Tabs,
  useFocusEffect,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable, ScrollView, Text, View } from "react-native";
import { trpc } from "../../../lib/trpc";
import React, { useEffect, useState } from "react";
import { getDistance } from "geolib";

import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";

const useLocation = () => {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(
    null
  );

  useFocusEffect(() => {
    if (location !== null) return;

    Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.BestForNavigation,
    }).then((l) =>
      setLocation({
        lat: l.coords.latitude,
        lon: l.coords.longitude,
      })
    );
  });

  return location;
};

const StopView = (props: {
  name: string;
  origin: {
    lat: number;
    lon: number;
  };
  dest: {
    lat: number;
    lon: number;
  };
  activeStopIdx: number;
  setActiveStopIdx: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [data] = trpc.route.getRouteInstructions.useSuspenseQuery(
    {
      origin: props.origin,
      dest: props.dest,
    },
    {
      refetchInterval: 10_000,
    }
  );
  const { id } = useLocalSearchParams();

  const [activeStepIndex, setActiveStep] = useState(0);
  const [routeData] = trpc.route.get.useSuspenseQuery({
    routeId: id as string,
  });
  const [timeLeft, setTimeLeft] = useState(60);
  const [reachedDest, setReachedDest] = useState(false);
  const router = useRouter();

  const updateLocation = trpc.busSession.updateLocation.useMutation();

  useEffect(() => {
    if (timeLeft <= 0) {
      props.setActiveStopIdx((stop) => stop + 1);
      setReachedDest(false);

      setActiveStep(0);

      setTimeLeft(60);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (activeStepIndex !== data.steps.length - 1) return;
    setReachedDest(true);

    const timeout = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1_000);

    return () => clearTimeout(timeout);
  }, [activeStepIndex]);

  useFocusEffect(() => {
    const interval = setInterval(async () => {
      if (activeStepIndex === data.steps.length - 1) return;

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.LocationAccuracy.BestForNavigation,
      });

      updateLocation.mutate({
        lat: location.coords.latitude,
        lon: location.coords.longitude,
      });

      const distance = getDistance(
        { lat: location.coords.latitude, lon: location.coords.longitude },
        {
          lat: data.steps[activeStepIndex]!.end_location.lat,
          lon: data.steps[activeStepIndex]!.end_location.lon,
        }
      );

      if (distance < 20) {
        setActiveStep((step) => step + 1);
      }
    }, 1_000);

    return () => clearInterval(interval);
  });

  return (
    <>
      <View className="flex flex-col gap-2">
        <View className="bg-neutral-400 border-[0.125rem] border-neutral-300 p-4 rounded-xl">
          <Text className="text-xl font-semibold text-white">{props.name}</Text>
          <Text className="text-sm text-neutral-50">{data.end_addr}</Text>
        </View>

        <ScrollView
          // className="flex flex-col gap-8 p-4"
          style={{
            display: "flex",
            flexDirection: "column",
            padding: 16,
            height: 600,
          }}
        >
          {data.steps.map((step, idx) => (
            <View key={idx}>
              <Text
                className={
                  activeStepIndex === idx
                    ? "text-white font-semibold text-2xl mb-8"
                    : "text-neutral-50 text-2xl mb-8"
                }
              >
                {step.text} | {step.distance.text} | {step.duration.text}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
      <View className="absolute bg-neutral-900 bottom-0 w-screen p-8 rounded-t-2xl border-t-[0.125rem] border-neutral-500">
        {!reachedDest && (
          <View className="p-4 flex flex-row items-center relative mb-8">
            <Pressable
              className="absolute"
              onPress={() => router.push("/(tabs)/driver")}
            >
              <Ionicons
                name="close-circle"
                size={52}
                style={{ color: "#E35959" }}
              />
            </Pressable>
            <View className="absolute left-[50%] -translate-x-[50%] flex items-center">
              <Text className="text-white text-xl font-semibold">
                Stop {props.activeStopIdx + 1}
              </Text>
              <Text className="text-white text-lg">
                {data.distance.text} · {data.duration.text}
              </Text>
            </View>
            <View className="flex flex-row gap-1 items-center absolute right-0">
              <Pressable
                disabled={props.activeStopIdx === 0}
                style={{
                  opacity: props.activeStopIdx === 0 ? 0.5 : 1,
                }}
                onPress={() => props.setActiveStopIdx((stop) => stop - 1)}
              >
                <Ionicons
                  name="arrow-back-circle-outline"
                  size={52}
                  style={{ color: "white" }}
                />
              </Pressable>
              <Pressable
                style={{
                  opacity:
                    props.activeStopIdx === routeData.stops.length - 1
                      ? 0.5
                      : 1,
                }}
                disabled={props.activeStopIdx === routeData.stops.length - 1}
                onPress={() => props.setActiveStopIdx((stop) => stop + 1)}
              >
                <Ionicons
                  name="arrow-forward-circle-outline"
                  size={52}
                  style={{ color: "white" }}
                />
              </Pressable>
            </View>
          </View>
        )}
        {reachedDest && (
          <View className="p-4 flex flex-row items-center justify-between relative mb-8">
            <View className="flex flex-col">
              <Text className="text-feedback-success-primary text-lg font-semibold">
                Reached {props.name}
              </Text>
              <Text className="text-white">
                Leaving for next stop in {timeLeft}
              </Text>
            </View>
            <Pressable className="px-4 py-2 bg-primary border-[0.125rem] border-primary-400 rounded-md">
              <Text className="text-white font-semibold">Leave Now</Text>
            </Pressable>
          </View>
        )}
      </View>
    </>
  );
};

const RouteDisplay = () => {
  const { id } = useLocalSearchParams();
  const [data] = trpc.route.get.useSuspenseQuery({
    routeId: id as string,
  });

  const [activeStopIdx, setActiveStopIdx] = useState(0);
  const location = useLocation();

  const activeStop = data.stops[activeStopIdx];

  return (
    <SafeAreaView className="bg-neutral-700 p-8 h-screen">
      {activeStop && (
        <>
          {location && (
            <StopView
              activeStopIdx={activeStopIdx}
              setActiveStopIdx={setActiveStopIdx}
              name={activeStop.name!}
              origin={location}
              dest={{ lat: activeStop.lat!, lon: activeStop.lon! }}
            />
          )}
        </>
      )}
    </SafeAreaView>
  );
};

export default function Screen() {
  const [permission, requestPermission] = Location.useForegroundPermissions();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView>
        <View>
          <Text>We need permission to use your camera</Text>
        </View>
        <Pressable onPress={requestPermission}>
          <Text className="bg-lime-700 text-white rounded-md text-center">
            Grant Permission
          </Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return <RouteDisplay />;
}
