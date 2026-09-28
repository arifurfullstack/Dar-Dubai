import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Calendar, Clock, CheckCircle2 } from 'lucide-react';
import { formatPrice } from '../../utils/helpers';

export const ViewingModal: React.FC = () => {
  const { activeViewingModal, closeViewingModal, submitViewingRequest, user } = useApp();
  const [name, setName] = useState(user.name || '');
  const [phone, setPhone] = useState(user.phone || '+971 ');
  const [email, setEmail] = useState(user.email || '');
  const [date, setDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  });
  const [time, setTime] = useState('11:00 AM');
  const [message, setMessage] = useState('I am interested in viewing this property in person. Please confirm availability.');
  const [submitted, setSubmitted] = useState(false);

  if (!activeViewingModal?.isOpen || !activeViewingModal.property) return null;
  const target = activeViewingModal.property;

  const isRoom = 'monthlyPrice' in target;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitViewingRequest({
      propertyId: target.id,
      propertyTitle: target.title,
      name,
      phone,
      email,
      preferredDate: date,
      preferredTime: time,
      message,
    });
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 relative">
        <button
          onClick={closeViewingModal}
          className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-stone-900 font-serif">Viewing Request Confirmed!</h3>
            <p className="text-xs text-stone-600 max-w-sm mx-auto leading-relaxed">
              The assigned agent for <span className="font-semibold text-stone-800">{target.title}</span> has received your inquiry. They will contact you shortly via WhatsApp or phone call to finalize access.
            </p>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600 inline-block">
              Scheduled Date: <strong>{date}</strong> at <strong>{time}</strong>
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={closeViewingModal}
                className="px-6 py-2.5 bg-emerald-900 text-white rounded-xl text-xs font-semibold hover:bg-emerald-800 transition-colors cursor-pointer"
              >
                Close & Return
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                Schedule Private Viewing
              </div>
              <h3 className="text-lg font-bold text-stone-900 line-clamp-1 mt-0.5">
                {target.title}
              </h3>
              <p className="text-xs text-stone-500">
                {isRoom ? `${formatPrice(target.monthlyPrice, target.currency)}/month` : `${formatPrice(target.price, target.currency)}`}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-10 px-3 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
                  placeholder="e.g. John Smith"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                  WhatsApp / Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full h-10 px-3 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
                  placeholder="+971 50 123 4567"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-10 px-3 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
                placeholder="name@example.com"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-stone-600 mb-1 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-stone-400" />
                  Preferred Date
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full h-10 px-3 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-stone-600 mb-1 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-stone-400" />
                  Preferred Time
                </label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full h-10 px-3 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
                >
                  <option value="10:00 AM">10:00 AM (Morning)</option>
                  <option value="11:30 AM">11:30 AM (Morning)</option>
                  <option value="02:00 PM">02:00 PM (Afternoon)</option>
                  <option value="04:30 PM">04:30 PM (Late Afternoon)</option>
                  <option value="06:00 PM">06:00 PM (Sunset / Evening)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                Notes for Agent
              </label>
              <textarea
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-emerald-900 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold transition-colors shadow-xs cursor-pointer"
              >
                Submit Request Viewing
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
