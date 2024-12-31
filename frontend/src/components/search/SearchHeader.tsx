import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "@/src/constants/Colors";

export const SearchHeader = () => {
  const [search, setSearch] = useState<string>("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search</Text>

      <View style={styles.searchBar}>
        <Ionicons name="search-outline" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Task, project and more..."
          placeholderTextColor={Colors.disabled}
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
        {search && (
          <Pressable
            style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
            onPress={() => setSearch("")}
          >
            <Ionicons name="close-outline" style={styles.searchIcon} />
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    gap: 10,
    borderBottomWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.primaryBg,
  },
  title: {
    fontFamily: "QuicksandBold",
    fontSize: 30,
    color: Colors.primaryText,
  },
  searchBar: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: Colors.border,
  },
  searchInput: {
    flex: 1,
    fontFamily: "QuicksandSemi",
    color: Colors.primaryText,
  },
  searchIcon: {
    fontSize: 24,
    color: Colors.secondaryText,
  },
});
