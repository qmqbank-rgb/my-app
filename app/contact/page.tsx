"use client";

import { motion } from "framer-motion";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <section className="bg-gray-900 text-white py-20">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12">
        {/* Left side - Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-6">Contact Us</h2>
          <p className="text-gray-400 mb-6">
            Got a question or proposal? Reach out and let’s build something great together.
          </p>

          <ul className="space-y-4 text-gray-300 text-lg">
            <li>📧 <span className="ml-2">support@yourdomain.com</span></li>
            <li>📞 <span className="ml-2">+880 1234 567 890</span></li>
            <li>📍 <span className="ml-2">Dhaka, Bangladesh</span></li>
          </ul>

          {/* Example mailto button */}
          <a
            href="mailto:info@myapp.com"
            className="inline-block mt-6 px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition"
          >
            Email Us
          </a>
        </motion.div>

        {/* Right side - Contact Form */}
        <ContactForm />
      </div>
    </section>
  );
}
