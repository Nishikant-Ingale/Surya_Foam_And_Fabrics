import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, CheckCircle, XCircle, Users, Sun, Gem } from 'lucide-react';

const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus({ type: 'success', message: 'Message sent successfully!' });
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
    }
  };

  const handleGenerateDraft = async () => {
    setIsGenerating(true);
    try {
      const userQuery = `Refine the following message for a professional contact form for a home furnishings company named 'Surya Foam & Fabrics'. The message should be polite and clear, with a professional tone. The message is: "${formData.message}"`;
      const systemPrompt = "You are a professional copywriter for a home furnishings company. Your task is to take a user's message and rephrase it into a polished, professional, and well-structured email draft for a business contact form.";
      const apiKey = "";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

      const payload = {
        contents: [{ parts: [{ text: userQuery }] }],
        systemInstruction: {
          parts: [{ text: systemPrompt }]
        },
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      const text = result?.candidates?.[0]?.content?.parts?.[0]?.text || "Could not generate a draft. Please try again.";
      setFormData({ ...formData, message: text });
      setIsGenerating(false);

    } catch (error) {
      console.error("Error generating draft:", error);
      setIsGenerating(false);
      setStatus({ type: 'error', message: 'Error generating draft. Please try again.' });
    }
  };

  return (
    <div className="bg-white text-gray-800 font-sans min-h-screen">
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }

          .animate-fade-in {
            animation: fadeIn 0.8s ease-out forwards;
          }
          .animate-slide-up {
            animation: slideUp 0.6s ease-out forwards;
          }
          .animate-pulse {
            animation: pulse 2s ease-in-out infinite;
          }

          .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease-out, transform 0.8s ease-out;
          }
          .animate-on-scroll.is-visible {
            opacity: 1;
            transform: translateY(0);
          }
          .hero-background {
            background: radial-gradient(at center, #e0e7ff 0%, #f3f4f6 100%);
          }
        `}
      </style>
      
      {/* Hero Section */}
      <section className="relative h-80 flex items-center justify-center text-center text-gray-900 overflow-hidden hero-background">
        <div className="relative z-10 p-6">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 animate-slide-up">
            Surya Foam & Fabrics
          </h1>
          <p className="text-xl md:text-2xl font-light italic opacity-0 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            Crafting Comfort & Elegance for Your Home Since 1995
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-white py-20 px-4 md:px-12">
        <div className="container mx-auto max-w-6xl animate-on-scroll">
          <h2 className="text-4xl font-bold text-center mb-16 text-indigo-600">Our Story</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-gray-600">
                Surya Foam and Fabrics has proudly shaped homes and hearts since 1995, building a reputation as a benchmark in curated, sustainable home furnishings throughout India. For more than three decades, this company has specialized in crafting luxurious curtains, sofas, mattresses, carpets, and a broad range of home decor pieces—each design merging modern innovation with the graceful traditions of Indian artistry.
              </p>
              <p className="text-lg leading-relaxed text-gray-600">
                Staying ahead of trends, Surya Foam and Fabrics partners with renowned brands to offer an extensive selection tailored to every unique taste and requirement. The team's commitment does not stop at workmanship; it extends into every stage of the journey, from careful sourcing to efficient delivery, guaranteeing premium quality, sophistication, and long-lasting comfort.
              </p>
            </div>
            <div className="relative p-6 bg-gray-100 rounded-3xl shadow-xl border border-gray-200">
              <img
                src="https://placehold.co/600x400/f3f4f6/334155?text=Quality+Craftsmanship"
                alt="Quality Craftsmanship"
                className="rounded-2xl shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-500 ease-in-out"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-gray-50 py-20 px-4 md:px-12">
        <div className="container mx-auto max-w-6xl animate-on-scroll">
          <h2 className="text-4xl font-bold text-center mb-16 text-indigo-600">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="bg-white p-8 rounded-3xl shadow-xl transform hover:scale-105 transition-transform duration-300 border border-gray-200">
              <Sun size={48} className="text-indigo-500 mx-auto mb-4 animate-pulse" />
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Sustainability</h3>
              <p className="text-gray-600">
                We are committed to eco-friendly sourcing and production methods to create beautiful, sustainable furnishings for a better future.
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-xl transform hover:scale-105 transition-transform duration-300 border border-gray-200">
              <Gem size={48} className="text-indigo-500 mx-auto mb-4 animate-pulse" />
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Quality</h3>
              <p className="text-gray-600">
                Each product is a testament to our dedication to premium materials, meticulous craftsmanship, and long-lasting durability.
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-xl transform hover:scale-105 transition-transform duration-300 border border-gray-200">
              <Users size={48} className="text-indigo-500 mx-auto mb-4 animate-pulse" />
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Customer Focus</h3>
              <p className="text-gray-600">
                Your happiness is our priority. We strive to provide transparent, attentive service from design to delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Founders Section */}
      <section className="bg-gray-100 py-20 px-4 md:px-12">
        <div className="container mx-auto max-w-6xl animate-on-scroll">
          <h2 className="text-4xl font-bold text-center mb-16 text-indigo-600">Meet the Founders</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-center items-center">
            <div className="space-y-4">
              <img
                src="https://placehold.co/200x200/94a3b8/e2e8f0?text=Founder+1"
                alt="Founder 1"
                className="rounded-full w-48 h-48 mx-auto shadow-xl"
              />
              <h3 className="text-2xl font-semibold text-gray-800">Nitesh Suman</h3>
              <p className="text-lg italic text-gray-500">Founder & CEO</p>
              <p className="text-gray-600 max-w-lg mx-auto">
                Nitesh brings over 30 years of experience in the home furnishings industry, with a passion for sustainable materials and timeless design. His vision is to create spaces that feel like home.
              </p>
            </div>
            <div className="space-y-4">
              <img
                src="https://placehold.co/200x200/94a3b8/e2e8f0?text=Founder+2"
                alt="Founder 2"
                className="rounded-full w-48 h-48 mx-auto shadow-xl"
              />
              <h3 className="text-2xl font-semibold text-gray-800">Shraddha Suman</h3>
              <p className="text-lg italic text-gray-500">Co-Founder & Design Head</p>
              <p className="text-gray-600 max-w-lg mx-auto">
                Shraddha's expertise in design and aesthetics has been key to Surya Foam & Fabrics' success. She believes that every piece of furniture should tell a story and reflect a unique personality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-white py-20 px-4 md:px-12">
        <div className="container mx-auto max-w-6xl animate-on-scroll">
          <h2 className="text-4xl font-bold text-center mb-16 text-indigo-600">Get in Touch</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-gray-50 p-8 rounded-3xl shadow-xl border border-gray-200">
            {/* Form */}
            <div className="p-4 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="sr-only">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-800 placeholder-gray-500 transition-all duration-300 focus:ring-2 focus:ring-indigo-600 focus:shadow-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-800 placeholder-gray-500 transition-all duration-300 focus:ring-2 focus:ring-indigo-600 focus:shadow-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="sr-only">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-800 placeholder-gray-500 transition-all duration-300 focus:ring-2 focus:ring-indigo-600 focus:shadow-sm focus:outline-none"
                  />
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl shadow-md transition-all duration-300 transform hover:scale-105"
                  >
                    Send Message
                  </button>
                  <button
                    type="button"
                    onClick={handleGenerateDraft}
                    disabled={isGenerating}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 rounded-xl shadow-md transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isGenerating ? 'Generating...' : '✨ Suggest a Draft'}
                  </button>
                </div>
                {status && (
                  <div className={`mt-4 flex items-center gap-2 text-sm font-medium ${status.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                    {status.type === 'success' ? <CheckCircle size={18} /> : <XCircle size={18} />}
                    <span>{status.message}</span>
                  </div>
                )}
              </form>
            </div>
            
            {/* Map & Info */}
            <div className="p-4 md:p-8 space-y-8">
              <div className="w-full h-80 rounded-2xl overflow-hidden shadow-inner border-4 border-gray-200 animate-slide-up" style={{ animationDelay: '0.6s' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d522246.9748337605!2d74.98780693295606!3d20.324012732820606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd9550b092251b7%3A0x247897c26aeec460!2sSurya%20Foam%20And%20Fabrics!5e0!3m2!1sen!2sin!4v1749711763300!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 'none' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Surya Foam & Fabrics Location"
                />
              </div>
              <div className="space-y-4 text-gray-500">
                <div className="flex items-center gap-4">
                  <MapPin size={24} className="text-indigo-500" />
                  <p>Surya Foam And Fabrics, A-3, Bhausaheb Vartak Udyog Nagar, Nashik - 422003, Maharashtra, India</p>
                </div>
                <div className="flex items-center gap-4">
                  <Mail size={24} className="text-indigo-500" />
                  <p>suryatextiles@email.com</p>
                </div>
                <div className="flex items-center gap-4">
                  <Phone size={24} className="text-indigo-500" />
                  <p>+91 98765 43210</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
