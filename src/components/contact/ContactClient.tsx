'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, Mail, Phone, Clock, ChevronDown } from 'lucide-react';

const SUBJECT_OPTIONS = [
  'Custom Web Application & Next.js Development',
  'Enterprise SaaS & Cloud Software Architecture',
  'Autonomous AI Agents & Custom LLM Workflow',
  'Multilingual Marathi & English Voice AI Widget',
  'Intelligent Process Automation & Systems Integration',
  'Bespoke UI/UX Design System & Product Redesign',
  'E-Commerce & High-Conversion Store Platform',
  'Technical Partnership & Strategic Consulting',
  'Other / General Inquiry',
];

export function ContactClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    website_hp: '', // Honeypot field for bot spam detection
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [successResponse, setSuccessResponse] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    setSuccessResponse(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to submit inquiry. Please try again.');
      } else {
        setStatus('success');
        setSuccessResponse(data);
        setFormData({ name: '', email: '', subject: '', message: '', website_hp: '' });
      }
    } catch {
      setStatus('error');
      setErrorMessage('Network failure submitting form. Please check your internet connection.');
    }
  };

  return (
    <div className="desert-page min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#2b1e1a]">
            Initiate Project Inquiry
          </h1>
          <p className="text-[#6e584f] text-sm sm:text-base leading-relaxed">
            Reach out to Tattva Web Solutions. We review every business requirement and respond with actionable technical proposals within 24 hours.
          </p>
        </div>

        {/* Contact Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Info Card (4 Cols) */}
          <div className="lg:col-span-4 desert-card p-8 space-y-6">
            <h2 className="text-2xl font-bold text-[#2b1e1a]">Direct Channels</h2>

            <div className="space-y-4 text-xs text-[#52413a]">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#c26d47] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#2b1e1a] font-semibold">Engineering Email</strong>
                  <a href="mailto:tattvawebsolutions@gmail.com" className="hover:underline text-[#52413a]">
                    tattvawebsolutions@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#c26d47] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#2b1e1a] font-semibold">Consultation Line</strong>
                  <a href="tel:+919226885831" className="hover:underline text-[#52413a]">
                    +91 9226885831
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#c26d47] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#2b1e1a] font-semibold">Working Hours</strong>
                  <span>Mon – Sat: 09:00 AM – 07:00 PM IST</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#faf7f2] border border-[#e2d7cd] text-xs text-[#6e584f] space-y-1">
              <strong className="block font-semibold text-[#2b1e1a]">Live AI Assistant Support</strong>
              <p>You can also use our Marathi/English AI Voice Assistant on the bottom right for instant answers!</p>
            </div>
          </div>

          {/* Form Card (8 Cols) */}
          <div className="lg:col-span-8 desert-card p-8 space-y-6">
            <h2 className="text-2xl font-bold text-[#2b1e1a]">Send Your Project Brief</h2>

            {status === 'success' && successResponse && (
              <div
                role="alert"
                aria-live="polite"
                className="p-6 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 space-y-2 animate-in fade-in duration-300"
              >
                <div className="flex items-center gap-2 font-bold text-emerald-800">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Submission Successful!</span>
                </div>
                <p className="text-xs text-emerald-700 leading-relaxed">
                  {successResponse.message}
                </p>
                <div className="text-[11px] font-mono font-semibold text-emerald-800 pt-1">
                  Reference Code: {successResponse.referenceId}
                </div>
              </div>
            )}

            {status === 'error' && (
              <div
                role="alert"
                aria-live="assertive"
                className="p-4 rounded-xl bg-rose-50 border border-rose-300 text-rose-900 flex items-center gap-3 text-xs animate-in fade-in duration-200"
              >
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs" noValidate>
              {/* Honeypot Spam Protection Field - Hidden from humans, traps bots */}
              <div aria-hidden="true" className="hidden" style={{ display: 'none' }}>
                <label htmlFor="website_hp">Do not fill this field</label>
                <input
                  type="text"
                  id="website_hp"
                  name="website_hp"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website_hp}
                  onChange={(e) => setFormData({ ...formData, website_hp: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="block font-semibold text-[#2b1e1a]">
                    Full Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    aria-required="true"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full desert-input px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#c26d47]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="block font-semibold text-[#2b1e1a]">
                    Email Address *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    aria-required="true"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. rahul@company.com"
                    className="w-full desert-input px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#c26d47]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-subject" className="block font-semibold text-[#2b1e1a]">
                  Subject Line *
                </label>
                <div className="relative">
                  <select
                    id="contact-subject"
                    required
                    aria-required="true"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full desert-input px-4 py-2.5 appearance-none pr-10 focus:outline-none focus:ring-2 focus:ring-[#c26d47] cursor-pointer text-[#2b1e1a] bg-[#faf7f2]"
                  >
                    <option value="" disabled className="text-[#8c766b]">
                      -- Select an Inquiry Topic --
                    </option>
                    {SUBJECT_OPTIONS.map((option) => (
                      <option key={option} value={option} className="text-[#2b1e1a] bg-[#faf7f2]">
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#8c766b] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-message" className="block font-semibold text-[#2b1e1a]">
                  Project Requirements & Details *
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  required
                  aria-required="true"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your business goals, desired timeline, tech requirements..."
                  className="w-full desert-input px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#c26d47]"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3.5 desert-button font-bold text-xs flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#c26d47]"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Transmitting to Backend Endpoint...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Official Inquiry</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
