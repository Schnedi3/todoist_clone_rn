import { StyleSheet, Text, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

import { ITodo } from "@/src/types/types";
import { Colors } from "@/src/constants/Colors";

export const TodayItem = ({ todo }: { todo: ITodo }) => {
  return (
    <View style={styles.container}>
      <BouncyCheckbox
        size={28}
        disableText
        fillColor={todo.project_color}
        innerIconStyle={{ borderWidth: 2 }}
      />

      <View>
        <Text style={styles.todoTitle}>{todo.title}</Text>
        <Text style={styles.todoDescription}>{todo.description}</Text>
      </View>

      <View style={{ marginLeft: "auto", flexDirection: "row", gap: 5 }}>
        <Text style={{ color: todo.project_color }}>#</Text>
        <Text style={styles.todoProject}>{todo.project_name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  todoTitle: {
    fontFamily: "QuicksandSemi",
    fontSize: 16,
    color: Colors.primaryText,
  },
  todoDescription: {
    fontFamily: "QuicksandMedium",
    fontSize: 13,
    color: Colors.disabled,
  },
  todoProject: {
    fontFamily: "QuicksandMedium",
    fontSize: 12,
    color: Colors.disabled,
  },
});
