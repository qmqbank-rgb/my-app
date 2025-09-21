"use client";

import { Suspense } from "react";
import AuthCard from "@/components/AuthCard";

export default function RegisterPage() {
  return (
    <Suspense fallback={<p className="p-4 text-center">Loading register…</p>}>
      <AuthCard mode="register" />
    </Suspense>
  );
}
