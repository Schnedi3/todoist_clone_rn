import { Stack } from "expo-router";

export default function Authlayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="task/new-todo"
        options={{ animation: "slide_from_bottom" }}
      />
      <Stack.Screen
        name="task/new-project"
        options={{ animation: "slide_from_bottom" }}
      />
    </Stack>
  );
}
