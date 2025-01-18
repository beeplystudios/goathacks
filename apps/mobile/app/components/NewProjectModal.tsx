import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import CustomModal from "./CustomModal";
import ThemedText from "./ThemedText";
import { useState } from "react";

const NewProjectModal: React.FC<{
  isVisible: boolean;
  onClose: () => void;
}> = ({ isVisible, onClose }) => {
  const [name, setName] = useState("");

  return (
    <CustomModal isVisible={isVisible} onClose={onClose}>
      <ThemedText type="subtitle">New Project</ThemedText>
      <Text style={styles.inputLabel}>
        Name: <Text style={styles.required}>*</Text>
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Ex. My Favorite Tree"
        value={name}
        onChangeText={setName}></TextInput>
      <View style={styles.submitContainer}>
        <Pressable
          style={[styles.button, name === "" && styles.disabled]}
          disabled={name === ""}
          onPressOut={() => {
            setName("");
            onClose();
          }}>
          <Text style={styles.buttonText}>Create</Text>
        </Pressable>
      </View>
    </CustomModal>
  );
};

export default NewProjectModal;

const styles = StyleSheet.create({
  disabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#4B365E",
    width: 76,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  submitContainer: {
    marginTop: 16,
    alignItems: "flex-end",
  },
  inputLabel: {
    color: "white",
    marginTop: 18,
  },
  required: {
    color: "red",
    marginLeft: 4,
  },
  input: {
    marginTop: 8,
    borderRadius: 8,
    padding: 12,
    width: "100%",
    color: "rgba(255,255,255,0.8)",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
});
