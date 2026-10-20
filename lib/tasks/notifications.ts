import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import type { Task } from "./types";

let configured = false;

export function configureNotifications() {
  if (Platform.OS === "web" || configured) return;
  configured = true;
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
}

export async function requestNotificationPermission(): Promise<boolean> {
  if (Platform.OS === "web") return false;
  const current = await Notifications.getPermissionsAsync();
  if (current.granted) return true;
  const requested = await Notifications.requestPermissionsAsync();
  return requested.granted;
}

export async function scheduleTaskReminder(task: Task): Promise<string | null> {
  if (Platform.OS === "web" || !task.reminderAt) return null;
  const date = new Date(task.reminderAt);
  if (date.getTime() <= Date.now()) return null;
  const permitted = await requestNotificationPermission();
  if (!permitted) return null;
  return Notifications.scheduleNotificationAsync({
    content: {
      title: task.title,
      body: task.description || `A gentle reminder from LifeFlow · ${task.category}`,
      sound: "default",
      data: { taskId: task.id },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date,
    },
  });
}

export async function cancelReminder(notificationId?: string) {
  if (Platform.OS === "web" || !notificationId) return;
  await Notifications.cancelScheduledNotificationAsync(notificationId);
}
