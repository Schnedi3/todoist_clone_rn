import { StyleSheet, Text, View } from "react-native";
import { Stack } from "expo-router";
import { useRouter } from "expo-router";

import { Colors } from "@/src/constants/Colors";
import { BrowseHeader } from "@/src/components/browse/BrowseHeader";
import { CreateWidget } from "@/src/components/CreateWidget";

export default function Browse() {
  const router = useRouter();

  const handleCreate = () => {
    router.push("/task/new-project");
  };

  return (
    <>
      <Stack.Screen
        options={{ headerShown: true, header: () => <BrowseHeader /> }}
      />

      <View style={styles.container}>
        <Text style={styles.title}>Browse</Text>
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
