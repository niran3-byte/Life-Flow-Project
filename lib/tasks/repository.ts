import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Task } from "./types";

const TASKS_KEY = "lifeflow.tasks.v1";

export async function loadTasks(): Promise<Task[]> {
  try {
    const raw = await AsyncStorage.getItem(TASKS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as Task[]) : [];
  } catch {
    return [];
  }
}

export async function saveTasks(tasks: Task[]): Promise<void> {
  await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}

export async function clearTasks(): Promise<void> {
  await AsyncStorage.removeItem(TASKS_KEY);
}
