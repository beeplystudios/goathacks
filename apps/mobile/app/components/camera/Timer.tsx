import { Pressable, StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";
import { Ionicons } from "@expo/vector-icons";

export type TimerValueType = 0 | 3 | 5 | 10;
const Timer: React.FC<{
  timer: TimerValueType;
  setTimer: React.Dispatch<React.SetStateAction<TimerValueType>>;
}> = ({ timer, setTimer }) => {
  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        if (timer === 0) {
          setTimer(3);
        } else if (timer === 3) {
          setTimer(5);
        } else if (timer === 5) {
          setTimer(10);
        } else if (timer === 10) {
          setTimer(0);
        }
      }}>
      <ThemedText style={styles.timerNumber}>{timer}</ThemedText>
      <Ionicons name="timer-outline" color="white" size={24} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  timerNumber: { width: 20, textAlign: "right" },
  container: { flexDirection: "row", gap: 4, marginRight: 6 },
});

export default Timer;
