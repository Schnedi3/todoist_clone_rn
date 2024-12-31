import { Pressable, StyleSheet, Text, View } from "react-native";
import { Tabs } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

import { Colors } from "@/src/constants/Colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        animation: "shift",
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: 70,
          backgroundColor: Colors.primaryBg,
          paddingTop: 15,
          borderTopWidth: 1,
          borderColor: Colors.border,
          elevation: 0,
        },
        tabBarShowLabel: false,
        tabBarButton: (props) => {
          return <Pressable {...props} android_ripple={null} />;
        },
      }}
    >
      <Tabs.Screen
        name="today"
        options={{
          title: "Today",
          tabBarIcon: ({ focused }) => (
            <CustomTabBarIcon focused={focused} label="Today" iconName="staro" />
          ),
        }}
      />
      <Tabs.Screen
        name="upcoming"
        options={{
          title: "Upcoming",
          tabBarIcon: ({ focused }) => (
            <CustomTabBarIcon
              focused={focused}
              label="Upcoming"
              iconName="calendar"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ focused }) => (
            <CustomTabBarIcon
              focused={focused}
              label="Search"
              iconName="search1"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="browse"
        options={{
          title: "Browse",
          tabBarIcon: ({ focused }) => (
            <CustomTabBarIcon focused={focused} label="Browse" iconName="book" />
          ),
        }}
      />
    </Tabs>
  );
}

const CustomTabBarIcon = ({
  focused,
  label,
  iconName,
}: {
  focused: boolean;
  label: string;
  iconName: keyof typeof AntDesign.glyphMap;
}): JSX.Element => {
  const size = focused ? 32 : 22;
  const iconColor = focused ? Colors.accent : Colors.disabled;
  const display = focused ? "none" : "flex";

  return (
    <View style={styles.container}>
      <AntDesign name={iconName} color={iconColor} size={size} />

      <Text style={[styles.label, { display: display }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontFamily: "QuicksandMedium",
    fontSize: 11,
    color: Colors.disabled,
  },
});
