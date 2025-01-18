import "../global.css"
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
       <Stack.Screen
        name="check-in"
        options={{
          presentation: 'modal',
          statusBarHidden: true,
          headerShown: false
        }}
      />
      <StatusBar hidden />
    </Stack>
  );
};

export default RootLayout;
