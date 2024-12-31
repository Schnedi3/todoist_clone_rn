import { StyleSheet, Text, View } from "react-native";
import { Stack } from "expo-router";

import { Colors } from "@/src/constants/Colors";
import { UpcomingHeader } from "@/src/components/upcoming/UpcomingHeader";

export default function Upcoming() {
  return (
    <>
      <Stack.Screen
        options={{ headerShown: true, header: () => <UpcomingHeader /> }}
      />

      <View style={styles.container}>
        <Text style={styles.title}>Upcoming</Text>
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
