"use client";

import { useEffect, useState, useMemo } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/Navbar";
import { api } from "@/lib/api";
import TaskCard from "@/components/TaskCard";
import TaskForm from "@/components/TaskForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Task, TaskStatus } from "@/types";
import { SORT_OPTIONS } from "@/lib/constants";
import { Loader2 } from "lucide-react";

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [open, setOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("createdAt");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const fetchTasks = async () => {
    setIsLoading(true);
    setError("");
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch tasks");
      console.error("Error fetching tasks:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Filter, search, and sort tasks
  const filteredTasks = useMemo(() => {
    let result = tasks.filter((task) => {
      // Filter by status
      const statusMatch =
        filterStatus === "all" || task.status === filterStatus;

      // Search by title or description
      const searchMatch =
        searchQuery === "" ||
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (task.description &&
          task.description.toLowerCase().includes(searchQuery.toLowerCase()));

      return statusMatch && searchMatch;
    });

    // Sort tasks
    result.sort((a, b) => {
      switch (sortBy) {
        case "priority":
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return (
            priorityOrder[b.priority as keyof typeof priorityOrder] -
            priorityOrder[a.priority as keyof typeof priorityOrder]
          );
        case "dueDate":
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return (
            new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
          );
        case "title":
          return a.title.localeCompare(b.title);
        case "createdAt":
        default:
          return (
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
          );
      }
    });

    return result;
  }, [tasks, filterStatus, searchQuery, sortBy]);

  return (
    <ProtectedRoute>
      <Navbar />

      <div className="max-w-3xl mx-auto mt-10 px-4 pb-10">
        <div className="flex justify-between mb-6 items-center">
          <h2 className="text-2xl font-semibold">My Tasks</h2>
          <Button onClick={() => setOpen(true)} aria-label="Create new task">
            + New Task
          </Button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 rounded-md bg-red-50 dark:bg-red-900/20 p-3 text-sm text-red-800 dark:text-red-400">
            {error}
          </div>
        )}

        {/* Filter, Search, and Sort Controls */}
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by title or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
                aria-label="Search tasks"
              />
            </div>
            <div className="w-full sm:w-48">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger aria-label="Filter by status">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="To Do">To Do</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Done">Done</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full sm:w-48">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger aria-label="Sort tasks">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {SORT_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          {filteredTasks.length > 0 && tasks.length > 0 && (
            <p className="text-sm text-muted-foreground">
              Showing {filteredTasks.length} of {tasks.length} task
              {tasks.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>

        {/* Task List */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredTasks.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {tasks.length === 0
                  ? "No tasks found. Create your first task!"
                  : "No tasks match your filters."}
              </p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <TaskCard key={task._id} task={task} refresh={fetchTasks} />
            ))
          )}
        </div>
      </div>

      {/* Task Form Modal */}
      <TaskForm open={open} setOpen={setOpen} refresh={fetchTasks} />
    </ProtectedRoute>
  );
}
