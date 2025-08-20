export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-center py-6 mt-12">
      <p className="text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} MyApp. All rights reserved.
      </p>
    </footer>
  );
}
