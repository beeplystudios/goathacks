import { Pressable, StyleSheet, Text, View } from "react-native";
import { TimerValueType } from "./Timer";
import { useState } from "react";

export const capture = (
  timer: TimerValueType,
  setCapturing: React.Dispatch<React.SetStateAction<boolean>>,
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>,
  takePicture: () => void
) => {
  setCapturing(true);

  const recurse = (time: number) => {
    setTimeLeft(time);
    if (time === 0) {
      takePicture();
      setCapturing(false);
    } else {
      setTimeout(() => recurse(time - 1), 1000);
    }
  };

  recurse(timer);
};

const Capture: React.FC<{
  timer: TimerValueType;
  takePicture: () => void;
}> = ({ timer, takePicture }) => {
  const [capturing, setCapturing] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  return (
    <Pressable
      onPress={() => capture(timer, setCapturing, setTimeLeft, takePicture)}
      style={[
        styles.ring,
        {
          borderColor: `rgba(255, 255, 255, ${capturing ? 0.5 : 1})`,
        },
      ]}>
      <View
        style={[
          styles.button,
          {
            backgroundColor: `rgba(255, 255, 255, ${capturing ? 0.5 : 1})`,
          },
        ]}>
        {capturing && <Text style={styles.countdown}>{timeLeft}</Text>}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  ring: {
    borderWidth: 4,
    width: 60,
    aspectRatio: 1,
    borderRadius: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: 48,
    aspectRatio: 1,
    borderRadius: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  countdown: {
    color: "white",
    fontWeight: 700,
    fontSize: 20,
  },
});

export default Capture;
