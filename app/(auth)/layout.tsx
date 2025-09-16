// app/auth/layout.tsx
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header className="bg-gray-100 p-1 flex justify-between items-center">
        
      </header>
      <main className="p-1">{children}</main>
    </div>
  );
}
