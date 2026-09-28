import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  ExternalLink,
  MessageSquare,
  Code2,
  Copy,
  Check,
  Building,
  Phone,
  Sparkles,
  ShieldCheck,
  Globe,
} from 'lucide-react';

export const DeveloperModal: React.FC = () => {
  const { isDeveloperModalOpen, closeDeveloperModal, showToast } = useApp();
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isDeveloperModalOpen) {
        closeDeveloperModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDeveloperModalOpen, closeDeveloperModal]);

  if (!isDeveloperModalOpen) return null;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedNumber(text);
    showToast(`Copied ${label} (${text}) to clipboard`, 'success');
    setTimeout(() => {
      setCopiedNumber(null);
    }, 2500);
  };

  const developers = [
    {
      name: 'Md Arifur Rahman',
      role: 'Lead Full-Stack Architect & Engineer',
      whatsapp: '+8801756601431',
      waRaw: '8801756601431',
      status: 'Available for Custom Software & Web Projects',
      avatarInitials: 'AR',
      gradient: 'from-emerald-700 to-teal-900',
    },
    {
      name: 'Sydul Islam',
      role: 'Full-Stack Developer & Software Engineer',
      whatsapp: '+8801707991750',
      waRaw: '8801707991750',
      status: 'Available for Web & Full-Stack Development',
      avatarInitials: 'SI',
      gradient: 'from-teal-800 to-stone-900',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-950/75 backdrop-blur-sm transition-opacity"
        onClick={closeDeveloperModal}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Decorative Top Accent Bar */}
        <div className="h-2 bg-gradient-to-r from-emerald-800 via-emerald-600 to-amber-500" />

        {/* Modal Header */}
        <div className="p-6 pb-4 flex items-start justify-between border-b border-stone-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950 text-amber-300 flex items-center justify-center shadow-xs border border-emerald-800/40">
              <Code2 className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-stone-900 font-serif">
                  Development & Credits
                </h3>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-900 rounded-full">
                  Official
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                Dar Dubai Platform Architecture & Engineering Team
              </p>
            </div>
          </div>

          <button
            onClick={closeDeveloperModal}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Agency Highlight: Huipper */}
          <div className="p-4 rounded-xl bg-stone-900 text-white border border-stone-800 relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Lead Technology Agency
                  </span>
                </div>
                <span className="text-[11px] text-stone-400">Web & Cloud Systems</span>
              </div>

              <h4 className="text-xl font-bold font-serif mt-2 tracking-tight">
                Developed by Huipper
              </h4>
              <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                Specialized in building high-performance modern web platforms, real estate engines, and scalable applications.
              </p>

              <div className="mt-4 pt-3 border-t border-stone-800 flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs text-stone-400 font-medium">huipper.com</span>
                <a
                  href="https://huipper.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors cursor-pointer"
                >
                  <span>Visit huipper.com</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Individual Developers List */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
              <span>Engineers & Developers</span>
              <span className="text-stone-300">·</span>
              <span className="text-emerald-700 font-medium normal-case">Direct WhatsApp Contact</span>
            </div>

            {developers.map((dev) => {
              const waUrl = `https://wa.me/${dev.waRaw}?text=${encodeURIComponent(
                `Hi ${dev.name}, I found your contact on Dar Dubai (Developed by Huipper). I would like to discuss a project.`
              )}`;

              return (
                <div
                  key={dev.name}
                  className="p-4 rounded-xl bg-stone-50 border border-stone-200 hover:border-emerald-300 transition-all space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full bg-gradient-to-br ${dev.gradient} text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-xs`}
                      >
                        {dev.avatarInitials}
                      </div>
                      <div>
                        <h5 className="text-sm font-bold text-stone-900">{dev.name}</h5>
                        <p className="text-xs text-stone-500">{dev.role}</p>
                      </div>
                    </div>

                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/60 hidden sm:inline-block">
                      Verified Developer
                    </span>
                  </div>

                  {/* Contact & WhatsApp CTAs */}
                  <div className="pt-2 border-t border-stone-200/70 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-stone-700 flex items-center gap-1">
                        <Phone className="w-3 h-3 text-stone-400" />
                        <span className="font-mono text-[11px]">{dev.whatsapp}</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(dev.whatsapp, dev.name)}
                        className="p-1 text-stone-400 hover:text-stone-700 rounded hover:bg-stone-200/60 transition-colors cursor-pointer"
                        title="Copy WhatsApp Number"
                      >
                        {copiedNumber === dev.whatsapp ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-emerald-900 hover:bg-emerald-800 text-white rounded-lg transition-colors cursor-pointer shadow-xs"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                      <span>WhatsApp Chat</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Notice */}
          <div className="p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-xl flex items-start gap-2.5 text-xs text-emerald-900">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              For commercial custom platform developments, custom real estate portals, or software integrations, contact the developers directly via WhatsApp or visit{' '}
              <a
                href="https://huipper.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-bold hover:text-emerald-700"
              >
                huipper.com
              </a>.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <span className="text-[11px] text-stone-400">
            © {new Date().getFullYear()} Huipper Technologies · All rights reserved
          </span>
          <button
            type="button"
            onClick={closeDeveloperModal}
            className="px-4 py-2 text-xs font-semibold text-stone-700 hover:text-stone-900 hover:bg-stone-200/60 rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
