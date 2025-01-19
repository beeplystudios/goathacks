import SocialLoginButton from "@/../components/SocialLoginButton";
import { StyleSheet, Text, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import * as WebBrowser from "expo-web-browser";
import { useEffect } from "react";
import { setStatusBarHidden } from "expo-status-bar";

export const useWarmUpBrowser = () => {
  useEffect(() => {
    // Warm up the android browser to improve UX
    // https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

const AuthScreen = () => {
  useWarmUpBrowser();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      className="bg-neutral-700 h-screen p-8"
      // style={[
      //   styles.container,
      //   { paddingTop: insets.top + 40, paddingBottom: insets.bottom },
      // ]}
    >
      <View className="flex flex-col gap-2 mt-[50%]">
        <Text className="text-white text-2xl font-semibold">
          Welcome to{" "}
          <Text className="text-pastel-purple-primary">hustleandbustle</Text>!
        </Text>
        <Text className="text-neutral-50 text-lg font-medium">
          Let our buses take you places!
        </Text>
      </View>

      <View style={styles.socialButtonsContainer}>
        <SocialLoginButton strategy="google" />
      </View>
    </SafeAreaView>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    gap: 20,
  },
  headingContainer: {
    width: "100%",
    gap: 5,
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    color: "gray",
  },
  socialButtonsContainer: {
    width: "100%",
    marginTop: 20,
    gap: 10,
  },
});
