import React from 'react';
import { useThinkTank } from '../../context/ThinkTankContext';
import { ArrowLeft, ArrowRight, BookOpen, Users, Building2, Award } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { language, config, setActiveTab, articles, experts, labs, publications } = useThinkTank();
  const isFa = language === 'fa';
  const ArrowIcon = isFa ? ArrowLeft : ArrowRight;

  const stats = [
    {
      labelFa: 'آزمایشگاه پژوهشی تخصصی',
      labelEn: 'Interdisciplinary Labs',
      value: labs.length,
      icon: Building2,
    },
    {
      labelFa: 'مقاله و سند سیاستی تدوین‌شده',
      labelEn: 'Papers & Policy Briefs',
      value: articles.length + publications.length,
      icon: BookOpen,
    },
    {
      labelFa: 'پژوهشگر ارشد و استاد وابسته',
      labelEn: 'Faculty Fellows & Chairs',
      value: experts.length,
      icon: Users,
    },
    {
      labelFa: 'استناد در مراجع سیاست‌گذاری',
      labelEn: 'National Policy Citations',
      value: '140+',
      icon: Award,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-900 dark:text-blue-400 uppercase tracking-wider">
              <span>{isFa ? config.universityFa : config.universityEn}</span>
              <span>·</span>
              <span>{isFa ? 'پلتفرم پژوهش به اقدام' : 'Research-to-Action Platform'}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.2] text-balance">
              {isFa ? config.nameFa : config.nameEn}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl text-balance">
              {isFa ? config.missionFa : config.missionEn}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  setActiveTab('articles');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-blue-900 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 rounded-lg shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              >
                <span>{isFa ? 'مطالعه آخرین مقالات و اسناد' : 'Explore Latest Papers'}</span>
                <ArrowIcon className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setActiveTab('labs');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg shadow-sm transition-colors"
              >
                <span>{isFa ? 'آشنایی با آزمایشگاه‌های اندیشکده' : 'Explore Research Labs'}</span>
              </button>
            </div>
          </div>

          {/* Visual Column: Architectural Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl bg-slate-100 dark:bg-slate-900 aspect-[16/10] lg:aspect-[4/3]">
              <img
                src="/src/assets/images/thinktank_hero_campus_1794416137367.jpg"
                alt={isFa ? 'ساختمان اندیشکده دانشگاه' : 'University Think Tank Campus'}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent flex items-end p-6">
                <div className="text-white space-y-1">
                  <p className="text-xs font-semibold text-blue-200">
                    {isFa ? 'پردیس نوآوری و سیاست‌گذاری دانشگاه' : 'University Innovation & Policy Campus'}
                  </p>
                  <p className="text-[11px] text-slate-300">
                    {isFa
                      ? 'هم‌افزایی پژوهشگران، دولتمردان و پیشگامان صنعت'
                      : 'Connecting scholars, public leaders, and technology pioneers'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Operational Stats Ribbon */}
        <div className="mt-14 pt-8 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((st, idx) => {
            const Icon = st.icon;
            return (
              <div key={idx} className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-900 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
                    {st.value}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 leading-tight">
                    {isFa ? st.labelFa : st.labelEn}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
