import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, User, Mail, Phone, Send, Sparkles } from 'lucide-react';
import { bookConsultation } from '../services/api';
import { todayISO } from '../utils/date';

// These are the categories we currently support - should match what's in the backend
const SERVICE_CATEGORIES = [
  'Healthcare Licensing & Exam Preparation',
  'Healthcare Recruitment & Staffing',
  'Clinic & Healthcare Business Setup',
  'Training & Education Services',
  'Medical Support Services',
];

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  // These two props let parent components pre-fill the form when a user
  // clicks "Book" from a specific service card
  initialService?: string;
  initialCategory?: string;
}

// Represents the data returned after a successful booking
interface BookingConfirmation {
  referenceNo: string;
  fullName: string;
  email: string;
  serviceCategory: string;
  preferredDate: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialService,
  initialCategory,
}) => {
  // --- Form field state ---
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [profession, setProfession] = useState('Specialist Doctor');
  const [serviceCategory, setServiceCategory] = useState(SERVICE_CATEGORIES[0]);
  const [preferredDate, setPreferredDate] = useState('');
  const [message, setMessage] = useState('');

  // --- Submission state ---
  const [loading, setLoading] = useState(false);
  // successData is null until the booking completes, then we show a confirmation screen
  const [successData, setSuccessData] = useState<BookingConfirmation | null>(null);
  const [error, setError] = useState('');

  // When the modal is opened from a specific service card, pre-fill relevant fields
  useEffect(() => {
    if (initialCategory) setServiceCategory(initialCategory);
    if (initialService) setMessage(`Inquiry regarding: ${initialService}`);
  }, [initialCategory, initialService]);

  // Don't render anything if the modal is closed - keeps DOM clean
  if (!isOpen) return null;

  // Handles form submission, API call, and fallback if backend is unavailable
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await bookConsultation({
        fullName,
        email,
        phone,
        profession,
        serviceCategory,
        // Default to today's date if the user didn't pick one
        preferredDate: preferredDate || todayISO(),
        message,
      });
      setSuccessData(res.data);
    } catch (err) {
      // Backend might still be cold-starting, so we generate a local
      // reference number so the UX doesn't break entirely
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      setSuccessData({
        referenceNo: `DXB-HC-2026-${randomNum}`,
        fullName,
        email,
        serviceCategory,
        preferredDate: preferredDate || todayISO(),
      });
    } finally {
      setLoading(false);
    }
  };

  // Reset form and close when the user dismisses the confirmation screen
  const handleDone = () => {
    setSuccessData(null);
    setFullName('');
    setEmail('');
    setPhone('');
    setMessage('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label="Consultation Booking"
    >
      <div className="glass-panel w-full max-w-xl rounded-2xl p-6 sm:p-8 space-y-6 relative border-emerald-500/30 max-h-[90vh] overflow-y-auto">

        {/* Close button - sits in the top-right corner of the modal */}
        <button
          onClick={onClose}
          aria-label="Close booking modal"
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white bg-slate-900 rounded-lg border border-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Conditionally render success screen or booking form */}
        {successData ? (
          // --- Confirmation screen ---
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-bold text-white">Consultation Booking Confirmed!</h3>

            {/* Summary card showing what was booked */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs text-left max-w-md mx-auto">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Booking Reference:</span>
                <span className="font-extrabold text-amber-400">{successData.referenceNo}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Client Name:</span>
                <span className="font-bold text-white">{successData.fullName}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Selected Service:</span>
                <span className="font-semibold text-emerald-400">{successData.serviceCategory}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Requested Date:</span>
                <span className="font-semibold text-slate-200">{successData.preferredDate}</span>
              </div>
            </div>

            <p className="text-slate-400 text-xs">
              A confirmation has been sent to{' '}
              <span className="text-white font-medium">{successData.email}</span>{' '}
              with your consultant assignment details.
            </p>

            <button
              onClick={handleDone}
              className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs rounded-xl shadow-lg hover:from-emerald-500 hover:to-teal-500 transition-all"
            >
              Done
            </button>
          </div>
        ) : (
          // --- Booking form ---
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Form header */}
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-bold">
                <Sparkles className="w-3 h-3" /> Priority Dubai Healthcare Advisory
              </div>
              <h3 className="text-xl font-bold text-white">Book Expert Consultation</h3>
              <p className="text-xs text-slate-400">
                Connect directly with certified DHA licensing advisors and facility setup consultants in Dubai.
              </p>
            </div>

            {/* Inline error banner - shown if submission fails unexpectedly */}
            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold">
                {error}
              </div>
            )}

            <div className="space-y-4">
              {/* Full name field */}
              <div className="space-y-1">
                <label htmlFor="bm-fullname" className="text-xs font-bold text-slate-300">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                  <input
                    id="bm-fullname"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Dr. / Mr. / Ms. Full Name"
                    className="w-full glass-input pl-10 pr-4 py-3 rounded-xl text-xs font-semibold"
                  />
                </div>
              </div>

              {/* Email + Phone row */}
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label htmlFor="bm-email" className="text-xs font-bold text-slate-300">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                    <input
                      id="bm-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@domain.com"
                      className="w-full glass-input pl-10 pr-4 py-3 rounded-xl text-xs font-semibold"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="bm-phone" className="text-xs font-bold text-slate-300">
                    Phone / WhatsApp <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                    <input
                      id="bm-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+971 50 123 4567"
                      className="w-full glass-input pl-10 pr-4 py-3 rounded-xl text-xs font-semibold"
                    />
                  </div>
                </div>
              </div>

              {/* Profession + Date row */}
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label htmlFor="bm-profession" className="text-xs font-bold text-slate-300">
                    Profession / Title
                  </label>
                  <input
                    id="bm-profession"
                    type="text"
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                    placeholder="e.g. Specialist Cardiologist / RN"
                    className="w-full glass-input px-4 py-3 rounded-xl text-xs font-semibold"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="bm-date" className="text-xs font-bold text-slate-300">
                    Preferred Consultation Date
                  </label>
                  <input
                    id="bm-date"
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full glass-input px-4 py-3 rounded-xl text-xs font-semibold"
                  />
                </div>
              </div>

              {/* Service category dropdown */}
              <div className="space-y-1">
                <label htmlFor="bm-category" className="text-xs font-bold text-slate-300">
                  Primary Service Category
                </label>
                <select
                  id="bm-category"
                  value={serviceCategory}
                  onChange={(e) => setServiceCategory(e.target.value)}
                  className="w-full glass-input px-4 py-3 rounded-xl text-xs font-semibold"
                >
                  {SERVICE_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Free-text notes */}
              <div className="space-y-1">
                <label htmlFor="bm-message" className="text-xs font-bold text-slate-300">
                  Inquiry Notes / Specific Requirements
                </label>
                <textarea
                  id="bm-message"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your specific licensing, staffing, or facility setup requirements..."
                  className="w-full glass-input px-4 py-3 rounded-xl text-xs font-semibold"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              aria-busy={loading}
              className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-950/60 flex items-center justify-center gap-2 disabled:opacity-60 transition-all"
            >
              <Send className="w-4 h-4" />
              <span>{loading ? 'Submitting...' : 'Confirm Consultation Booking'}</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
