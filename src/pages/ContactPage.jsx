import React, { useState } from 'react';
import useStore from '../store/useStore';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const { activeGender } = useStore();
  const isMen = activeGender === 'men';

  const m = {
    bg: '#1E1E20',
    card: '#282828',
    border: '#3A3A3C',
    gold: '#C9A96E',
    goldLight: '#D4BA82',
    textPrimary: '#F5F5F0',
    textSecondary: '#9A9A9A',
    textMuted: '#6B6B6B',
  };

  const theme = {
    textPrimary: isMen ? m.textPrimary : 'var(--color-text-primary)',
    textMuted: isMen ? m.textSecondary : 'var(--color-text-muted)',
    accent: isMen ? m.gold : 'var(--color-accent)',
    accentHover: isMen ? m.goldLight : 'var(--color-accent-light)',
    cardBg: isMen ? m.card : 'var(--color-surface-light)',
    cardBorder: isMen ? m.border : 'var(--color-border)',
    inputBg: isMen ? m.bg : '#ffffff',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 
        className="text-3xl font-black mb-6 font-serif uppercase tracking-widest"
        style={{ color: theme.textPrimary }}
      >
        Contact Us
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <p 
            className="mb-6 leading-relaxed"
            style={{ color: theme.textMuted }}
          >
            Have questions about our jewelry collections, product recommendations, or affiliate partnerships? 
            We're here to help! Fill out the form, or reach out to us directly via email.
          </p>
          
          <div 
            className="border-2 p-6 rounded-sm space-y-4"
            style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}
          >
            <h3 className="font-bold font-serif uppercase tracking-wider text-sm" style={{ color: theme.textPrimary }}>
              Direct Contact
            </h3>
            <div>
              <p className="text-xs uppercase tracking-wider" style={{ color: theme.textMuted }}>General Inquiries & Privacy:</p>
              <a 
                href="mailto:privacy@faithvish.com" 
                className="font-medium hover:underline transition-colors text-sm"
                style={{ color: theme.accent }}
              >
                privacy@faithvish.com
              </a>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider" style={{ color: theme.textMuted }}>Partnerships & Affiliates:</p>
              <a 
                href="mailto:partners@faithvish.com" 
                className="font-medium hover:underline transition-colors text-sm"
                style={{ color: theme.accent }}
              >
                partners@faithvish.com
              </a>
            </div>
          </div>
        </div>

        <div>
          {submitted ? (
            <div 
              className="border-2 p-6 rounded-sm"
              style={{ 
                backgroundColor: isMen ? '#2D372E' : '#f0fdf4', 
                borderColor: isMen ? '#3F5942' : '#bbf7d0' 
              }}
            >
              <h3 
                className="font-bold mb-2 font-serif uppercase tracking-wider"
                style={{ color: isMen ? '#86EFAC' : '#166534' }}
              >
                Message Sent!
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: isMen ? '#A7F3D0' : '#15803d' }}>
                Thank you for reaching out. We will get back to you as soon as possible.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="mt-4 text-sm underline font-bold uppercase tracking-wider"
                style={{ color: isMen ? '#86EFAC' : '#15803d' }}
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label 
                  htmlFor="name" 
                  className="block text-xs font-bold uppercase tracking-wider mb-1"
                  style={{ color: theme.textPrimary }}
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 border-2 rounded-sm focus:outline-none transition-colors"
                  style={{ 
                    backgroundColor: theme.inputBg, 
                    borderColor: theme.cardBorder,
                    color: theme.textPrimary
                  }}
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label 
                  htmlFor="email" 
                  className="block text-xs font-bold uppercase tracking-wider mb-1"
                  style={{ color: theme.textPrimary }}
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-2 border-2 rounded-sm focus:outline-none transition-colors"
                  style={{ 
                    backgroundColor: theme.inputBg, 
                    borderColor: theme.cardBorder,
                    color: theme.textPrimary
                  }}
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label 
                  htmlFor="message" 
                  className="block text-xs font-bold uppercase tracking-wider mb-1"
                  style={{ color: theme.textPrimary }}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-2 border-2 rounded-sm focus:outline-none transition-colors"
                  style={{ 
                    backgroundColor: theme.inputBg, 
                    borderColor: theme.cardBorder,
                    color: theme.textPrimary
                  }}
                  placeholder="How can we help you?"
                />
              </div>
              <button
                type="submit"
                className="w-full font-bold py-3 px-4 rounded-sm hover:-translate-y-0.5 hover:shadow-lg transition-all uppercase tracking-widest text-xs"
                style={{ 
                  backgroundColor: theme.accent, 
                  color: isMen ? m.bg : '#ffffff'
                }}
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
