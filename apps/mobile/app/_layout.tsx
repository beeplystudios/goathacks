import { Stack } from "expo-router";
import { setStatusBarHidden, StatusBar } from "expo-status-bar";

const RootLayout = () => {
  setStatusBarHidden(true);
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false, statusBarHidden: true }}
      />
      <StatusBar hidden />
    </Stack>
  );
};

export default RootLayout;
