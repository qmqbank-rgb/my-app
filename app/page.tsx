"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="pt-20 max-w-6xl mx-auto px-6">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold text-blue-600 dark:text-blue-400 mb-4">
          🏠 Welcome to Our Platform
        </h1>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
          Explore insightful tutorials, professional tips, and interactive content to boost your skills and knowledge.
        </p>
      </section>

      {/* Features / Cards Section */}
      <section className="grid gap-8 md:grid-cols-3">
        <Link href="/tutorial/react" className="group bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-blue-600 transition-colors">
            React Tutorials
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Learn how to build modern React apps from scratch with step-by-step tutorials.
          </p>
        </Link>

        <Link href="/tutorial/nextjs" className="group bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-blue-600 transition-colors">
            Next.js Tips
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Optimize your Next.js apps and boost performance with professional tricks.
          </p>
        </Link>

        <Link href="/tutorial/css" className="group bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-blue-600 transition-colors">
            CSS Tricks
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Make stunning UIs with advanced CSS techniques and creative designs.
          </p>
        </Link>
      </section>
    </main>
  );
}
