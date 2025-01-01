import { useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Stack } from "expo-router";
import { useRouter } from "expo-router";

import { Colors } from "@/src/constants/Colors";
import { BrowseHeader } from "@/src/components/browse/BrowseHeader";
import { CreateWidget } from "@/src/components/CreateWidget";
import { useGetProjects } from "@/src/api/project";
import { IProject } from "@/src/types/types";

export default function Browse() {
  const router = useRouter();
  const { data: projects } = useGetProjects();

  useEffect(() => {}, [projects]);

  const handleCreate = () => {
    router.push("/task/new-project");
  };

  return (
    <>
      <Stack.Screen
        options={{ headerShown: true, header: () => <BrowseHeader /> }}
      />

      <View style={styles.container}>
        <Text style={styles.title}>My projects</Text>

        <View style={{ gap: 5 }}>
          {projects ? (
            <FlatList
              data={projects}
              renderItem={({ item }) => (
                <View key={item.id} style={styles.project}>
                  <Text style={[styles.hash, { color: item.color }]}>#</Text>
                  <Text style={styles.projectName}>{item.name}</Text>
                </View>
              )}
            />
          ) : (
            <View style={styles.project}>
              <Text style={styles.projectName}>No projects</Text>
            </View>
          )}
        </View>
      </View>

      <CreateWidget onPress={handleCreate} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 10,
  },
  // project
  title: {
    fontFamily: "QuicksandBold",
    fontSize: 17,
    color: Colors.primaryText,
  },
  project: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderRadius: 10,
    backgroundColor: Colors.primaryBg,
  },
  hash: {
    fontFamily: "QuicksandBold",
    fontSize: 17,
    color: Colors.primaryText,
  },
  projectName: {
    fontFamily: "QuicksandMedium",
    fontSize: 17,
    color: Colors.primaryText,
  },
});
