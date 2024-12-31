import { StyleSheet, Text, View } from "react-native";
import { Stack } from "expo-router";

import { NewHeader } from "@/src/components/task/NewHeader";
import { Colors } from "@/src/constants/Colors";

export default function NewTodo() {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => <NewHeader title="New task" />,
        }}
      />

      <View style={styles.container}>
        <Text style={styles.title}>New todo</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "QuicksandBold",
    fontSize: 50,
    color: Colors.disabled,
  },
});
