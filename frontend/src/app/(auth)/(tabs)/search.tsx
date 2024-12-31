import { StyleSheet, Text, View } from "react-native";
import { Stack } from "expo-router";

import { Colors } from "@/src/constants/Colors";
import { SearchHeader } from "@/src/components/search/SearchHeader";

export default function Search() {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => <SearchHeader />,
        }}
      />

      <View style={styles.container}>
        <Text style={styles.title}>Search</Text>
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
