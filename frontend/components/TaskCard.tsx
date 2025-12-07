"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { api } from "@/lib/api";
import { useState } from "react";
import TaskForm from "./TaskForm";
import { Calendar, AlertCircle } from "lucide-react";
import { Task } from "@/types";
import { PRIORITY_COLORS, STATUS_COLORS } from "@/lib/constants";

interface TaskCardProps {
  task: Task;
  refresh: () => void;
}

export default function TaskCard({ task, refresh }: TaskCardProps) {
  const [open, setOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string>("");

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const deleteTask = async () => {
    setDeleteDialogOpen(false);
    setIsDeleting(true);
    setError("");

    try {
      await api.delete(`/tasks/${task._id}`);
      refresh();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete task");
    } finally {
      setIsDeleting(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    return PRIORITY_COLORS[priority] || PRIORITY_COLORS.medium;
  };

  const getStatusColor = (status: string) => {
    return STATUS_COLORS[status] || STATUS_COLORS["To Do"];
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== "Done";
  const dueDateFormatted = task.dueDate 
    ? new Date(task.dueDate).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      })
    : null;

  return (
    <>
      <Card
        className={`p-4 flex justify-between items-start hover:shadow-md transition-shadow ${
          isOverdue ? "border-l-4 border-l-red-500" : ""
        }`}
      >
        <div className="flex-1">
          {error && (
            <div className="mb-2 rounded-md bg-red-50 dark:bg-red-900/20 p-2 text-xs text-red-800 dark:text-red-400">
              {error}
            </div>
          )}
          <div className="flex items-start gap-3 mb-2">
            <h3 className="text-lg font-semibold flex-1">{task.title}</h3>
            {isOverdue && (
              <AlertCircle
                className="h-5 w-5 text-red-500 flex-shrink-0"
                aria-label="Overdue task"
              />
            )}
          </div>

          {task.description && (
            <p className="text-muted-foreground mb-3">{task.description}</p>
          )}

          <div className="flex flex-wrap gap-2 items-center">
            <Badge className={getStatusColor(task.status)}>
              {task.status}
            </Badge>
            <Badge className={getPriorityColor(task.priority)}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
            </Badge>
            {dueDateFormatted && (
              <div
                className={`flex items-center gap-1 text-sm ${
                  isOverdue
                    ? "text-red-600 dark:text-red-400 font-semibold"
                    : "text-muted-foreground"
                }`}
              >
                <Calendar className="h-4 w-4" aria-hidden="true" />
                <span>{dueDateFormatted}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-row gap-2 ml-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setOpen(true)}
            aria-label="Edit task"
          >
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDeleteClick}
            disabled={isDeleting}
            aria-label="Delete task"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </Card>

      <TaskForm open={open} setOpen={setOpen} refresh={refresh} task={task} />

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Task</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{task.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={deleteTask}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
