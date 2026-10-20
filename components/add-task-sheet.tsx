import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, View } from "react-native";
import { useColors } from "@/hooks/use-colors";
import { categoryOptions, priorityLabels, type NewTask, type TaskPriority } from "@/lib/tasks/types";

export function AddTaskSheet({ visible, onClose, onCreate }: { visible: boolean; onClose: () => void; onCreate: (task: NewTask) => Promise<void> }) {
  const colors = useColors();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(categoryOptions[0]);
  const [priority, setPriority] = useState<TaskPriority>("medium");
  const [remind, setRemind] = useState(false);
  const [saving, setSaving] = useState(false);

  const reset = () => { setTitle(""); setDescription(""); setCategory(categoryOptions[0]); setPriority("medium"); setRemind(false); };
  const submit = async () => {
    if (!title.trim() || saving) return;
    setSaving(true);
    const reminderAt = remind ? new Date(Date.now() + 60 * 60 * 1000).toISOString() : undefined;
    await onCreate({ title, description, category, priority, color: priority === "critical" ? "#E86969" : priority === "high" ? "#E9A23B" : "#5B5CE2", tags: [], reminderAt });
    setSaving(false);
    reset();
    onClose();
  };

  return (
    <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
      <KeyboardAvoidingView style={styles.backdrop} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <View style={[styles.sheet, { backgroundColor: colors.background }]}>
          <View style={styles.handle} />
          <View style={styles.header}><View><Text style={[styles.eyebrow, { color: colors.tint }]}>QUICK CAPTURE</Text><Text style={[styles.heading, { color: colors.text }]}>What matters next?</Text></View><Pressable onPress={onClose} hitSlop={10}><MaterialIcons name="close" size={22} color={colors.muted} /></Pressable></View>
          <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
            <TextInput autoFocus placeholder="Task title" placeholderTextColor={colors.muted} value={title} onChangeText={setTitle} style={[styles.titleInput, { color: colors.text, borderColor: colors.border }]} />
            <TextInput placeholder="Add a little context (optional)" placeholderTextColor={colors.muted} value={description} onChangeText={setDescription} multiline style={[styles.description, { color: colors.text, borderColor: colors.border }]} />
            <Text style={[styles.label, { color: colors.muted }]}>LIST</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
              {categoryOptions.map((item) => <Pressable key={item} onPress={() => setCategory(item)} style={[styles.chip, { backgroundColor: category === item ? colors.tint : colors.surface }]}><Text style={{ color: category === item ? "#FFF" : colors.text, fontWeight: "700", fontSize: 12 }}>{item}</Text></Pressable>)}
            </ScrollView>
            <Text style={[styles.label, { color: colors.muted }]}>PRIORITY</Text>
            <View style={styles.priorityRow}>{(Object.keys(priorityLabels) as TaskPriority[]).map((item) => <Pressable key={item} onPress={() => setPriority(item)} style={[styles.priority, { borderColor: priority === item ? colors.tint : colors.border, backgroundColor: priority === item ? `${colors.tint}16` : "transparent" }]}><Text style={{ color: priority === item ? colors.tint : colors.muted, fontWeight: "700", fontSize: 12 }}>{priorityLabels[item]}</Text></Pressable>)}</View>
            <View style={[styles.reminder, { backgroundColor: colors.surface }]}><View style={styles.reminderCopy}><MaterialIcons name="notifications-none" size={20} color={colors.tint} /><View><Text style={[styles.reminderTitle, { color: colors.text }]}>Remind me in one hour</Text><Text style={[styles.reminderHint, { color: colors.muted }]}>Native notification on your phone</Text></View></View><Switch value={remind} onValueChange={setRemind} trackColor={{ false: colors.border, true: colors.tint }} thumbColor="#FFF" /></View>
            <Pressable onPress={submit} style={({ pressed }) => [styles.create, { backgroundColor: colors.tint, opacity: pressed || saving ? 0.75 : 1 }]}><Text style={styles.createText}>{saving ? "Saving…" : "Add to my flow"}</Text><MaterialIcons name="arrow-forward" size={18} color="#FFF" /></Pressable>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(13, 15, 35, 0.28)" },
  sheet: { borderTopLeftRadius: 28, borderTopRightRadius: 28, paddingHorizontal: 20, paddingTop: 12, paddingBottom: 28, maxHeight: "88%" },
  handle: { alignSelf: "center", width: 42, height: 4, borderRadius: 2, backgroundColor: "#D1D5DB", marginBottom: 18 },
  header: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 },
  eyebrow: { fontSize: 10, letterSpacing: 1.5, fontWeight: "800", marginBottom: 5 },
  heading: { fontSize: 26, fontWeight: "800", letterSpacing: -0.6 },
  titleInput: { borderWidth: 1, borderRadius: 16, paddingHorizontal: 15, paddingVertical: 15, fontSize: 17, fontWeight: "700", marginBottom: 12 },
  description: { borderWidth: 1, borderRadius: 16, paddingHorizontal: 15, paddingVertical: 13, fontSize: 14, minHeight: 76, textAlignVertical: "top", marginBottom: 20 },
  label: { fontSize: 10, letterSpacing: 1.3, fontWeight: "800", marginBottom: 9 },
  chips: { gap: 8, paddingBottom: 20 },
  chip: { paddingHorizontal: 13, paddingVertical: 9, borderRadius: 999 },
  priorityRow: { flexDirection: "row", gap: 7, marginBottom: 20 },
  priority: { flex: 1, alignItems: "center", borderWidth: 1, borderRadius: 12, paddingVertical: 10 },
  reminder: { borderRadius: 17, padding: 14, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 18 },
  reminderCopy: { flexDirection: "row", alignItems: "center", gap: 10 },
  reminderTitle: { fontSize: 13, fontWeight: "800", marginBottom: 3 },
  reminderHint: { fontSize: 11 },
  create: { borderRadius: 16, paddingVertical: 15, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8 },
  createText: { color: "#FFF", fontSize: 14, fontWeight: "800" },
});
