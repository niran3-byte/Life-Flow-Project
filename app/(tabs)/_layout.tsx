import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { HapticTab } from "@/components/haptic-tab";
import { MaterialIcons } from "@expo/vector-icons";
import { Platform } from "react-native";
import { useColors } from "@/hooks/use-colors";

export default function TabLayout() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const bottomPadding = Platform.OS === "web" ? 12 : Math.max(insets.bottom, 8);
  const tabBarHeight = 56 + bottomPadding;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          paddingTop: 8,
          paddingBottom: bottomPadding,
          height: tabBarHeight,
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          borderTopWidth: 0.5,
        },
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Home", tabBarIcon: ({ color }) => <MaterialIcons size={23} name="home-filled" color={color} /> }} />
      <Tabs.Screen name="tasks" options={{ title: "My Tasks", tabBarIcon: ({ color }) => <MaterialIcons size={23} name="checklist" color={color} /> }} />
      <Tabs.Screen name="calendar" options={{ title: "Calendar", tabBarIcon: ({ color }) => <MaterialIcons size={23} name="calendar-month" color={color} /> }} />
      <Tabs.Screen name="notes" options={{ title: "Notes", tabBarIcon: ({ color }) => <MaterialIcons size={23} name="edit-note" color={color} /> }} />
      <Tabs.Screen name="settings" options={{ title: "Settings", tabBarIcon: ({ color }) => <MaterialIcons size={23} name="tune" color={color} /> }} />
    </Tabs>
  );
}
