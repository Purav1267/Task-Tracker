import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Calendar, Target, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-muted p-6">
      <main className="w-full max-w-4xl space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Task Tracker
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Organize your work, track your progress, and get things done. 
            A modern task management solution built for productivity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/auth/register">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/auth/login">Login</Link>
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <Target className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Task Management</CardTitle>
              <CardDescription>
                Create, organize, and prioritize your tasks with ease
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Calendar className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Due Dates</CardTitle>
              <CardDescription>
                Set deadlines and never miss an important task
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Zap className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Priority Levels</CardTitle>
              <CardDescription>
                Focus on what matters most with priority-based organization
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* CTA Section */}
        <Card className="text-center">
          <CardHeader>
            <CheckCircle2 className="h-12 w-12 mx-auto mb-4 text-primary" />
            <CardTitle className="text-2xl">Ready to get started?</CardTitle>
            <CardDescription className="text-base">
              Join thousands of users who are already managing their tasks efficiently
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild size="lg">
              <Link href="/auth/register">Create Your Account</Link>
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
