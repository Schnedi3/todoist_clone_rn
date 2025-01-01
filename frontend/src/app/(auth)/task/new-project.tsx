import { useState } from "react";
import { Alert, Pressable, StyleSheet, TextInput, View } from "react-native";
import { Stack } from "expo-router";
import ColorPicker, { Panel3, Preview } from "reanimated-color-picker";
import { Ionicons } from "@expo/vector-icons";

import { NewHeader } from "@/src/components/task/NewHeader";
import { Colors } from "@/src/constants/Colors";
import { useAddProject } from "@/src/api/project";

export default function NewProject() {
  const [name, setName] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const { mutate: addProject } = useAddProject();

  const onSelectColor = ({ hex }: { hex: string }) => {
    setColor(hex);
  };

  const handleCreateProject = () => {
    if (!name) {
      Alert.alert("Empty field", "Please set a name for the project");
      return;
    }

    addProject({ name, color });
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => (
            <NewHeader title="New project" onPress={handleCreateProject} />
          ),
        }}
      />

      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Project name"
            placeholderTextColor={Colors.disabled}
            style={styles.input}
            value={name}
            onChangeText={(text) => setName(text)}
          />

          {name && (
            <Pressable
              style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
              onPress={() => setName("")}
            >
              <Ionicons name="close-outline" style={styles.clearIcon} />
            </Pressable>
          )}
        </View>

        <ColorPicker
          value="#ffffff"
          onComplete={onSelectColor}
          style={styles.colorPicker}
        >
          <Panel3 />
          <Preview style={styles.previewStyle} hideInitialColor />
        </ColorPicker>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 50,
  },
  // input
  inputContainer: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.border,
    backgroundColor: Colors.primaryBg,
  },
  input: {
    flex: 1,
    fontFamily: "QuicksandMedium",
    fontSize: 16,
    color: Colors.primaryText,
  },
  clearIcon: {
    fontSize: 24,
    color: Colors.secondaryText,
  },
  // color picker
  colorPicker: {
    gap: 20,
  },
  previewStyle: {
    height: 60,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.border,
  },
});
