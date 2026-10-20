import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { configureNotifications, scheduleTaskReminder } from "./notifications";
import { loadTasks, saveTasks } from "./repository";
import { seedTasks, type NewTask, type Task, type TaskStatus } from "./types";

type TaskContextValue = {
  tasks: Task[];
  isHydrated: boolean;
  addTask: (input: NewTask) => Promise<Task>;
  toggleTask: (id: string) => Promise<void>;
  setStatus: (id: string, status: TaskStatus) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  duplicateTask: (id: string) => Promise<void>;
};

const TaskContext = createContext<TaskContextValue | null>(null);

function createTask(input: NewTask): Task {
  const now = new Date().toISOString();
  return {
    id: `task-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    title: input.title.trim(),
    description: input.description?.trim(),
    category: input.category,
    priority: input.priority,
    status: "not_started",
    dueAt: input.dueAt,
    reminderAt: input.reminderAt,
    estimatedMinutes: input.estimatedMinutes,
    tags: input.tags,
    color: input.color,
    pinned: false,
    createdAt: now,
    updatedAt: now,
  };
}

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    configureNotifications();
    void loadTasks().then((stored) => {
      const next = stored.length ? stored : seedTasks;
      setTasks(next);
      if (!stored.length) void saveTasks(next);
      setIsHydrated(true);
    });
  }, []);

  const persist = useCallback(async (next: Task[]) => {
    setTasks(next);
    await saveTasks(next);
  }, []);

  const addTask = useCallback(async (input: NewTask) => {
    const task = createTask(input);
    const next = [task, ...tasks];
    await persist(next);
    void scheduleTaskReminder(task);
    return task;
  }, [persist, tasks]);

  const toggleTask = useCallback(async (id: string) => {
    const next = tasks.map((task) => task.id === id
      ? { ...task, status: (task.status === "completed" ? "not_started" : "completed") as Task["status"], updatedAt: new Date().toISOString() }
      : task);
    await persist(next);
  }, [persist, tasks]);

  const setStatus = useCallback(async (id: string, status: TaskStatus) => {
    const next = tasks.map((task) => task.id === id ? { ...task, status, updatedAt: new Date().toISOString() } : task);
    await persist(next);
  }, [persist, tasks]);

  const deleteTask = useCallback(async (id: string) => {
    await persist(tasks.filter((task) => task.id !== id));
  }, [persist, tasks]);

  const duplicateTask = useCallback(async (id: string) => {
    const source = tasks.find((task) => task.id === id);
    if (!source) return;
    const duplicate = createTask({
      title: `${source.title} copy`,
      description: source.description,
      category: source.category,
      priority: source.priority,
      color: source.color,
      tags: source.tags,
      dueAt: source.dueAt,
      reminderAt: source.reminderAt,
      estimatedMinutes: source.estimatedMinutes,
    });
    await persist([duplicate, ...tasks]);
  }, [persist, tasks]);

  const value = useMemo(() => ({ tasks, isHydrated, addTask, toggleTask, setStatus, deleteTask, duplicateTask }), [
    tasks, isHydrated, addTask, toggleTask, setStatus, deleteTask, duplicateTask,
  ]);
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks() {
  const value = useContext(TaskContext);
  if (!value) throw new Error("useTasks must be used within TaskProvider");
  return value;
}
