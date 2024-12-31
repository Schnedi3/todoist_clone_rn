import { StyleSheet, Text, View } from "react-native";

import { Colors } from "@/src/constants/Colors";

export const TodayHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.primaryBg,
  },
  title: {
    fontFamily: "QuicksandBold",
    fontSize: 35,
    color: Colors.primaryText,
  },
});
