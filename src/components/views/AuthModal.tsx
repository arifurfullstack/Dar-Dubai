import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Lock, Mail, User, ShieldCheck } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, setUser, showToast } = useApp();
  const [tab, setTab] = useState<'signin' | 'register'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      name: name || (email.split('@')[0] || 'Dubai Explorer'),
      email: email || 'user@example.com',
      phone: '+971 50 123 4567',
      isLoggedIn: true,
    });
    showToast(tab === 'signin' ? 'Welcome back to Dar Dubai!' : 'Account registered successfully!', 'success');
    closeAuthModal();
  };

  const handleDemoSignIn = (role: 'renter' | 'buyer' | 'landlord') => {
    const demoProfiles = {
      renter: { name: 'Sarah Jenkins', email: 'sarah.jenkins@example.com', phone: '+971 52 112 3344' },
      buyer: { name: 'Arifur Rahman', email: 'arifur.fullstack@gmail.com', phone: '+971 50 998 8776' },
      landlord: { name: 'Hamad Al-Maktoum', email: 'hamad.realestate@example.ae', phone: '+971 55 443 2211' },
    };
    const p = demoProfiles[role];
    setUser({
      ...p,
      isLoggedIn: true,
    });
    showToast(`Signed in as ${p.name}`, 'success');
    closeAuthModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200 relative">
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-4">
          <div className="text-xl font-bold text-stone-900 font-serif">
            {tab === 'signin' ? 'Sign In to Dar Dubai' : 'Create an Account'}
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Access saved properties, track viewing requests, and manage your listings.
          </p>
        </div>

        {/* Segmented Tab */}
        <div className="flex p-1 bg-stone-100 rounded-xl mb-4">
          <button
            type="button"
            onClick={() => setTab('signin')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              tab === 'signin' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setTab('register')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              tab === 'register' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'
            }`}
          >
            Create Account
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {tab === 'register' && (
            <div>
              <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Arifur Rahman"
                  className="w-full h-10 pl-9 pr-3 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
                />
                <User className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-semibold text-stone-600 mb-1">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full h-10 pl-9 pr-3 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
              />
              <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-stone-600 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-10 pl-9 pr-3 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
              />
              <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-emerald-900 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold transition-colors mt-2 cursor-pointer shadow-xs"
          >
            {tab === 'signin' ? 'Sign In' : 'Create Free Account'}
          </button>
        </form>

        {/* 1-Click Demo Profiles */}
        <div className="mt-5 pt-4 border-t border-stone-100">
          <div className="text-[11px] font-semibold text-stone-500 mb-2">
            Instant Demo Sign In:
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleDemoSignIn('buyer')}
              className="py-1.5 px-2 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-lg text-[11px] font-medium text-stone-700 transition-colors cursor-pointer"
            >
              Buyer / Investor
            </button>
            <button
              type="button"
              onClick={() => handleDemoSignIn('renter')}
              className="py-1.5 px-2 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-lg text-[11px] font-medium text-stone-700 transition-colors cursor-pointer"
            >
              Room Seeker
            </button>
            <button
              type="button"
              onClick={() => handleDemoSignIn('landlord')}
              className="py-1.5 px-2 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-lg text-[11px] font-medium text-stone-700 transition-colors cursor-pointer"
            >
              Landlord
            </button>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-stone-400 mt-3 justify-center">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-800" />
            <span>Frontend demo authentication for MVP preview</span>
          </div>
        </div>
      </div>
    </div>
  );
};
