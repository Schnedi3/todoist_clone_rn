import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "@/src/constants/Colors";

export const CreateWidget = ({ onPress }: { onPress: () => void }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        { opacity: pressed ? 0.5 : 1 },
      ]}
      onPress={onPress}
    >
      <Ionicons name="add" style={styles.addIcon} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 20,
    bottom: 20,
    borderRadius: 30,
    backgroundColor: Colors.accent,
  },
  addIcon: {
    fontSize: 35,
    color: Colors.invertedText,
  },
});
