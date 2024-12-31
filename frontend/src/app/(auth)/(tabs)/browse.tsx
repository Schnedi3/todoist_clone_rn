import { StyleSheet, Text, View } from "react-native";

import { Colors } from "@/src/constants/Colors";

export default function Browse() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Browse</Text>
    </View>
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
    color: Colors.disabled
  },
});