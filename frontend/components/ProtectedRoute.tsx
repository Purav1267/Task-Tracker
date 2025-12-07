"use client";

import { useEffect, useState } from "react";
import { getToken } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = getToken();

    if (!token) {
      router.push("/auth/login");
    } else {
      setAuthorized(true);
    }
  }, [router]);

  if (!authorized) return null;

  return <>{children}</>;
}
