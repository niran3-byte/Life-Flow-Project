import { MaterialIcons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { AddTaskSheet } from "@/components/add-task-sheet";
import { TaskCard } from "@/components/task-card";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useTasks } from "@/lib/tasks/task-context";

type Filter = "all" | "open" | "done";
export default function TasksScreen() {
  const colors = useColors();
  const { tasks, addTask, toggleTask } = useTasks();
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);
  const filtered = useMemo(() => tasks.filter((task) => {
    const matchesFilter = filter === "all" || (filter === "done" ? task.status === "completed" : task.status !== "completed" && task.status !== "cancelled");
    const haystack = `${task.title} ${task.category} ${task.tags.join(" ")}`.toLowerCase();
    return matchesFilter && haystack.includes(query.toLowerCase());
  }), [filter, query, tasks]);
  return <ScreenContainer><ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
    <View style={styles.header}><View><Text style={[styles.eyebrow, { color: colors.tint }]}>YOUR SPACE</Text><Text style={[styles.heading, { color: colors.text }]}>My tasks</Text></View><Pressable onPress={() => setSheetOpen(true)} style={[styles.add, { backgroundColor: `${colors.tint}14` }]}><MaterialIcons name="add" size={18} color={colors.tint} /><Text style={[styles.addText, { color: colors.tint }]}>New</Text></Pressable></View>
    <View style={[styles.search, { backgroundColor: colors.surface, borderColor: colors.border }]}><MaterialIcons name="search" size={20} color={colors.muted} /><TextInput value={query} onChangeText={setQuery} placeholder="Search tasks, lists, tags" placeholderTextColor={colors.muted} style={[styles.input, { color: colors.text }]} /></View>
    <View style={styles.filters}>{(["all", "open", "done"] as Filter[]).map((item) => <Pressable key={item} onPress={() => setFilter(item)} style={[styles.filter, { backgroundColor: filter === item ? colors.tint : colors.surface }]}><Text style={{ color: filter === item ? "#FFF" : colors.muted, fontWeight: "800", fontSize: 12 }}>{item === "all" ? "All" : item === "open" ? "In motion" : "Completed"}</Text></Pressable>)}</View>
    <Text style={[styles.result, { color: colors.muted }]}>{filtered.length} {filtered.length === 1 ? "task" : "tasks"} · {filter === "all" ? "everything" : filter === "open" ? "still in motion" : "recent wins"}</Text>
    <View style={styles.list}>{filtered.map((task) => <TaskCard key={task.id} task={task} onToggle={() => toggleTask(task.id)} />)}</View>
    {!filtered.length ? <View style={[styles.empty, { backgroundColor: colors.surface }]}><MaterialIcons name="search-off" size={28} color={colors.tint} /><Text style={[styles.emptyTitle, { color: colors.text }]}>No match yet.</Text><Text style={[styles.emptyCopy, { color: colors.muted }]}>Try another word or capture a new task.</Text></View> : null}
  </ScrollView><AddTaskSheet visible={sheetOpen} onClose={() => setSheetOpen(false)} onCreate={async (task) => { await addTask(task); }} /></ScreenContainer>;
}
const styles = StyleSheet.create({ content: { paddingHorizontal: 20, paddingTop: 18, paddingBottom: 120, gap: 16, maxWidth: 760, width: "100%", alignSelf: "center" }, header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }, eyebrow: { fontSize: 10, letterSpacing: 1.7, fontWeight: "800", marginBottom: 7 }, heading: { fontSize: 32, fontWeight: "800", letterSpacing: -1 }, add: { borderRadius: 999, paddingHorizontal: 13, paddingVertical: 10, flexDirection: "row", alignItems: "center", gap: 5 }, addText: { fontSize: 12, fontWeight: "800" }, search: { borderWidth: 1, borderRadius: 16, paddingHorizontal: 13, flexDirection: "row", alignItems: "center", gap: 8 }, input: { flex: 1, paddingVertical: 13, fontSize: 14 }, filters: { flexDirection: "row", gap: 8 }, filter: { borderRadius: 999, paddingHorizontal: 14, paddingVertical: 10 }, result: { fontSize: 12, fontWeight: "700", marginTop: 4 }, list: { gap: 10 }, empty: { borderRadius: 22, padding: 26, alignItems: "center", gap: 8 }, emptyTitle: { fontSize: 17, fontWeight: "800" }, emptyCopy: { fontSize: 13 }, });
