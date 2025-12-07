export const TASK_STATUSES: Array<{ value: string; label: string }> = [
  { value: "To Do", label: "To Do" },
  { value: "In Progress", label: "In Progress" },
  { value: "Done", label: "Done" },
];

export const TASK_PRIORITIES: Array<{ value: string; label: string }> = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

export const SORT_OPTIONS: Array<{ value: string; label: string }> = [
  { value: "createdAt", label: "Newest First" },
  { value: "priority", label: "Priority" },
  { value: "dueDate", label: "Due Date" },
  { value: "title", label: "Title (A-Z)" },
];

export const PRIORITY_COLORS: Record<string, string> = {
  high: "bg-red-100 text-red-800 border-red-300 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800",
  low: "bg-green-100 text-green-800 border-green-300 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800",
};

export const STATUS_COLORS: Record<string, string> = {
  Done: "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800",
  "In Progress": "bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800",
  "To Do": "bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700",
};

