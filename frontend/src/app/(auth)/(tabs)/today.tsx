import { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Stack, useRouter } from "expo-router";

import { TodayHeader } from "@/src/components/today/TodayHeader";
import { CreateWidget } from "@/src/components/CreateWidget";
import { useGetTodos } from "@/src/api/todo";
import { TodayItem } from "@/src/components/TodayItem";
import { Colors } from "@/src/constants/Colors";
import { ITodo, ITodos } from "@/src/types/types";

export default function Today() {
  const router = useRouter();
  const { data: todos } = useGetTodos();

  useEffect(() => {}, [todos]);

  if (todos.length === 0) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.secondaryText} />
      </View>
    );
  }

  const today = new Date().toDateString();
  const filterByDate = todos.filter(
    (todo: ITodos) => new Date(todo.title).toDateString() === today
  );
  const filteredTodos = filterByDate[0].data.filter(
    (item: ITodo) => !item.completed
  );

  const handleCreate = () => {
    router.push("/task/new-todo");
  };

  return (
    <>
      <Stack.Screen
        options={{ headerShown: true, header: () => <TodayHeader /> }}
      />

      {filteredTodos.length > 0 ? (
        <FlatList
          data={filteredTodos as ITodo[]}
          renderItem={({ item }) => <TodayItem todo={item} />}
          contentContainerStyle={{ padding: 20, gap: 20 }}
        />
      ) : (
        <View style={styles.container}>
          <Text style={styles.title}>No tasks for today</Text>
        </View>
      )}

      <CreateWidget onPress={handleCreate} />
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
    fontSize: 30,
    color: Colors.disabled,
  },
});
