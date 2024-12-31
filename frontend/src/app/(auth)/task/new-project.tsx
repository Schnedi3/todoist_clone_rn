import { StyleSheet, Text, View } from "react-native";
import { Stack } from "expo-router";

import { NewHeader } from "@/src/components/task/NewHeader";
import { Colors } from "@/src/constants/Colors";

export default function NewProject() {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => <NewHeader title="New project" />,
        }}
      />

      <View style={styles.container}>
        <Text style={styles.title}>New project</Text>
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
