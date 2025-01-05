import { Pressable, StyleSheet, Text, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useRouter } from "expo-router";

import { ITodo } from "@/src/types/types";
import { Colors } from "@/src/constants/Colors";
import { useCompleteTodo } from "@/src/api/todo";

export const TodayItem = ({ todo }: { todo: ITodo }) => {
  const { mutate: completeTodo } = useCompleteTodo();
  const router = useRouter();

  const handleCompleteTodo = (completed: boolean, id: number) => {
    heightAnim.value = withTiming(0, {
      duration: 300,
      easing: Easing.inOut(Easing.ease),
    });
    opacityAnim.value = withTiming(0, {
      duration: 300,
      easing: Easing.inOut(Easing.ease),
    });

    completeTodo({ completed, id });
  };

  const heightAnim = useSharedValue(45);
  const opacityAnim = useSharedValue(1);

  const AnimatedStyle = useAnimatedStyle(() => {
    return {
      height: heightAnim.value,
      opacity: opacityAnim.value,
    };
  });

  const handleUpdateTodo = (id: number) => {
    router.push({ pathname: "/task/new-todo", params: { id } });
  };

  return (
    <Animated.View style={[styles.container, AnimatedStyle]}>
      <BouncyCheckbox
        size={28}
        disableText
        fillColor={todo.project_color}
        innerIconStyle={{ borderWidth: 2 }}
        isChecked={todo.completed}
        onPress={(isChecked) => {
          handleCompleteTodo(isChecked, todo.id);
        }}
      />

      <Pressable
        style={({ pressed }) => [
          styles.projectContainer,
          { opacity: pressed ? 0.5 : 1 },
        ]}
        onPress={() => handleUpdateTodo(todo.id)}
      >
        <View>
          <Text style={styles.todoTitle}>{todo.title}</Text>
          <Text style={styles.todoDescription}>{todo.description}</Text>
        </View>

        <View style={{ flexDirection: "row", gap: 5 }}>
          <Text style={{ color: todo.project_color }}>#</Text>
          <Text style={styles.todoProject}>{todo.project_name}</Text>
        </View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  projectContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
