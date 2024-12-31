import { StyleSheet, Text, View } from "react-native";
import { Stack, useRouter } from "expo-router";

import { Colors } from "@/src/constants/Colors";
import { TodayHeader } from "@/src/components/today/TodayHeader";
import { CreateWidget } from "@/src/components/CreateWidget";

export default function Today() {
  const router = useRouter();

  const handleCreate = () => {
    router.push("/task/new-todo");
  };

  return (
    <>
      <Stack.Screen
        options={{ headerShown: true, header: () => <TodayHeader /> }}
      />

      <View style={styles.container}>
        <Text style={styles.title}>Today</Text>
      </View>

      <CreateWidget onPress={handleCreate} />
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
