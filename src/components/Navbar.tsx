import React, { useState } from 'react';
import { useThinkTank } from '../context/ThinkTankContext';
import { PublicTab } from '../types';
import { ShieldCheck, Menu, X, Globe, SlidersHorizontal } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { language, toggleLanguage, activeTab, setActiveTab, isAdminOpen, setIsAdminOpen, config } =
    useThinkTank();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isFa = language === 'fa';

  const navItems: { key: PublicTab; labelFa: string; labelEn: string }[] = [
    { key: 'home', labelFa: 'صفحه اصلی', labelEn: 'Overview' },
    { key: 'labs', labelFa: 'آزمایشگاه‌ها', labelEn: 'Labs & Focus' },
    { key: 'articles', labelFa: 'مقالات و پژوهش‌ها', labelEn: 'Papers & Briefs' },
    { key: 'experts', labelFa: 'متخصصان', labelEn: 'Experts' },
    { key: 'publications', labelFa: 'چاپ و انتشارات', labelEn: 'Publications' },
    { key: 'events', labelFa: 'رویدادها', labelEn: 'Events' },
    { key: 'about', labelFa: 'درباره ما', labelEn: 'About' },
  ];

  const handleNavClick = (key: PublicTab) => {
    setActiveTab(key);
    if (isAdminOpen) setIsAdminOpen(false);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-16">
          {/* Zone 1: Brand Wordmark (Single-Line) */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-start group shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-md"
          >
            <div className="w-9 h-9 rounded-md bg-blue-900 dark:bg-blue-700 text-white flex items-center justify-center font-bold text-sm tracking-wider shadow-sm group-hover:bg-blue-800 transition-colors">
              {isFa ? 'ات' : 'TT'}
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap">
                {isFa ? config.nameFa : config.nameEn}
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 whitespace-nowrap -mt-0.5">
                {isFa ? config.universityFa : config.universityEn}
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links (Clean unboxed typography) */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = !isAdminOpen && activeTab === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item.key)}
                  className={`text-sm font-medium transition-colors whitespace-nowrap py-1 border-b-2 ${
                    isActive
                      ? 'text-blue-900 dark:text-blue-400 border-blue-900 dark:border-blue-400 font-semibold'
                      : 'text-slate-600 dark:text-slate-300 border-transparent hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  {isFa ? item.labelFa : item.labelEn}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Language Toggle & Admin CMS Action */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors"
              title={isFa ? 'تغییر زبان به انگلیسی' : 'Switch to Persian'}
            >
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              <span className="tabular-nums font-semibold">{isFa ? 'EN' : 'فا'}</span>
            </button>

            {/* Admin CMS Trigger Button */}
            <button
              onClick={() => setIsAdminOpen(!isAdminOpen)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all shadow-sm ${
                isAdminOpen
                  ? 'bg-blue-900 text-white dark:bg-blue-600'
                  : 'bg-slate-900 text-white hover:bg-blue-900 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {isAdminOpen
                  ? isFa
                    ? 'مشاهده سایت عمومی'
                    : 'View Public Site'
                  : isFa
                  ? 'پنل مدیریت (CMS)'
                  : 'Admin CMS'}
              </span>
              <span className="sm:hidden">{isFa ? 'مدیریت' : 'CMS'}</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-md"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-2 pb-4 space-y-1 shadow-lg">
          {navItems.map((item) => {
            const isActive = !isAdminOpen && activeTab === item.key;
            return (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.key)}
                className={`w-full text-start px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-900 dark:text-blue-300 font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {isFa ? item.labelFa : item.labelEn}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
