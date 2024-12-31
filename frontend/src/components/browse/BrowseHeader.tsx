import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useAuth, useUser } from "@clerk/clerk-expo";

import { Colors } from "@/src/constants/Colors";

export const BrowseHeader = () => {
  const { user } = useUser();
  const { signOut } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.user}>
        <Image source={{ uri: user?.imageUrl ?? "" }} style={styles.avatar} />
        <Text style={styles.name}>{user?.firstName}</Text>
      </View>

      <View style={styles.icons}>
        <Pressable style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}>
          <Ionicons name="settings-outline" style={styles.settingsIcon} />
        </Pressable>

        <Pressable
          style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
          onPress={() => signOut()}
        >
          <AntDesign name="logout" style={styles.logoutIcon} />
        </Pressable>
      </View>
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
  // user
  user: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 20,
  },
  name: {
    fontFamily: "QuicksandBold",
    fontSize: 20,
    color: Colors.primaryText,
  },
  // icons
  icons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  logoutIcon: {
    fontSize: 23,
    color: Colors.accent,
  },
  settingsIcon: {
    fontSize: 26,
    color: Colors.secondaryText,
  },
});
