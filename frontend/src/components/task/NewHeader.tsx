import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";

import { Colors } from "@/src/constants/Colors";

export const NewHeader = ({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
        onPress={() => router.dismiss()}
      >
        <Text style={[styles.buttonText, { color: Colors.secondaryText }]}>
          Cancel
        </Text>
      </Pressable>

      <Text style={styles.title}>{title}</Text>

      <Pressable
        style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
        onPress={() => onPress()}
      >
        <Text style={[styles.buttonText, { color: Colors.accent }]}>
          Create
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.primaryBg,
  },
  title: {
    fontFamily: "QuicksandBold",
    fontSize: 20,
    color: Colors.primaryText,
  },
  buttonText: {
    fontFamily: "QuicksandSemi",
    fontSize: 14,
    textTransform: "uppercase",
  },
});
