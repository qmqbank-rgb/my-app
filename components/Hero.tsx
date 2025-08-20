import Link from "next/link";

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[70vh] text-center px-6">
      <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 dark:text-white mb-4">
        Welcome to MyApp 🚀
      </h1>
      <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6">
        Practice Physics, Chemistry, Biology questions in an interactive way.
      </p>
      <Link
        href="/science"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-semibold"
      >
        Start Practice
      </Link>
    </section>
  );
}
