"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api";
import { saveToken } from "@/lib/auth";
import { LoginCredentials } from "@/types";
import Link from "next/link";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginCredentials>({
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
    const initGoogleSignIn = () => {
      if (typeof window !== "undefined" && (window as any).google) {
        const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
        
        if (googleClientId) {
          try {
            (window as any).google.accounts.id.initialize({
              client_id: googleClientId,
              callback: handleGoogleSignIn,
            });

            const buttonElement = document.getElementById("google-signin-button");
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

    if (typeof window !== "undefined") {
      if ((window as any).google) {
        initGoogleSignIn();
      } else {
        const checkGoogle = setInterval(() => {
          if ((window as any).google) {
            initGoogleSignIn();
            clearInterval(checkGoogle);
          }
        }, 100);

        setTimeout(() => clearInterval(checkGoogle), 5000);
      }
    }
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await api.post("/auth/login", formData);
      saveToken(res.data.token);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="relative">
          <Link href="/">
            <Button
              variant="ghost"
              size="icon"
              className="absolute -left-0 top-1.5 h-5 w-5 rounded-md"
              aria-label="Back to home"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              {error && (
                <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-3 text-sm text-red-800 dark:text-red-400">
                  {error}
                </div>
              )}
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  disabled={isLoading}
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                  disabled={isLoading}
                />
              </Field>
              <Field>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
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
                <div id="google-signin-button" className="w-full flex justify-center">
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
                      {isGoogleLoading ? "Signing in..." : "Login with Google"}
                    </Button>
                  )}
                </div>
                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/auth/register"
                    className="underline-offset-4 hover:underline"
                  >
                    Sign up
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
