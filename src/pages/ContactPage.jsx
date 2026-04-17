import React, { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for actual form submission
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-black text-text-primary mb-6">Contact Us</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <p className="text-text-muted mb-6 leading-relaxed">
            Have questions about our jewelry collections, product recommendations, or affiliate partnerships? 
            We're here to help! Fill out the form, or reach out to us directly via email.
          </p>
          
          <div className="bg-surface-light border-2 border-border p-6 rounded-sm space-y-4">
            <h3 className="font-bold text-text-primary">Direct Contact</h3>
            <div>
              <p className="text-sm text-text-muted">General Inquiries & Privacy:</p>
              <a href="mailto:privacy@faithvish.com" className="text-accent font-medium hover:underline">
                privacy@faithvish.com
              </a>
            </div>
            <div>
              <p className="text-sm text-text-muted">Partnerships & Affiliates:</p>
              <a href="mailto:partners@faithvish.com" className="text-accent font-medium hover:underline">
                partners@faithvish.com
              </a>
            </div>
          </div>
        </div>

        <div>
          {submitted ? (
            <div className="bg-green-50 border-2 border-green-200 p-6 rounded-sm">
              <h3 className="text-green-800 font-bold mb-2">Message Sent!</h3>
              <p className="text-green-700 text-sm">
                Thank you for reaching out. We will get back to you as soon as possible.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="mt-4 text-sm text-green-700 underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 border-2 border-border rounded-sm focus:outline-none focus:border-accent bg-white"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-2 border-2 border-border rounded-sm focus:outline-none focus:border-accent bg-white"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-text-primary mb-1">Message</label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-2 border-2 border-border rounded-sm focus:outline-none focus:border-accent bg-white"
                  placeholder="How can we help you?"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-accent text-white font-bold py-3 px-4 rounded-sm hover:-translate-y-0.5 hover:shadow-lg transition-all"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
