import { useState } from "react";
import { Background } from "../components/Background";
import { MapPin, Mail, Phone } from "lucide-react";

export const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <Background>
      <div className="min-h-screen px-6 py-12 mt-28 md:mt-14 flex flex-col items-center justify-center text-white">
        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2 animate-slideUp">Get in Touch</h1>
          <p className="text-gray-300 animate-slideUp">We’d love to hear from you.</p>
        </div>

        {/* Contact Section */}
        <div className="animate-slideUp w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 bg-white/5 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-white/10">
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-3 rounded-md bg-white/10 text-white placeholder-gray-400 outline-none"
              required
            />
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-3 rounded-md bg-white/10 text-white placeholder-gray-400 outline-none"
              required
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              className="w-full h-32 p-3 rounded-md bg-white/10 text-white placeholder-gray-400 resize-none outline-none"
              required
            />
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-gray-700 via-gray-900 to-black rounded-md hover:opacity-90 transition"
            >
              Send Message
            </button>
            {submitted && (
              <p className="text-green-400 text-sm mt-2">Message sent successfully!</p>
            )}
          </form>

          {/* Contact Info */}
          

            <div className="space-y-6 text-sm">
            {/* Address */}
            <div className="flex items-start space-x-3">
                <MapPin className="text-white mt-1 w-5 h-5 flex-shrink-0" />
                <div>
                <h3 className="text-lg font-semibold">Address</h3>
                <p className="text-gray-300">XYZ Hotel, Main Street, Delhi 110001</p>
                </div>
            </div>

            {/* Email */}
            <div className="flex items-start space-x-3">
                <Mail className="text-white mt-1 w-5 h-5 flex-shrink-0" />
                <div>
                <h3 className="text-lg font-semibold">Email</h3>
                <p className="text-gray-300">contact@xyzhotel.com</p>
                </div>
            </div>

            {/* Phone */}
            <div className="flex items-start space-x-3">
                <Phone className="text-white mt-1 w-5 h-5 flex-shrink-0" />
                <div>
                <h3 className="text-lg font-semibold">Phone</h3>
                <p className="text-gray-300">+91 98765 43210</p>
                </div>
            </div>

            {/* Map Placeholder */}
            <div className="h-48 sm:h-56 md:h-64 w-full rounded-lg overflow-hidden border border-white/10">
                <iframe
                    title="XYZ Hotel Location"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1751.5876020781576!2d77.2090215!3d28.6139391!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce2b2f438efbd%3A0x8ddfb222e4f2d516!2sConnaught%20Place%2C%20New%20Delhi!5e0!3m2!1sen!2sin!4v1623844736974!5m2!1sen!2sin"
                ></iframe>
                </div>
            </div>

        </div>
      </div>
    </Background>
  );
};
