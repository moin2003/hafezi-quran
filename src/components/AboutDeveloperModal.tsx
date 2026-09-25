import React, { useState } from 'react';
import {
  X,
  Mail,
  Globe,
  Sparkles,
  Award,
  CheckCircle2,
  Copy,
  ExternalLink,
  Code2,
  Heart
} from 'lucide-react';
import { sfx } from '../utils/sfxService';

// Brand SVGs
const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
  </svg>
);

interface AboutDeveloperModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: 'bn' | 'en';
}

export const AboutDeveloperModal: React.FC<AboutDeveloperModalProps> = ({
  isOpen,
  onClose,
  lang = 'en',
}) => {
  const [copied, setCopied] = useState(false);
  const isEn = lang === 'en';

  if (!isOpen) return null;

  const developerEmail = 'hafizmoinul.dev@gmail.com';

  const handleCopyEmail = () => {
    sfx.playGoldenClick();
    navigator.clipboard.writeText(developerEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socialLinks = [
    {
      name: isEn ? 'GitHub Profile' : 'গিটহাব প্রোফাইল',
      handle: '@moinul-islam',
      url: 'https://github.com',
      icon: GithubIcon,
      color: 'hover:border-gray-400 hover:text-white bg-gray-900/60',
      badge: 'Open Source',
    },
    {
      name: isEn ? 'LinkedIn Network' : 'লিংকডইন প্রোফাইল',
      handle: 'Hafiz Md. Moinul Islam',
      url: 'https://linkedin.com',
      icon: LinkedinIcon,
      color: 'hover:border-blue-400 hover:text-blue-300 bg-blue-950/40',
      badge: 'Professional',
    },
    {
      name: isEn ? 'Facebook Page' : 'ফেসবুক প্রোফাইল / পেইজ',
      handle: 'Hafiz Md. Moinul Islam',
      url: 'https://facebook.com',
      icon: FacebookIcon,
      color: 'hover:border-blue-500 hover:text-blue-400 bg-blue-900/30',
      badge: 'Community',
    },
    {
      name: isEn ? 'Personal Portfolio' : 'ব্যক্তিগত পোর্টফোলিও',
      handle: 'moinul.dev',
      url: 'https://moinul.dev',
      icon: Globe,
      color: 'hover:border-emerald-400 hover:text-emerald-300 bg-emerald-950/40',
      badge: 'Website',
    },
  ];

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 select-none overflow-y-auto ${
        isEn ? 'font-sans' : 'font-bengali'
      }`}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      {/* Main Modal Card */}
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#062413] via-[#041d0e] to-[#021208] rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.85)] border border-amber-400/40 text-white overflow-hidden animate-in zoom-in-95 duration-200 my-auto">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-emerald-500/20 to-transparent pointer-events-none" />

        {/* Top Header Controls */}
        <div className="relative z-10 px-5 sm:px-6 pt-5 pb-3 flex items-center justify-between border-b border-emerald-800/60">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
            <h3 className="font-bold text-base sm:text-lg text-amber-200 tracking-wide">
              {isEn ? 'About the Developer & Initiator' : 'উদ্যোক্তা ও ডেভেলপার পরিচিতি'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-all cursor-pointer border border-white/10"
            title={isEn ? 'Close' : 'বন্ধ করুন'}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="relative z-10 p-5 sm:p-6 space-y-6 max-h-[82vh] overflow-y-auto">
          
          {/* Profile Hero Card */}
          <div className="flex flex-col sm:flex-row items-center gap-5 p-5 rounded-2xl bg-white/5 border border-emerald-500/30 backdrop-blur-md">
            {/* Avatar / Photo Monogram */}
            <div className="relative shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-amber-400 via-emerald-600 to-emerald-900 p-1 shadow-[0_10px_25px_rgba(4,120,87,0.5)] flex items-center justify-center">
                <div className="w-full h-full rounded-xl bg-[#031c0e] flex flex-col items-center justify-center text-center p-2 border border-amber-300/40">
                  <span className="font-arabic text-xl text-amber-300 font-bold leading-none">مَعِين</span>
                  <span className="font-extrabold text-white text-base sm:text-lg tracking-wider mt-0.5">MI</span>
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 p-1.5 rounded-full bg-emerald-600 text-white shadow-md border border-amber-400/60">
                <Award className="w-4 h-4 text-amber-300" />
              </div>
            </div>

            {/* Title & Bio */}
            <div className="text-center sm:text-left flex-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-400/40 text-emerald-300 text-[11px] font-bold mb-1.5">
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>{isEn ? 'Initiator & Lead Developer' : 'উদ্যোক্তা ও প্রধান ডেভেলপার'}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white drop-shadow tracking-wide">
                {isEn ? 'Hafiz Md. Moinul Islam' : 'হাফেজ মোঃ মঈনুল ইসলাম'}
              </h2>
              <p className="text-xs sm:text-sm text-emerald-200/90 font-medium mt-1">
                {isEn
                  ? 'Hafez-e-Quran & Full-Stack Software Engineer / Islamic Tech Innovator'
                  : 'হাফেজে কুরআন ও সফটওয়্যার ইঞ্জিনিয়ার • ইসলামিক ডিজিটাল সলিউশন নির্মাতা'}
              </p>
              <p className="text-xs text-gray-300 mt-2 leading-relaxed">
                {isEn
                  ? 'Passionate about crafting ultra-realistic, authentic, ad-free Islamic applications with cutting-edge web technologies, empowering the Ummah worldwide.'
                  : 'মুসলিম উম্মাহর কুরআন হিফজ, তিলাওয়াত ও অনুশীলনের সুবিধার্থে আধুনিক ও বিজ্ঞাপনমুক্ত নির্ভরযোগ্য ইসলামিক সফটওয়্যার তৈরিতে নিবেদিত।'}
              </p>
            </div>
          </div>

          {/* Social & Professional Connect Links */}
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-amber-300 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Code2 className="w-4 h-4 text-emerald-400" />
              <span>{isEn ? 'Profiles & Online Presence' : 'প্রোফাইল ও সামাজিক যোগাযোগ'}</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {socialLinks.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <a
                    key={idx}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sfx.playGoldenClick()}
                    className={`p-3.5 rounded-2xl border border-emerald-600/30 transition-all duration-200 flex items-center justify-between group hover:scale-[1.02] active:scale-95 shadow-md ${item.color}`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10 group-hover:scale-110 transition-transform">
                        <IconComponent className="w-5 h-5 text-amber-300" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-200 transition-colors truncate">
                          {item.name}
                        </div>
                        <div className="text-[11px] text-gray-400 truncate">{item.handle}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0 ml-2">
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/10 text-emerald-300 font-semibold border border-white/5">
                        {item.badge}
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-white transition-colors" />
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Direct Communication & Contact */}
          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/20 space-y-2.5">
            <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-300" />
              <span>{isEn ? 'Direct Contact & Inquiries' : 'সরাসরি যোগাযোগ ও মতামত'}</span>
            </h4>
            
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2.5 min-w-0">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-white select-all truncate">
                  {developerEmail}
                </span>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                <button
                  onClick={handleCopyEmail}
                  className="flex-1 sm:flex-initial px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow cursor-pointer active:scale-95"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-300" />
                      <span>{isEn ? 'Copied!' : 'কপি হয়েছে!'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{isEn ? 'Copy Email' : 'ইমেইল কপি করুন'}</span>
                    </>
                  )}
                </button>
                <a
                  href={`mailto:${developerEmail}`}
                  className="flex-1 sm:flex-initial px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-emerald-200 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1 border border-white/10 cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>{isEn ? 'Send Email' : 'ইমেইল পাঠান'}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Project Mission & Sadaqah Jariyah Dedication */}
          <div className="text-center p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-emerald-900/40 to-emerald-950/60 border border-amber-400/20">
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-amber-300 mb-1">
              <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" />
              <span>{isEn ? 'Dedicated as Sadaqah Jariyah' : 'সদকায়ে জারিয়া হিসেবে উৎসর্গীকৃত'}</span>
            </div>
            <p className="text-[11px] text-gray-300 leading-relaxed max-w-lg mx-auto">
              {isEn
                ? 'Please remember the developer, his parents, teachers, and the entire Muslim Ummah in your sincere prayers and Dua.'
                : 'আপনার মূল্যবান তিলাওয়াত ও দোয়ায় ডেভেলপার, তার পিতামাতা, শিক্ষকবৃন্দ এবং সমগ্র মুসলিম উম্মাহকে শামিল রাখার বিনীত অনুরোধ রইল।'}
            </p>
          </div>

        </div>

        {/* Footer Close Button */}
        <div className="relative z-10 px-6 py-3.5 bg-[#020e06] border-t border-emerald-900/80 flex items-center justify-between">
          <span className="text-[11px] text-emerald-400/80 font-medium">
            15 Lines Noorani Hafezi Quran Sharif v1.0
          </span>
          <button
            onClick={onClose}
            className="px-5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95 border border-emerald-500/50"
          >
            {isEn ? 'Close' : 'বন্ধ করুন'}
          </button>
        </div>
      </div>
    </div>
  );
};
