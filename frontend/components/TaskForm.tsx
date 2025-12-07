"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Task, TaskFormData } from "@/types";
import { TASK_STATUSES, TASK_PRIORITIES } from "@/lib/constants";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  refresh: () => void;
  task?: Task;
}

export default function TaskForm({ open, setOpen, refresh, task }: TaskFormProps) {
  const isEdit = Boolean(task);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const [data, setData] = useState<TaskFormData>({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
    status: "To Do",
  });

  useEffect(() => {
    if (task) {
      const dueDate = task.dueDate ? new Date(task.dueDate) : undefined;
      const dueDateString = task.dueDate
        ? new Date(task.dueDate).toISOString().split("T")[0]
        : "";

      setSelectedDate(dueDate);
      setData({
        title: task.title,
        description: task.description || "",
        dueDate: dueDateString,
        priority: task.priority,
        status: task.status,
      });
    } else {
      setSelectedDate(undefined);
      setData({
        title: "",
        description: "",
        dueDate: "",
        priority: "medium",
        status: "To Do",
      });
    }
    setError("");
  }, [task, open]);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      const dateString = format(date, "yyyy-MM-dd");
      setData({ ...data, dueDate: dateString });
    } else {
      setData({ ...data, dueDate: "" });
    }
    setCalendarOpen(false);
  };

  const handleSave = async () => {
    if (!data.title.trim()) {
      setError("Title is required");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      if (isEdit && task) {
        await api.put(`/tasks/${task._id}`, data);
      } else {
        await api.post("/tasks", data);
      }

      refresh();
      setOpen(false);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to save task");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Task" : "Create Task"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {error && (
            <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-3 text-sm text-red-800 dark:text-red-400">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="title" className="text-sm font-medium mb-1 block">
              Title <span className="text-red-500">*</span>
            </label>
            <Input
              id="title"
              placeholder="Task title"
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
              disabled={isLoading}
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="text-sm font-medium mb-1 block">
              Description
            </label>
            <Textarea
              id="description"
              placeholder="Task description"
              value={data.description}
              onChange={(e) => setData({ ...data, description: e.target.value })}
              disabled={isLoading}
              rows={4}
            />
          </div>

          <div>
            <label htmlFor="dueDate" className="text-sm font-medium mb-1 block">
              Due Date
            </label>
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  id="dueDate"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !selectedDate && "text-muted-foreground"
                  )}
                  disabled={isLoading}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? (
                    format(selectedDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  disabled={(date) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return date < today;
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <label htmlFor="priority" className="text-sm font-medium mb-1 block">
              Priority
            </label>
            <Select
              value={data.priority}
              onValueChange={(value) =>
                setData({ ...data, priority: value as TaskFormData["priority"] })
              }
              disabled={isLoading}
            >
              <SelectTrigger id="priority">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                {TASK_PRIORITIES.map((priority) => (
                  <SelectItem key={priority.value} value={priority.value}>
                    {priority.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="status" className="text-sm font-medium mb-1 block">
              Status
            </label>
            <Select
              value={data.status}
              onValueChange={(value) =>
                setData({ ...data, status: value as TaskFormData["status"] })
              }
              disabled={isLoading}
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {TASK_STATUSES.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            className="w-full"
            onClick={handleSave}
            disabled={isLoading || !data.title.trim()}
          >
            {isLoading
              ? isEdit
                ? "Saving..."
                : "Creating..."
              : isEdit
                ? "Save Changes"
                : "Create Task"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
