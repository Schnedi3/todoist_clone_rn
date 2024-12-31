import { useEffect } from "react";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { router, Stack } from "expo-router";
import { useFonts } from "expo-font";
import {
  ClerkProvider,
  ClerkLoaded,
  useAuth,
  useUser,
} from "@clerk/clerk-expo";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Colors } from "@/src/constants/Colors";
import { tokenCache } from "@/src/lib/tokenCache";
import { useSaveUser } from "@/src/api/user";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string;
const queryClient = new QueryClient();

export default function InitialLayout(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache()}>
        <ClerkLoaded>
          <RootLayout />
        </ClerkLoaded>
      </ClerkProvider>
    </QueryClientProvider>
  );
}

function RootLayout(): JSX.Element {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const { mutate: saveUser } = useSaveUser();

  useEffect(() => {
    if (isSignedIn) {
      router.replace("/(auth)/(tabs)/today");
    } else {
      router.replace("/login");
    }
  }, [isSignedIn]);

  useEffect(() => {
    if (user) {
      saveUser({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.emailAddresses[0].emailAddress,
      });
    }
  }, [user]);

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: Colors.secondaryBg,
    },
  };

  useFonts({
    QuicksandBold: require("@/assets/fonts/Quicksand-Bold.ttf"),
    QuicksandMedium: require("@/assets/fonts/Quicksand-Medium.ttf"),
    QuicksandSemi: require("@/assets/fonts/Quicksand-SemiBold.ttf"),
  });

  return (
    <ThemeProvider value={MyTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
      </Stack>
    </ThemeProvider>
  );
}
