"use client";

import { Suspense } from "react";
import AuthCard from "@/components/AuthCard";

export default function LoginPage() {
  return (
    <Suspense fallback={<p className="p-4 text-center">Loading login form…</p>}>
      <AuthCard mode="login" />
    </Suspense>
  );
}
