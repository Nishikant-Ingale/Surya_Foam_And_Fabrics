import React, { useState } from "react";
import "../styles/Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus("✅ Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus("❌ Failed to send message.");
    }
  };

  return (
    <div className="contact-page">
      <h1>Contact Us</h1>
      <div className="contact-container">
        {/* Form */}
        <form onSubmit={handleSubmit} className="modern-form">
          <div className="form-title">Send us a message</div>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button type="submit">Send Message</button>
          {status && <p className="status">{status}</p>}
        </form>

        {/* Map */}
        <div className="mini-map">
          <h3>Our Location</h3>
          <div className="map-embed">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d522246.9748337605!2d74.98780693295606!3d20.324012732820606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd9550b092251b7%3A0x247897c26aeec460!2sSurya%20Foam%20And%20Fabrics!5e0!3m2!1sen!2sin!4v1749711763300!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: "none" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Surya Farms Location"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
