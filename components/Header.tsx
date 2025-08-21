// components/Header.tsx
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";   // ✅ Navbar ইমপোর্ট করা হলো

export default function Header() {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        <h1 className="text-2xl font-bold">My App</h1>
        <Navbar />  {/* ✅ এখন error দিবে না */}
      </div>
    </header>
  );
}
