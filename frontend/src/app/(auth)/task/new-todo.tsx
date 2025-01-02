import { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Calendar, DateData } from "react-native-calendars";
import { format } from "date-fns";

import { NewHeader } from "@/src/components/task/NewHeader";
import { Colors } from "@/src/constants/Colors";
import { useGetProjects } from "@/src/api/project";
import { useAddTodo } from "@/src/api/todo";
import { IProject } from "@/src/types/types";

const today = format(new Date(), "yyyy-MM-dd");

export default function NewTodo() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [projectId, setProjectId] = useState<number>(0);
  const [priority, setPriority] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>(today);

  const { data: projects } = useGetProjects();
  const { mutate: addTodo } = useAddTodo();

  useEffect(() => {}, [projects]);

  const handleCreateTodo = () => {
    if (!title || !description || !projectId || !priority || !dueDate) {
      Alert.alert("Empty fields", "Please fill all the fields");
      return;
    }

    addTodo({
      title,
      description,
      projectId,
      priority,
      dueDate,
    });
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => (
            <NewHeader title="New task" onPress={handleCreateTodo} />
          ),
        }}
      />

      <View style={styles.container}>
        {/* title and description */}
        <View style={{ gap: 5 }}>
          <Text style={styles.title}>Title and description</Text>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Title"
              placeholderTextColor={Colors.disabled}
              style={styles.input}
              value={title}
              onChangeText={(text) => setTitle(text)}
            />

            {title && (
              <Pressable
                style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
                onPress={() => setTitle("")}
              >
                <Ionicons name="close-outline" style={styles.clearIcon} />
              </Pressable>
            )}
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Description"
              placeholderTextColor={Colors.disabled}
              style={styles.input}
              value={description}
              onChangeText={(text) => setDescription(text)}
            />

            {description && (
              <Pressable
                style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
                onPress={() => setDescription("")}
              >
                <Ionicons name="close-outline" style={styles.clearIcon} />
              </Pressable>
            )}
          </View>
        </View>

        {/* projects */}
        <View style={{ gap: 5 }}>
          <Text style={styles.title}>Project</Text>

          <View style={styles.projectsContainer}>
            {projects &&
              projects.map((item: IProject) => (
                <Pressable
                  key={item.id}
                  style={({ pressed }) => [
                    styles.project,
                    {
                      opacity: pressed ? 0.5 : 1,
                      borderColor:
                        projectId === item.id ? item.color : Colors.border,
                    },
                  ]}
                  onPress={() => setProjectId(item.id)}
                >
                  <Text style={[styles.hash, { color: item.color }]}>#</Text>
                  <Text style={styles.projectName}>{item.name}</Text>
                </Pressable>
              ))}
          </View>
        </View>

        {/* priority */}
        <View style={{ gap: 5 }}>
          <Text style={styles.title}>Priority</Text>

          <View style={styles.priorityContainer}>
            <PriorityButton
              label="low"
              priority={priority}
              setPriority={setPriority}
            />
            <PriorityButton
              label="medium"
              priority={priority}
              setPriority={setPriority}
            />
            <PriorityButton
              label="high"
              priority={priority}
              setPriority={setPriority}
            />
          </View>
        </View>

        {/* calendar */}
        <View style={{ gap: 5 }}>
          <Text style={styles.title}>Date</Text>

          <Calendar
            onDayPress={(day: DateData) => setDueDate(day.dateString)}
            hideArrows
            enableSwipeMonths={true}
            theme={{
              backgroundColor: "transparent",
              calendarBackground: "transparent",
              monthTextColor: Colors.accent,
              dayTextColor: Colors.secondaryText,
              todayTextColor: Colors.accent,
              todayBackgroundColor: Colors.border,
              textSectionTitleColor: Colors.secondaryText,
              textDisabledColor: Colors.border,
              textMonthFontFamily: "QuicksandBold",
              textDayHeaderFontFamily: "QuicksandSemi",
              textDayFontFamily: "QuicksandMedium",
            }}
            markedDates={{
              [dueDate]: {
                selected: true,
                selectedColor: Colors.accent,
              },
            }}
          />
        </View>
      </View>
    </>
  );
}

const PriorityButton = ({
  label,
  priority,
  setPriority,
}: {
  label: string;
  priority: string;
  setPriority: (value: string) => void;
}) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.priority,
        {
          opacity: pressed ? 0.5 : 1,
          borderColor: priority === label ? Colors.accent : Colors.border,
        },
      ]}
      onPress={() => setPriority(label)}
    >
      <Text style={styles.priorityText}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 20,
  },
  title: {
    fontFamily: "QuicksandBold",
    fontSize: 17,
    color: Colors.primaryText,
  },
  // input
  inputContainer: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.primaryBg,
  },
  input: {
    flex: 1,
    fontFamily: "QuicksandMedium",
    fontSize: 16,
    color: Colors.primaryText,
  },
  clearIcon: {
    fontSize: 24,
    color: Colors.secondaryText,
  },
  // projects
  projectsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
  },
  project: {
    paddingTop: 7,
    paddingBottom: 11,
    paddingHorizontal: 20,
    flexDirection: "row",
    gap: 10,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: Colors.primaryBg,
  },
  hash: {
    fontFamily: "QuicksandBold",
    fontSize: 16,
    color: Colors.primaryText,
  },
  projectName: {
    fontFamily: "QuicksandMedium",
    fontSize: 16,
    color: Colors.primaryText,
  },
  // priority
  priorityContainer: {
    flexDirection: "row",
    gap: 20,
  },
  priority: {
    paddingTop: 7,
    paddingBottom: 11,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: Colors.primaryBg,
  },
  priorityText: {
    fontFamily: "QuicksandMedium",
    fontSize: 16,
    color: Colors.primaryText,
    textTransform: "capitalize",
  },
});
