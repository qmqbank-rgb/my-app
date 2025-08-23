"use client";
import { motion } from "framer-motion";

export default function ContactForm() {
  return (
    <motion.form
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gray-800 p-8 rounded-2xl shadow-lg"
    >
      <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
      <div className="grid gap-4">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <textarea
          rows={4}
          placeholder="Your Message"
          className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
        ></textarea>
        <button
          type="submit"
          className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 rounded-lg font-semibold text-white transition"
        >
          Send Message
        </button>
      </div>
    </motion.form>
  );
}
