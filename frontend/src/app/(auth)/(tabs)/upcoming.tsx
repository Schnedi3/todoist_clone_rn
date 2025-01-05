import { Pressable, StyleSheet, Text, View } from "react-native";
import { Stack, useRouter } from "expo-router";
import { format } from "date-fns";
import {
  AgendaList,
  ExpandableCalendar,
  CalendarProvider,
} from "react-native-calendars";
import { MarkedDates } from "react-native-calendars/src/types";

import { Colors } from "@/src/constants/Colors";
import { UpcomingHeader } from "@/src/components/upcoming/UpcomingHeader";
import { ITodos } from "@/src/types/types";
import { useGetTodos } from "@/src/api/todo";

export default function Upcoming() {
  const router = useRouter();
  const { data: todos } = useGetTodos();

  const formatDate = (date: string) => format(new Date(date), "yyyy-MM-dd");

  const today = formatDate(new Date().toDateString());
  const filteredTodos = todos.filter(
    (todo: ITodos) => formatDate(todo.title) > today
  );

  // expandable calendar
  const dates = todos.map((todo: ITodos) => formatDate(todo.title));
  const filteredDates = dates.filter((date: string) => date > today);

  const markedDates = () => {
    const marked: MarkedDates = {};

    filteredDates.map((date: string) => {
      marked[date] = {
        marked: true,
        dotColor: Colors.accent,
      };
    });

    return marked;
  };

  const handleUpdateTodo = (id: number) => {
    router.push({ pathname: "/task/new-todo", params: { id } });
  };

  return (
    <>
      <Stack.Screen
        options={{ headerShown: true, header: () => <UpcomingHeader /> }}
      />

      <CalendarProvider
        date={today}
        showTodayButton
        theme={{
          todayButtonFontFamily: "QuicksandMedium",
          todayButtonTextColor: Colors.secondaryText,
          todayButtonFontSize: 16,
        }}
        todayButtonStyle={{
          width: 100,
          height: 36,
          borderWidth: 1,
          borderRadius: 20,
          borderColor: Colors.border,
          backgroundColor: Colors.primaryBg,
          elevation: 0,
        }}
      >
        <ExpandableCalendar
          current={today}
          firstDay={1}
          hideArrows
          markedDates={markedDates()}
          allowShadow={false}
          theme={{
            calendarBackground: Colors.primaryBg,
            textSectionTitleColor: Colors.primaryText,
            todayTextColor: Colors.accent,
            selectedDayTextColor: Colors.accent,
            selectedDayBackgroundColor: Colors.border,
            dayTextColor: Colors.secondaryText,
            todayBackgroundColor: Colors.border,
            textDisabledColor: Colors.border,
            monthTextColor: Colors.accent,
            textMonthFontFamily: "QuicksandBold",
            textDayHeaderFontFamily: "QuicksandSemi",
            textDayFontFamily: "QuicksandMedium",
          }}
        />

        <AgendaList
          sections={filteredTodos}
          renderItem={({ item }) => (
            <Pressable
              style={({ pressed }) => [
                styles.projectContainer,
                { opacity: pressed ? 0.5 : 1 },
              ]}
              onPress={() => handleUpdateTodo(item.id)}
            >
              <View>
                <Text style={styles.todoTitle}>{item.title}</Text>
                <Text style={styles.todoDescription}>{item.description}</Text>
              </View>

              <View style={{ flexDirection: "row", gap: 5 }}>
                <Text style={{ color: item.project_color }}>#</Text>
                <Text style={styles.todoProject}>{item.project_name}</Text>
              </View>
            </Pressable>
          )}
          dayFormatter={(date) => format(new Date(date), "eee · dd MMM")}
          sectionStyle={styles.section}
          contentContainerStyle={{ gap: 20 }}
        />
      </CalendarProvider>
    </>
  );
}

const styles = StyleSheet.create({
  section: {
    fontSize: 18,
    color: Colors.primaryText,
    borderBottomWidth: 1,
    paddingBottom: 5,
    borderColor: Colors.border,
    textTransform: "capitalize",
    backgroundColor: "transparent",
  },
  projectContainer: {
    marginHorizontal: 20,
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
