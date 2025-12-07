"use client";

import { logout } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";

export default function Navbar() {
  return (
    <nav className="w-full flex justify-between items-center py-4 border-b px-4">
      <h1 className="text-2xl font-bold">Task Tracker</h1>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        <Button variant="destructive" onClick={logout}>
          Logout
        </Button>
      </div>
    </nav>
  );
}