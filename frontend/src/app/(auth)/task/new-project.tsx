import { useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { Stack } from "expo-router";
import ColorPicker, { Panel3, Preview } from "reanimated-color-picker";
import { Ionicons } from "@expo/vector-icons";

import { NewHeader } from "@/src/components/task/NewHeader";
import { Colors } from "@/src/constants/Colors";

export default function NewProject() {
  const [name, setName] = useState<string>("");
  const [color, setColor] = useState<string>("");

  const onSelectColor = ({ hex }: { hex: string }) => {
    setColor(hex);
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => <NewHeader title="New project" />,
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
    padding: 30,
    gap: 50,
  },
  // input
  inputContainer: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderRadius: 10,
    backgroundColor: Colors.primaryBg,
    boxShadow:
      "0px 2px 3px -1px rgba(0, 0, 0, 0.1), 0px 2px 3px -1px rgba(0, 0, 0, 0.06)",
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
    borderRadius: 10,
  },
});
