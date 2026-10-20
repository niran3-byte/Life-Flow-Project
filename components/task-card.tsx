import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useColors } from "@/hooks/use-colors";
import { priorityLabels, type Task } from "@/lib/tasks/types";

function formatDue(dueAt?: string) {
  if (!dueAt) return "No deadline";
  const date = new Date(dueAt);
  const sameDay = date.toDateString() === new Date().toDateString();
  return sameDay ? `Today · ${date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}` : date.toLocaleDateString([], { month: "short", day: "numeric" });
}

export function TaskCard({ task, onToggle, onPress }: { task: Task; onToggle: () => void; onPress?: () => void }) {
  const colors = useColors();
  const done = task.status === "completed";
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, { backgroundColor: colors.surface, borderColor: colors.border, opacity: pressed ? 0.88 : 1 }]}>
      <Pressable onPress={onToggle} hitSlop={10} style={[styles.check, { borderColor: done ? colors.tint : colors.border, backgroundColor: done ? colors.tint : "transparent" }]}>
        {done ? <MaterialIcons name="check" size={15} color="#FFFFFF" /> : null}
      </Pressable>
      <View style={styles.copy}>
        <Text style={[styles.title, { color: colors.text }, done && styles.completed]} numberOfLines={2}>{task.title}</Text>
        <View style={styles.metaRow}>
          <View style={[styles.dot, { backgroundColor: task.color }]} />
          <Text style={[styles.meta, { color: colors.muted }]}>{task.category}</Text>
          <Text style={[styles.meta, { color: colors.muted }]}>·</Text>
          <Text style={[styles.meta, { color: task.priority === "critical" ? colors.error : colors.muted }]}>{priorityLabels[task.priority]}</Text>
        </View>
      </View>
      <View style={styles.trailing}>
        {task.pinned ? <MaterialIcons name="push-pin" size={16} color={colors.tint} /> : null}
        <Text style={[styles.due, { color: task.dueAt && new Date(task.dueAt) < new Date() && !done ? colors.error : colors.muted }]}>{formatDue(task.dueAt)}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { borderWidth: 1, borderRadius: 20, padding: 14, flexDirection: "row", alignItems: "center", gap: 12, minHeight: 78 },
  check: { width: 24, height: 24, borderRadius: 12, borderWidth: 1.5, alignItems: "center", justifyContent: "center" },
  copy: { flex: 1, gap: 7 },
  title: { fontSize: 15, lineHeight: 20, fontWeight: "700" },
  completed: { textDecorationLine: "line-through", opacity: 0.55 },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  dot: { width: 7, height: 7, borderRadius: 4 },
  meta: { fontSize: 11, fontWeight: "600" },
  trailing: { alignItems: "flex-end", gap: 8, minWidth: 68 },
  due: { fontSize: 10, fontWeight: "600", textAlign: "right" },
});
