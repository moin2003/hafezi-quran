import React, { useState } from 'react';
import {
  X,
  Mail,
  Sparkles,
  Award,
  CheckCircle2,
  Copy,
  ExternalLink,
  Heart,
  Share2
} from 'lucide-react';
import { sfx } from '../utils/sfxService';

// Official Social Brand SVGs
const XTwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const ThreadsIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.186 24C5.584 24 0 18.647 0 12.045 0 5.443 5.584 0 12.186 0c6.486 0 11.88 5.176 12.012 11.662v.383c0 4.135-2.68 7.025-6.685 7.025-2.247 0-4.134-1.12-4.835-2.887-.93 1.66-2.585 2.887-5.074 2.887-3.238 0-5.698-2.46-5.698-5.838 0-3.447 2.529-5.91 5.922-5.91 2.404 0 4.075 1.092 4.998 2.659v-2.072h2.556v7.359c0 2.378 1.484 3.91 3.748 3.91 2.695 0 4.368-2.044 4.368-4.998 0-5.321-4.34-9.66-9.66-9.66-5.322 0-9.662 4.339-9.662 9.66 0 5.322 4.34 9.662 9.662 9.662 2.694 0 5.145-1.077 6.945-2.877l1.79 1.79C19.982 22.756 16.297 24 12.186 24zm-.503-14.372c-1.93 0-3.419 1.488-3.419 3.419 0 1.93 1.489 3.419 3.419 3.419 1.93 0 3.419-1.489 3.419-3.419 0-1.931-1.489-3.419-3.419-3.419z" />
  </svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
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
      name: isEn ? 'X (Twitter)' : 'এক্স (টুইটার)',
      handle: '@moinul_islam25',
      url: 'https://x.com/moinul_islam25',
      icon: XTwitterIcon,
      color: 'hover:border-zinc-400 hover:text-white bg-zinc-900/70',
      badge: 'Official X',
      tagline: 'MOINUL ISLAM',
    },
    {
      name: isEn ? 'Facebook Profile' : 'ফেসবুক প্রোফাইল',
      handle: 'moinulislam23',
      url: 'https://www.facebook.com/moinulislam23',
      icon: FacebookIcon,
      color: 'hover:border-blue-500 hover:text-blue-300 bg-blue-950/40',
      badge: 'Social',
      tagline: 'Moinul Islam',
    },
    {
      name: isEn ? 'Instagram' : 'ইনস্টাগ্রাম',
      handle: '@moinul_islam_25',
      url: 'https://www.instagram.com/moinul_islam_25/',
      icon: InstagramIcon,
      color: 'hover:border-pink-500 hover:text-pink-300 bg-gradient-to-br from-purple-950/40 to-pink-950/30',
      badge: 'Instagram',
      tagline: 'moinul_islam_25',
    },
    {
      name: isEn ? 'Threads' : 'থ্রেডস',
      handle: '@moinul_islam_25',
      url: 'https://www.threads.net/@moinul_islam_25',
      icon: ThreadsIcon,
      color: 'hover:border-neutral-400 hover:text-neutral-200 bg-neutral-900/70',
      badge: 'Threads',
      tagline: 'moinul_islam_25',
    },
    {
      name: isEn ? 'YouTube Channel' : 'ইউটিউব চ্যানেল',
      handle: '@marshalgamerz',
      url: 'https://www.youtube.com/@marshalgamerz',
      icon: YoutubeIcon,
      color: 'hover:border-red-500 hover:text-red-300 bg-red-950/40',
      badge: 'YouTube',
      tagline: 'Marshal Gamerz',
    },
    {
      name: isEn ? 'GitHub Profile' : 'গিটহাব প্রোফাইল',
      handle: '@moin2003',
      url: 'https://github.com/moin2003',
      icon: GithubIcon,
      color: 'hover:border-emerald-500 hover:text-white bg-gray-900/70',
      badge: 'Developer',
      tagline: 'moin2003',
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
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      {/* Main Modal Card */}
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#062413] via-[#041d0e] to-[#021208] rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.9)] border border-amber-400/40 text-white overflow-hidden animate-in zoom-in-95 duration-200 my-auto">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 inset-x-0 h-36 bg-gradient-to-b from-emerald-500/25 via-emerald-600/10 to-transparent pointer-events-none" />

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
        <div className="relative z-10 p-5 sm:p-6 space-y-5 max-h-[82vh] overflow-y-auto">
          
          {/* Profile Hero Card */}
          <div className="flex flex-col sm:flex-row items-center gap-5 p-5 rounded-2xl bg-white/5 border border-emerald-500/30 backdrop-blur-md">
            {/* Avatar Monogram */}
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
              <p className="text-xs text-amber-200/90 font-arabic italic mt-1 text-center sm:text-left">
                "الحمد لله على كل شيء — A person chosen by Allah, cannot be defeated by humans.!!"
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
              <Share2 className="w-4 h-4 text-emerald-400" />
              <span>{isEn ? 'Social Media & Connect Profiles' : 'সোশ্যাল মিডিয়া ও অফিসিয়াল লিংকসমূহ'}</span>
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
                    className={`p-3 rounded-2xl border border-emerald-600/30 transition-all duration-200 flex items-center justify-between group hover:scale-[1.02] active:scale-95 shadow-md ${item.color}`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10 group-hover:scale-110 transition-transform">
                        <IconComponent className="w-5 h-5 text-amber-300" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-200 transition-colors truncate">
                          {item.name}
                        </div>
                        <div className="text-[11px] text-gray-300 truncate font-mono">{item.handle}</div>
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
