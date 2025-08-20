export default function Contact() {
  return (
    <section className="flex items-center justify-center min-h-[70vh] text-center">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
        <p className="text-lg text-gray-600 mb-6">
          Feel free to reach out to us anytime. We’d love to hear from you!
        </p>
        <a
          href="mailto:info@myapp.com"
          className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition"
        >
          Send Email
        </a>
      </div>
    </section>
  );
}
