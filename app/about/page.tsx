"use client";

import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div>
      {/* Intro Section */}
      <section className="flex items-center justify-center min-h-[70vh] text-center">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">About Us</h2>
          <p className="text-lg text-gray-600">
            This is the About page of <span className="font-semibold">MyApp</span>.  
            Here you can share details about your project, your goals, or your team.
          </p>
        </div>
      </section>

      {/* Main About Section */}
      <section className="bg-gray-900 text-gray-100 min-h-screen py-20">
        <div className="max-w-6xl mx-auto px-6 space-y-16">
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
          >
            About Us
          </motion.h1>

          {/* Intro */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gray-800/60 backdrop-blur-lg rounded-2xl shadow-lg p-8 space-y-6"
          >
            <p className="text-lg leading-relaxed text-center">
              Welcome to <span className="font-semibold text-blue-400">QmqBank</span> 🌐 — where
              innovation meets simplicity.
            </p>
            <p className="text-gray-300 leading-relaxed text-center max-w-3xl mx-auto">
              We build{" "}
              <span className="text-purple-400 font-medium">
                modern, user-friendly, and secure web applications
              </span>{" "}
              using{" "}
              <span className="text-pink-400 font-medium">Next.js ⚡, Tailwind CSS 🎨, Framer Motion 🎬</span>.  
              Our goal is to make technology elegant, intuitive, and powerful.
            </p>
          </motion.div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="p-6 rounded-xl bg-gray-800 border border-gray-700 hover:shadow-lg hover:shadow-blue-500/20 transition"
            >
              <h2 className="text-2xl font-bold text-blue-400 mb-3">🚀 Our Mission</h2>
              <p className="text-gray-300">
                To simplify digital journeys with{" "}
                <span className="font-semibold text-white">elegant design, blazing-fast performance, and intuitive features</span>.  
                Whether you are a developer or a user, we aim to make tech work beautifully for you.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="p-6 rounded-xl bg-gray-800 border border-gray-700 hover:shadow-lg hover:shadow-pink-500/20 transition"
            >
              <h2 className="text-2xl font-bold text-pink-400 mb-3">💡 Our Vision</h2>
              <p className="text-gray-300">
                A future where technology feels{" "}
                <span className="font-semibold text-white">natural, delightful, and empowering</span>.  
                We want to build digital products that inspire and transform.
              </p>
            </motion.div>
          </div>

          {/* Values */}
          <div className="text-center space-y-8">
            <h2 className="text-3xl font-bold text-purple-400">🌟 Our Values</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div whileHover={{ scale: 1.05 }} className="p-6 bg-gray-800 rounded-xl border border-gray-700">
                <h3 className="text-xl font-semibold text-blue-400 mb-2">Innovation</h3>
                <p className="text-gray-300">We push boundaries with modern tools and fresh ideas.</p>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="p-6 bg-gray-800 rounded-xl border border-gray-700">
                <h3 className="text-xl font-semibold text-green-400 mb-2">Trust</h3>
                <p className="text-gray-300">Security and reliability are at the core of everything we build.</p>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="p-6 bg-gray-800 rounded-xl border border-gray-700">
                <h3 className="text-xl font-semibold text-pink-400 mb-2">Collaboration</h3>
                <p className="text-gray-300">We believe the best results come when we work together.</p>
              </motion.div>
            </div>
          </div>

          {/* Team Section */}
          <div className="text-center space-y-8">
            <h2 className="text-3xl font-bold text-blue-400"> Meet Our Team</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
              {[
                { name: "Hedayatullah Noman", role: "Frontend Developer" },
                { name: "Hedayatullah Noman", role: "Backend Engineer" },
                { name: "QMQ support Team", role: "UI/UX Designer" },
              ].map((member, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  className="p-6 bg-gray-800 rounded-xl border border-gray-700 space-y-3"
                >
                  <img
                    src="/qmqbank_logo.svg"
                    alt="QmqBank Logo"
                    className="w-24 h-24 mx-auto rounded-full border-2 border-purple-400 bg-white p-2"
                  />
                  <h3 className="text-lg font-bold text-white">{member.name}</h3>
                  <p className="text-sm text-gray-400">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
