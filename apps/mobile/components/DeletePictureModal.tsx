import { Pressable, StyleSheet, View } from "react-native";
import CustomModal from "./CustomModal";
import ThemedText from "./ThemedText";

const DeletePictureModal: React.FC<{
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  num: number;
  onDelete: () => void;
  project_name: string;
}> = ({ isVisible, setIsVisible, num, onDelete, project_name }) => {
  return (
    <CustomModal isVisible={isVisible} onClose={() => setIsVisible(false)}>
      <View style={styles.container}>
        <ThemedText type="subtitle">Are you sure?</ThemedText>
        <ThemedText>
          You are about to delete picture #{num} from your project "
          {project_name}
          ". This action cannot be reversed.
        </ThemedText>
        <View style={styles.buttonRow}>
          <Pressable
            style={[styles.button, styles.cancelButton]}
            onPress={() => setIsVisible(false)}>
            <ThemedText>No, go back</ThemedText>
          </Pressable>
          <Pressable
            style={[styles.button, styles.deleteButton]}
            onPress={onDelete}>
            <ThemedText>Yes, delete</ThemedText>
          </Pressable>
        </View>
      </View>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 12,
  },
  button: {
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  cancelButton: {
    backgroundColor: "slategray",
  },
  deleteButton: {
    backgroundColor: "red",
  },
});

export default DeletePictureModal;
