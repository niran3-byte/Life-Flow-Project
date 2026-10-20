export type TaskPriority = "low" | "medium" | "high" | "critical";
export type TaskStatus = "not_started" | "in_progress" | "paused" | "completed" | "cancelled";

export type Task = {
  id: string;
  title: string;
  description?: string;
  category: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueAt?: string;
  reminderAt?: string;
  estimatedMinutes?: number;
  tags: string[];
  color: string;
  pinned: boolean;
  createdAt: string;
  updatedAt: string;
};

export type NewTask = Pick<Task, "title" | "category" | "priority" | "color" | "tags"> &
  Partial<Pick<Task, "description" | "dueAt" | "reminderAt" | "estimatedMinutes">>;

export const priorityLabels: Record<TaskPriority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  critical: "Critical",
};

export const statusLabels: Record<TaskStatus, string> = {
  not_started: "Not started",
  in_progress: "In progress",
  paused: "Paused",
  completed: "Completed",
  cancelled: "Cancelled",
};

export const categoryOptions = ["Personal", "Learning", "Projects", "Fitness", "Goals", "Ideas"];

export const seedTasks: Task[] = [
  {
    id: "seed-focus",
    title: "Shape this week’s focus",
    description: "Choose one meaningful outcome before the week fills up.",
    category: "Goals",
    priority: "high",
    status: "in_progress",
    dueAt: new Date(Date.now() + 1000 * 60 * 60 * 7).toISOString(),
    estimatedMinutes: 25,
    tags: ["planning"],
    color: "#5B5CE2",
    pinned: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "seed-learning",
    title: "Watch the next TypeScript lesson",
    description: "Keep the learning thread moving without rushing it.",
    category: "Learning",
    priority: "medium",
    status: "not_started",
    estimatedMinutes: 40,
    tags: ["course"],
    color: "#42B883",
    pinned: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "seed-admin",
    title: "Reply to two important messages",
    category: "Personal",
    priority: "low",
    status: "completed",
    estimatedMinutes: 15,
    tags: ["admin"],
    color: "#E9A23B",
    pinned: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
