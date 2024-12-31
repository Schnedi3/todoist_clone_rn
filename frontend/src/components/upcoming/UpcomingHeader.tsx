import { StyleSheet, Text, View } from "react-native";

import { Colors } from "@/src/constants/Colors";

export const UpcomingHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upcoming</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.primaryBg,
  },
  title: {
    fontFamily: "QuicksandBold",
    fontSize: 20,
    color: Colors.primaryText,
  },
});
