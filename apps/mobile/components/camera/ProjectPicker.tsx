import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";

const ProjectPicker: React.FC<{
  project: string | null;
  setProject: React.Dispatch<React.SetStateAction<string | null>>;
}> = ({ project, setProject }) => {
  const [data, setData] = useState<{ project: string }[]>([]);

  const selectRef = useRef<SelectDropdown>(null);

  useEffect(() => {
    if (selectRef.current && project && data) {
      const idx = data.map((p) => p.project).indexOf(project);
      selectRef.current.selectIndex(idx);
    }
  }, [selectRef, project, data]);

  return (
    <SelectDropdown
      data={data}
      ref={selectRef}
      onSelect={(selectedItem, index) => {
        setProject(selectedItem.project);
      }}
      dropdownOverlayColor="transparent"
      defaultValue={{ project }}
      renderButton={(selectedItem, isOpened) => {
        return (
          <View style={styles.dropdownButtonStyle}>
            <Text
              style={styles.dropdownButtonTxtStyle}
              numberOfLines={1}
              ellipsizeMode="tail">
              {(selectedItem && selectedItem.project) || "Choose your project"}
            </Text>
            <Ionicons
              name={isOpened ? "chevron-up" : "chevron-down"}
              style={styles.dropdownButtonArrowStyle}
            />
          </View>
        );
      }}
      renderItem={(item, index, isSelected) => {
        return (
          <View
            style={{
              ...styles.dropdownItemStyle,
              ...(isSelected && { backgroundColor: "#D2D9DF" }),
            }}>
            <Text style={styles.dropdownItemTxtStyle}>{item.project}</Text>
          </View>
        );
      }}
      showsVerticalScrollIndicator={false}
      dropdownStyle={styles.dropdownMenuStyle}
    />
  );
};

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 6,
    paddingBottom: 4,
    borderBottomColor: "white",
    borderBottomWidth: 1,
  },
  dropdownButtonTxtStyle: {
    fontSize: 18,
    fontWeight: "500",
    color: "white",
    maxWidth: 200,
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
    color: "white",
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: "#E9ECEF",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});

export default ProjectPicker;
