"use client";

import { useState, FormEvent, useEffect } from "react";
import { api } from "@/lib/api";
import { saveToken } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RegisterCredentials } from "@/types";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState<RegisterCredentials>({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleGoogleSignIn = async (response: any) => {
    setIsGoogleLoading(true);
    setError("");

    try {
      // Send the credential to your backend
      const res = await api.post("/auth/google", {
        credential: response.credential,
      });
      saveToken(res.data.token);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Google sign-in failed. Please try again.");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  useEffect(() => {
    // Initialize Google Sign-In when component mounts
    const initGoogleSignIn = () => {
      if (typeof window !== "undefined" && (window as any).google) {
        const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
        
        if (googleClientId) {
          try {
            (window as any).google.accounts.id.initialize({
              client_id: googleClientId,
              callback: handleGoogleSignIn,
            });

            const buttonElement = document.getElementById("google-signin-button-register");
            if (buttonElement) {
              (window as any).google.accounts.id.renderButton(buttonElement, {
                theme: "outline",
                size: "large",
                width: "100%",
              });
            }
          } catch (err) {
            console.error("Error initializing Google Sign-In:", err);
          }
        }
      }
    };

    // Wait for Google script to load
    if (typeof window !== "undefined") {
      if ((window as any).google) {
        initGoogleSignIn();
      } else {
        // Wait for script to load
        const checkGoogle = setInterval(() => {
          if ((window as any).google) {
            initGoogleSignIn();
            clearInterval(checkGoogle);
          }
        }, 100);

        // Cleanup after 5 seconds
        setTimeout(() => clearInterval(checkGoogle), 5000);
      }
    }
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      setError("All fields are required");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);

    try {
      const res = await api.post("/auth/register", form);
      saveToken(res.data.token);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="relative">
          <Link href="/">
            <Button
              variant="ghost"
              size="icon"
              className="absolute -left-2 top-0 h-8 w-8 rounded-md"
              aria-label="Back to home"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your information to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-3 text-sm text-red-800 dark:text-red-400">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="name" className="text-sm font-medium mb-1 block">
                Name <span className="text-red-500">*</span>
              </label>
              <Input
                id="name"
                placeholder="John Doe"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                disabled={isLoading}
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="text-sm font-medium mb-1 block">
                Email <span className="text-red-500">*</span>
              </label>
              <Input
                id="email"
                placeholder="john@example.com"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                disabled={isLoading}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="text-sm font-medium mb-1 block">
                Password <span className="text-red-500">*</span>
              </label>
              <Input
                id="password"
                placeholder="At least 6 characters"
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                disabled={isLoading}
                required
                minLength={6}
              />
            </div>

            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Register"}
            </Button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <div id="google-signin-button-register" className="w-full flex justify-center">
              {!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID && (
                <Button
                  variant="outline"
                  type="button"
                  className="w-full"
                  disabled={isGoogleLoading}
                  onClick={() => {
                    setError("Google Sign-In is not configured. Please set NEXT_PUBLIC_GOOGLE_CLIENT_ID in your environment variables.");
                  }}
                >
                  {isGoogleLoading ? "Signing up..." : "Sign up with Google"}
                </Button>
              )}
            </div>

            <p className="text-sm text-center text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="underline-offset-4 hover:underline"
              >
                Login
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
