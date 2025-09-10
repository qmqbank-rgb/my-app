'use client';
import { useDarkMode } from '@/context/DarkModeContext';
import { FiMoon, FiSun } from 'react-icons/fi';

export default function DarkModeToggle() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  return (
    <button onClick={toggleDarkMode} className="text-white hover:text-yellow-200">
      {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
    </button>
  );
}
