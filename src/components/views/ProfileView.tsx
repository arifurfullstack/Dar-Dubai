import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PropertyCard } from '../property/PropertyCard';
import { User, Mail, Phone, Calendar, Bookmark, Building, PlusCircle, CheckCircle2, ShieldCheck, LogOut } from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { user, setUser, properties, viewingRequests, savedIds, navigateTo, showToast } = useApp();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);

  const myListings = properties.filter((p) => p.listedBy === 'owner');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({ ...user, name, phone, email });
    setEditing(false);
    showToast('Profile information updated', 'success');
  };

  const handleSignOut = () => {
    setUser({
      name: 'Guest User',
      email: '',
      phone: '',
      isLoggedIn: false,
    });
    showToast('Signed out of session', 'info');
    navigateTo('home');
  };

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      <div className="bg-white border-b border-stone-200 py-10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider block">
            Client & Landlord Dashboard
          </span>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-2">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif">
                {user.name}
              </h1>
              <p className="text-xs text-stone-500 mt-0.5">{user.email || 'Registered Dar Dubai Member'}</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => navigateTo('list-property')}
                className="px-4 py-2 bg-emerald-900 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Post New Property</span>
              </button>

              <button
                onClick={handleSignOut}
                className="p-2 border border-stone-200 text-stone-600 hover:text-stone-900 rounded-xl text-xs font-semibold hover:bg-stone-50 cursor-pointer"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">
        {/* Personal Details Card */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-stone-900 font-serif flex items-center gap-2">
              <User className="w-4 h-4 text-emerald-800" />
              <span>Personal Account Information</span>
            </h2>
            <button
              onClick={() => setEditing(!editing)}
              className="text-xs font-semibold text-emerald-950 hover:underline cursor-pointer"
            >
              {editing ? 'Cancel' : 'Edit Details'}
            </button>
          </div>

          {editing ? (
            <form onSubmit={handleSaveProfile} className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block text-stone-600 mb-1 font-semibold">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-10 px-3 bg-stone-50 border border-stone-200 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-stone-600 mb-1 font-semibold">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-10 px-3 bg-stone-50 border border-stone-200 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-stone-600 mb-1 font-semibold">Phone / WhatsApp</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full h-10 px-3 bg-stone-50 border border-stone-200 rounded-lg"
                />
              </div>
              <div className="sm:col-span-3 pt-2">
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-900 text-white rounded-lg text-xs font-semibold hover:bg-emerald-800 cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3 bg-stone-50 rounded-xl">
                <span className="text-stone-400 block text-[10px] uppercase font-semibold">Full Name</span>
                <span className="font-bold text-stone-900 text-sm mt-0.5 block">{user.name}</span>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl">
                <span className="text-stone-400 block text-[10px] uppercase font-semibold">Email Address</span>
                <span className="font-bold text-stone-900 text-sm mt-0.5 block truncate">{user.email || 'arifur.fullstack@gmail.com'}</span>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl">
                <span className="text-stone-400 block text-[10px] uppercase font-semibold">Phone / WhatsApp</span>
                <span className="font-bold text-stone-900 text-sm mt-0.5 block">{user.phone || '+971 52 345 6789'}</span>
              </div>
            </div>
          )}
        </div>

        {/* My Inquiries & Viewing Requests */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-stone-900 font-serif flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-800" />
              <span>My Viewing Inquiries ({viewingRequests.length})</span>
            </h2>
          </div>

          {viewingRequests.length === 0 ? (
            <p className="text-xs text-stone-400 py-4 text-center">
              No active viewing appointments requested yet.
            </p>
          ) : (
            <div className="space-y-3">
              {viewingRequests.map((req) => (
                <div key={req.id} className="p-4 bg-stone-50 rounded-xl border border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <h3 className="font-bold text-stone-900 text-sm">{req.propertyTitle}</h3>
                    <p className="text-stone-500 mt-0.5">
                      Requested Date: <strong className="text-stone-800">{req.preferredDate}</strong> at <strong className="text-stone-800">{req.preferredTime}</strong>
                    </p>
                    <p className="text-stone-400 text-[11px] mt-0.5 italic">"{req.message}"</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 bg-emerald-100 text-emerald-900 font-semibold rounded-full text-[11px] flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Agent Contacted
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* My Listed Properties */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-stone-900 font-serif">
              My Listed Properties ({myListings.length})
            </h2>
            <button
              onClick={() => navigateTo('list-property')}
              className="text-xs font-semibold text-emerald-950 hover:underline cursor-pointer"
            >
              + List another property
            </button>
          </div>

          {myListings.length === 0 ? (
            <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center text-xs text-stone-500">
              You haven't listed any properties yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {myListings.map((prop) => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
