import { StyleSheet, Text, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { ITodo } from "@/src/types/types";
import { Colors } from "@/src/constants/Colors";
import { useCompleteTodo } from "@/src/api/todo";

export const TodayItem = ({ todo }: { todo: ITodo }) => {
  const { mutate: completeTodo } = useCompleteTodo();

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

      <View>
        <Text style={styles.todoTitle}>{todo.title}</Text>
        <Text style={styles.todoDescription}>{todo.description}</Text>
      </View>

      <View style={{ marginLeft: "auto", flexDirection: "row", gap: 5 }}>
        <Text style={{ color: todo.project_color }}>#</Text>
        <Text style={styles.todoProject}>{todo.project_name}</Text>
      </View>
    </Animated.View>
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
