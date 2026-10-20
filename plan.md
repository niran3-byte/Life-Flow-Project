# LifeFlow Personal Planner — implementation plan

## Scope and staged delivery

LifeFlow is a local-first Expo Router mobile app with a browser preview that mirrors the phone layout. Stage 1 delivers the mobile shell, the five navigation destinations, the dashboard, a task list, quick capture, and the first task detail/create flow. The first usable slice also persists tasks locally and schedules a one-time local reminder when a task includes a reminder date. Later stages can extend the same interfaces for recurring reminders, richer calendar/board views, goals, notes, backup/restore, and optional sync without changing the navigation model.

Native capability boundaries are explicit: browser Preview demonstrates layout, task interactions, local persistence, and empty/error states; real notifications, notification actions, vibration, restart rescheduling, and OS permission behavior must be verified in an Expo development build or on a real Android/iOS device. The app never treats browser alerts as equivalent to native notifications.

## Architecture

- `app/`: Expo Router screens. `(tabs)` owns the five primary destinations; modal routes can be added for task editing and settings.
- `components/`: reusable task cards, chips, progress rows, and navigation-safe layout pieces.
- `lib/tasks/`: typed task model, local repository, notification adapter, and task context/hooks.
- `hooks/`: theme and device hooks; keep platform-specific behavior behind small adapters.
- `server/`: reserved for future optional cloud synchronization; the first slice keeps personal data local by default.
- `drizzle/`: reserved for managed service data only; personal task records are local-first.
- `assets/images/`: bundled LifeFlow identity and launcher assets.

The task repository exposes `loadTasks`, `saveTasks`, `upsertTask`, `toggleTask`, and `removeTask`. The initial cross-platform storage implementation uses AsyncStorage so the laptop/web Preview and native shell behave identically; the repository boundary is intentionally ready for a SQLite-backed native adapter in the next persistence pass. Notifications are isolated in `lib/tasks/notifications.ts` and are no-ops on web.

## Design direction

Three candidate directions were considered: **Quiet kinetic planner** (0.07), a calm editorial workspace with indigo accents and measured motion; **Warm paper system** (0.06), a tactile cream-and-terracotta task journal; **Night signal** (0.04), a dark command center with neon status cues. The chosen direction is Quiet kinetic planner.

- **Design movement:** contemporary calm-tech, combining editorial spacing with soft utility surfaces.
- **Core principles:** focus before volume; one-handed reach; status is visible at a glance; customization stays lightweight.
- **Color philosophy:** warm off-white and ink create a steady canvas; indigo is the ownable focus color; mint and amber are reserved for progress and attention rather than decoration.
- **Layout paradigm:** a vertical focus rail: a compact greeting, a single “focus next” block, then low-friction sections that can be scanned with the thumb.
- **Signature elements:** indigo focus rail, rounded capsule metadata, and small progress rings/lines for momentum.
- **Interaction philosophy:** every tap should reveal one clear next step; completion is a satisfying, low-noise state change; destructive actions stay secondary.
- **Animation:** short opacity/scale feedback only on press and completion; no looping motion in the dashboard.
- **Typography:** system sans with large, friendly display weight for time-sensitive copy and compact medium labels for metadata.
- **Brand essence:** a personal planning space that flexes around real life instead of forcing every task into “today”; calm, capable, personal.
- **Brand voice:** concise and encouraging. Examples: “Choose what matters next.” and “A little progress still counts.”
- **Wordmark/logo:** LifeFlow wordmark paired with a simple indigo loop mark suggesting an open route rather than a checkmark.
- **Signature brand color:** deep indigo `#5B5CE2`, used for focus actions and selected navigation only.

## Build workflow

1. Stage 1: replace the starter screen with the mobile shell, theme, bottom tabs, dashboard sections, task cards, and quick-capture modal.
2. Stage 2: persist tasks offline through the repository, validate task fields, support status changes, and add filters/search.
3. Stage 3: schedule/cancel native local notifications and add recurring reminders, snooze, and postpone rescheduling behind the notification adapter.
4. Stage 4: add custom categories, notes, goals, calendar/board views, and dashboard customization.
5. Stage 5: add encrypted export/import and optional cloud synchronization only if explicitly enabled.
6. Stage 6: test native notifications and storage on a real Android phone, then document Expo Go/development-build setup and known OS limitations.

## Preview expectations

The managed Preview runs the Expo Web surface on port 8081 and is suitable for laptop inspection. Use the same relative application routes in Preview and on device. The preview is not evidence that native notifications work while the app is closed; that requires a development build and a physical/simulator device check.
