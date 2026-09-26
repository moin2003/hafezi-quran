import React, { useState } from 'react';
import {
  X,
  Mail,
  Sparkles,
  Award,
  Check,
  Copy,
  ExternalLink,
  Heart,
  Share2
} from 'lucide-react';
import { sfx } from '../utils/sfxService';

// Official Brand Icons
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

  const developerEmail = 'moinmoin6308@gmail.com';

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
      theme: 'hover:border-zinc-400 hover:text-white bg-zinc-950/70',
      badge: isEn ? 'Official' : 'অফিসিয়াল',
    },
    {
      name: isEn ? 'Facebook' : 'ফেসবুক',
      handle: 'moinulislam23',
      url: 'https://www.facebook.com/moinulislam23',
      icon: FacebookIcon,
      theme: 'hover:border-blue-400 hover:text-blue-300 bg-blue-950/40',
      badge: isEn ? 'Social' : 'সোশ্যাল',
    },
    {
      name: isEn ? 'Instagram' : 'ইনস্টাগ্রাম',
      handle: '@moinul_islam_25',
      url: 'https://www.instagram.com/moinul_islam_25/',
      icon: InstagramIcon,
      theme: 'hover:border-pink-400 hover:text-pink-300 bg-gradient-to-br from-purple-950/40 to-pink-950/30',
      badge: isEn ? 'Photos' : 'প্রোফাইল',
    },
    {
      name: isEn ? 'Threads' : 'থ্রেডস',
      handle: '@moinul_islam_25',
      url: 'https://www.threads.net/@moinul_islam_25',
      icon: ThreadsIcon,
      theme: 'hover:border-neutral-400 hover:text-white bg-neutral-950/70',
      badge: isEn ? 'Threads' : 'থ্রেডস',
    },
    {
      name: isEn ? 'YouTube' : 'ইউটিউব',
      handle: '@marshalgamerz',
      url: 'https://www.youtube.com/@marshalgamerz',
      icon: YoutubeIcon,
      theme: 'hover:border-red-400 hover:text-red-300 bg-red-950/40',
      badge: isEn ? 'Channel' : 'চ্যানেল',
    },
    {
      name: isEn ? 'GitHub' : 'গিটহাব',
      handle: '@moin2003',
      url: 'https://github.com/moin2003',
      icon: GithubIcon,
      theme: 'hover:border-emerald-400 hover:text-white bg-gray-950/70',
      badge: isEn ? 'Developer' : 'ডেভেলপার',
    },
  ];

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 select-none overflow-y-auto ${
        isEn ? 'font-sans' : 'font-bengali'
      }`}
    >
      {/* Backdrop with Deep Islamic Aura */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      {/* Main Spacious Royal Modal Card */}
      <div className="relative w-full max-w-2xl sm:max-w-3xl bg-gradient-to-b from-[#072413] via-[#041a0e] to-[#021008] rounded-[28px] sm:rounded-[36px] shadow-[0_30px_90px_rgba(0,0,0,0.95)] border border-amber-400/40 text-white overflow-hidden animate-in zoom-in-95 duration-200 my-auto">
        
        {/* Ambient Top Glow */}
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-emerald-500/20 via-amber-400/5 to-transparent pointer-events-none" />

        {/* Top Header Controls */}
        <div className="relative z-10 px-5 sm:px-7 pt-5 pb-3.5 flex items-center justify-between border-b border-emerald-800/60 bg-black/20">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-300 shadow-sm">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-amber-200 tracking-wide">
                {isEn ? 'About the Developer & Initiator' : 'উদ্যোক্তা ও ডেভেলপার পরিচিতি'}
              </h3>
              <p className="text-[11px] text-emerald-300/80 font-medium">
                {isEn ? 'Creator & Initiator of QuranFolio' : 'QuranFolio — ১৫ লাইনের নূরানী হাফেজী কুরআন প্ল্যাটফর্ম'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center transition-all cursor-pointer border border-white/10 hover:scale-105 active:scale-95"
            title={isEn ? 'Close' : 'বন্ধ করুন'}
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="relative z-10 p-5 sm:p-7 space-y-5 max-h-[82vh] overflow-y-auto">
          
          {/* Profile Hero Card with Round Portrait & Comprehensive Bio */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white/[0.04] border border-emerald-500/30 backdrop-blur-md shadow-lg flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6">
            
            {/* Round Luxury Portrait with Glowing Halo */}
            <div className="relative shrink-0 flex flex-col items-center">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr from-amber-400 via-emerald-400 to-amber-300 shadow-[0_0_35px_rgba(251,191,36,0.35)] flex items-center justify-center">
                <div className="w-full h-full rounded-full overflow-hidden bg-[#03150b] ring-2 ring-black/40 relative">
                  <img
                    src="/images/moinul_islam.webp"
                    alt="Hafiz Md. Moinul Islam"
                    className="w-full h-full object-cover object-top select-none transition-transform duration-500 hover:scale-110"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (!target.src.endsWith('.jpg')) {
                        target.src = '/images/moinul_islam.jpg';
                      }
                    }}
                  />
                </div>
              </div>

              {/* Verified Crown / Award Badge */}
              <div 
                className="absolute -bottom-1 sm:bottom-0 right-1 sm:right-2 p-1.5 rounded-full bg-emerald-600 text-white shadow-lg border-2 border-[#041a0e]"
                title={isEn ? 'Verified Hafez-e-Quran & Developer' : 'হাফেজে কুরআন ও সফটওয়্যার ইঞ্জিনিয়ার'}
              >
                <Award className="w-4 h-4 text-amber-300" />
              </div>
            </div>

            {/* Comprehensive Developer Info & Arabic Monogram */}
            <div className="text-center sm:text-left flex-1 min-w-0">
              
              {/* Badge & Arabic Calligraphy header */}
              <div className="flex flex-wrap items-center justify-center sm:justify-between gap-2 mb-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-950/90 border border-emerald-400/40 text-emerald-300 text-[11px] font-bold shadow-xs">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>{isEn ? 'Initiator & Lead Developer' : 'উদ্যোক্তা ও প্রধান ডেভেলপার'}</span>
                </div>
                <div className="font-arabic text-amber-300 font-bold text-sm tracking-wider px-2.5 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/20">
                  مَعِين ✦ MI
                </div>
              </div>

              {/* Full Developer Name */}
              <h2 className="text-2xl sm:text-3xl font-black text-white drop-shadow tracking-wide">
                {isEn ? 'Hafiz Md. Moinul Islam' : 'হাফেজ মোঃ মঈনুল ইসলাম'}
              </h2>
              
              {/* Professional Designation */}
              <p className="text-xs sm:text-sm text-emerald-200/90 font-semibold mt-1">
                {isEn
                  ? 'Hafez-e-Quran & Full-Stack Software Engineer • Islamic Tech Innovator'
                  : 'হাফেজে কুরআন ও সফটওয়্যার ইঞ্জিনিয়ার • ইসলামিক ডিজিটাল সলিউশন নির্মাতা'}
              </p>

              {/* Spiritual Bio Quote */}
              <div className="mt-2.5 p-2.5 rounded-2xl bg-black/30 border border-amber-400/20 text-left">
                <p className="text-xs text-amber-200 font-arabic font-medium leading-relaxed">
                  "الحمد لله على كل شيء — A person chosen by Allah, cannot be defeated by humans.!!"
                </p>
              </div>

              {/* Rich Project Mission Details */}
              <p className="text-xs text-gray-300 mt-2.5 leading-relaxed">
                {isEn
                  ? 'Dedicated to crafting authentic, ultra-realistic, ad-free Islamic applications with modern web & cloud technologies to serve the global Muslim Ummah in Quran Hifz and recitation.'
                  : 'মুসলিম উম্মাহর কুরআন হিফজ, নিয়মিত তিলাওয়াত ও অনুশীলনের সুবিধার্থে আধুনিক ক্লাউড ও ওয়েব প্রযুক্তির সমন্বয়ে বিজ্ঞাপনমুক্ত নির্ভরযোগ্য ইসলামিক সফটওয়্যার তৈরিতে নিবেদিত।'}
              </p>
            </div>
          </div>

          {/* Social Profiles Grid (Spacious 2/3 Column Bento) */}
          <div>
            <div className="flex items-center justify-between mb-3 px-1">
              <h4 className="text-xs sm:text-sm font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
                <Share2 className="w-4 h-4 text-emerald-400" />
                <span>{isEn ? 'Official Social Media & Profiles' : 'অফিসিয়াল সোশ্যাল মিডিয়া ও প্রোফাইল'}</span>
              </h4>
              <span className="text-[11px] text-emerald-400/90 font-medium">
                {isEn ? '6 Channels' : '৬টি লিংক'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {socialLinks.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <a
                    key={idx}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sfx.playGoldenClick()}
                    className={`p-3 rounded-2xl border border-emerald-600/30 transition-all duration-200 flex items-center justify-between group hover:scale-[1.02] active:scale-95 shadow-md ${item.theme}`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10 group-hover:scale-110 transition-transform">
                        <IconComponent className="w-4 h-4 text-amber-300" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-white group-hover:text-amber-200 transition-colors truncate">
                          {item.name}
                        </div>
                        <div className="text-[11px] text-gray-300 truncate font-mono">{item.handle}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0 ml-1.5">
                      <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-white/10 text-emerald-300 font-semibold border border-white/5">
                        {item.badge}
                      </span>
                      <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-white transition-colors" />
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Direct Communication & Contact Email */}
          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 space-y-2.5 shadow-md">
            <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-300" />
              <span>{isEn ? 'Direct Contact & Inquiries' : 'সরাসরি যোগাযোগ ও মতামত'}</span>
            </h4>
            
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                    {isEn ? 'Official Email' : 'অফিসিয়াল ইমেইল'}
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-white select-all truncate font-mono">
                    {developerEmail}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                <button
                  onClick={handleCopyEmail}
                  className="flex-1 sm:flex-initial px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow cursor-pointer active:scale-95 border border-emerald-500/50"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-amber-300" />
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
                  className="flex-1 sm:flex-initial px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-emerald-200 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1 border border-white/10 cursor-pointer active:scale-95"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>{isEn ? 'Send Email' : 'ইমেইল পাঠান'}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Project Mission & Sadaqah Jariyah Dedication */}
          <div className="text-center p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-emerald-900/50 to-emerald-950/80 border border-amber-400/30 shadow-md">
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-amber-300 mb-1">
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
              <span>{isEn ? 'Dedicated as Sadaqah Jariyah' : 'সদকায়ে জারিয়া হিসেবে উৎসর্গীকৃত'}</span>
            </div>
            <p className="text-[11.5px] text-emerald-100/90 leading-relaxed max-w-xl mx-auto">
              {isEn
                ? 'Please remember the developer, his parents, teachers, and the entire Muslim Ummah in your sincere prayers and Dua during recitation.'
                : 'আপনার মূল্যবান কুরআন তিলাওয়াত ও আন্তরিক দোয়ায় ডেভেলপার, তার পিতা-মাতা, শিক্ষকবৃন্দ এবং সমগ্র মুসলিম উম্মাহকে শামিল রাখার বিনীত অনুরোধ রইল।'}
            </p>
          </div>

        </div>

        {/* Footer Bar */}
        <div className="relative z-10 px-6 sm:px-7 py-3.5 bg-[#020e06] border-t border-emerald-900/80 flex items-center justify-between">
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
