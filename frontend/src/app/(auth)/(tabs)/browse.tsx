import { useEffect } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Stack } from "expo-router";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";

import { Colors } from "@/src/constants/Colors";
import { BrowseHeader } from "@/src/components/browse/BrowseHeader";
import { CreateWidget } from "@/src/components/CreateWidget";
import { useDeleteProject, useGetProjects } from "@/src/api/project";
import { IProject } from "@/src/types/types";

export default function Browse() {
  const router = useRouter();
  const { data: projects } = useGetProjects();
  const { mutate: deleteProject } = useDeleteProject();

  useEffect(() => {}, [projects]);

  const handleCreate = () => {
    router.push("/task/new-project");
  };

  const handleDeleteProject = (id: number) => {
    Alert.alert(
      "Delete project",
      "All the tasks associated with this project will be deleted.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => deleteProject(id),
          style: "destructive",
        },
      ]
    );
  };

  return (
    <>
      <Stack.Screen
        options={{ headerShown: true, header: () => <BrowseHeader /> }}
      />

      <GestureHandlerRootView>
        <View style={styles.container}>
          <Text style={styles.title}>My projects</Text>

          <View style={{ gap: 5 }}>
            {projects ? (
              <FlatList
                data={projects as IProject[]}
                renderItem={({ item }) => (
                  <Swipeable
                    key={item.id}
                    renderRightActions={() => (
                      <Pressable
                        style={[
                          styles.deleteButton,
                          { backgroundColor: item.color },
                        ]}
                        onPress={() => handleDeleteProject(item.id)}
                      >
                        <Ionicons
                          name="trash-bin-outline"
                          style={styles.deleteIcon}
                        />
                      </Pressable>
                    )}
                  >
                    <View style={styles.project}>
                      <Text style={[styles.hash, { color: item.color }]}>
                        #
                      </Text>
                      <Text style={styles.projectName}>{item.name}</Text>
                    </View>
                  </Swipeable>
                )}
              />
            ) : (
              <View style={styles.project}>
                <Text style={styles.projectName}>No projects</Text>
              </View>
            )}
          </View>
        </View>
      </GestureHandlerRootView>

      <CreateWidget onPress={handleCreate} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    gap: 10,
  },
  // project
  title: {
    paddingHorizontal: 20,
    fontFamily: "QuicksandBold",
    fontSize: 17,
    color: Colors.primaryText,
  },
  project: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
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
  // delete
  deleteButton: {
    width: 70,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteIcon: {
    fontSize: 24,
    color: Colors.invertedText,
  },
});
