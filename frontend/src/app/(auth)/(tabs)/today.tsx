import { StyleSheet, Text, View } from "react-native";
import { Stack } from "expo-router";

import { Colors } from "@/src/constants/Colors";
import { TodayHeader } from "@/src/components/today/TodayHeader";

export default function Today() {
  return (
    <>
      <Stack.Screen
        options={{ headerShown: true, header: () => <TodayHeader /> }}
      />

      <View style={styles.container}>
        <Text style={styles.title}>Today</Text>
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
