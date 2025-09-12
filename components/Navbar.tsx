'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { FiBell, FiUser, FiUpload, FiMenu, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '@/context/UserContext';
import { supabase } from '@/lib/supabaseClient';
import DarkModeToggle from './DarkModeToggle';

export default function Navbar() {
  const pathname = usePathname();
  const { user, refreshUser } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  const getInitials = (name: string) =>
    name.split(' ').map(n => n[0]).join('').toUpperCase();

  const linkClass = (href: string) =>
    pathname === href
      ? "border-b-2 border-yellow-400 text-yellow-400 pb-1 transition-colors duration-200 text-lg font-semibold"
      : "text-gray-900 dark:text-white hover:text-yellow-300 transition-colors duration-200 text-lg font-semibold";

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  // Handle avatar upload
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}.${fileExt}`;
    const filePath = fileName;

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, { upsert: true });
    if (uploadError) return;

    // Get public URL
    const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
    const avatarUrl = data.publicUrl;

    // Update user metadata
    await supabase.auth.updateUser({ data: { avatar_url: avatarUrl } });
    await refreshUser(); // Live update → Navbar will re-render
  };

  return (
    <nav className="
      sticky top-0 z-50 
      bg-gradient-to-r from-blue-600/80 to-purple-600/80 
      dark:from-gray-900/60 dark:to-gray-900/60
      backdrop-blur-md border-b border-white/20 dark:border-gray-700/50 
      shadow-lg
    ">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src="/qmqbank_logo.svg" alt="Logo" width={48} height={48} priority />
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center space-x-8">
          <li><Link href="/" className={linkClass("/")}>Home</Link></li>
          <li><Link href="/about" className={linkClass("/about")}>About</Link></li>
          <li><Link href="/contact" className={linkClass("/contact")}>Contact</Link></li>
          <li><Link href="/dashboard" className={linkClass("/dashboard")}>Dashboard</Link></li>
        </ul>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {/* Notification */}
          <button className="relative text-gray-900 dark:text-white hover:text-yellow-300">
            <FiBell size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Dark Mode */}
          <DarkModeToggle />

          {/* Profile Dropdown */}
          <div className="relative hidden md:block" ref={dropdownRef}>
            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-2">
              {user?.user_metadata?.avatar_url ? (
                <img
                  src={`${user.user_metadata.avatar_url}?t=${Date.now()}`} // cache-busting
                  alt="avatar"
                  className="w-8 h-8 rounded-full border-2 border-yellow-400 object-cover"
                />
              ) : user ? (
                <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold">
                  {getInitials(user.user_metadata?.full_name || user.email)}
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-400 dark:bg-gray-700 flex items-center justify-center text-white">
                  <FiUser size={16} />
                </div>
              )}
              {user && <span className="text-white font-semibold">{user.user_metadata?.full_name || user.email}</span>}
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-44 
                             bg-white/90 dark:bg-gray-800/90 
                             backdrop-blur-lg shadow-xl rounded-lg z-50"
                >
                  <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white">Profile</Link>
                  <Link href="/settings" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white">Settings</Link>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 text-gray-900 dark:text-white"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <FiUpload /> Upload Avatar
                  </button>
                  <input type="file" accept="image/*" ref={fileInputRef} onChange={handleAvatarUpload} className="hidden" />
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500" onClick={handleLogout}>Logout</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-900 dark:text-white hover:text-yellow-300" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gradient-to-r from-blue-600/90 to-purple-600/90 dark:from-gray-900/80 dark:to-gray-900/80 backdrop-blur-lg border-t border-white/20 overflow-hidden"
          >
            <ul className="flex flex-col space-y-2 p-4">
              <li><Link href="/" className="text-gray-900 dark:text-white" onClick={() => setMobileOpen(false)}>Home</Link></li>
              <li><Link href="/about" className="text-gray-900 dark:text-white" onClick={() => setMobileOpen(false)}>About</Link></li>
              <li><Link href="/contact" className="text-gray-900 dark:text-white" onClick={() => setMobileOpen(false)}>Contact</Link></li>
              <li><Link href="/dashboard" className="text-gray-900 dark:text-white" onClick={() => setMobileOpen(false)}>Dashboard</Link></li>
              <li className="border-t pt-2">
                {user ? (
                  <button className="w-full text-left text-red-500" onClick={handleLogout}>Logout</button>
                ) : (
                  <Link href="/login" className="text-gray-900 dark:text-white" onClick={() => setMobileOpen(false)}>Login</Link>
                )}
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
