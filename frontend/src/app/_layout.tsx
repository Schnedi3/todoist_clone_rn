import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";

import { Colors } from "@/src/constants/Colors";

export default function RootLayout() {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: Colors.secondaryBg,
    },
  };

  return (
    <ThemeProvider value={MyTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </ThemeProvider>
  );
}
