# LifeFlow delivery outcomes

## Mobile-first shell and navigation
- [ ] The application is designed primarily for mobile phones with a modern, clean, minimal one-handed interface, readable text, clear icons, sufficient contrast, restrained animation, and a prominent floating Add Task button.
- [ ] Bottom navigation provides Home, My Tasks, Calendar, Notes, and Settings destinations.
- [ ] The application supports light and dark modes and leaves room for accent color, font size, and compact/comfortable layout preferences.

## Task capture and task lifecycle
- [ ] Users can create a task with a custom title and detailed description, choose a category and priority (Low, Medium, High, Critical), use flexible scheduling (no fixed date, specific date/time, date range, or long-term goal), add an optional deadline and estimated completion time, add tags and a color label, and define subtasks/checklists.
- [ ] Tasks support Not Started, In Progress, Paused, Completed, and Cancelled states; users can edit, duplicate, postpone, archive, and delete them.
- [ ] Users can pin important tasks, save unfinished tasks without a deadline, add notes and links, and choose list, card, calendar, or board views.

## Offline local data
- [ ] Task creation, editing, completion, filtering, and search work without an internet connection.
- [ ] Personal tasks are stored locally by default; export and delete-data controls are provided before optional cloud synchronization is considered.

## Native reminders
- [ ] Users can set reminders for selected dates/times, schedule multiple reminders, choose once/daily/weekly/monthly/yearly/custom patterns, receive deadline reminders, snooze for a custom duration, and reschedule when postponing.
- [ ] Future reminders stop when a task is completed or cancelled; sound, vibration, notification actions, time zones, device-time changes, background/closed-app delivery, and restart recovery follow the platform's supported native APIs and are verified in a development build or real device.
- [ ] Notification permission is requested clearly and the browser preview does not claim to verify native notifications.

## Dashboard and advanced planning
- [ ] Dashboard shows important tasks, in-progress tasks, upcoming reminders, overdue tasks, long-term goals, recently completed tasks, and user-selectable sections without assuming every task is due today.
- [ ] Flexible focus mode provides a timer; a rescheduling assistant suggests dates but requires approval; notes/ideas, progress history, quick capture, recurring tasks, custom categories/lists, and custom sorting/filtering are available.

## Backup and optional sync
- [ ] Users can export/import personal data and delete it; optional cloud synchronization uses secure authentication and protected storage only when explicitly enabled.
