import React, { useState } from 'react';
import { useThinkTank } from '../../context/ThinkTankContext';
import { BookOpen, FileDown, Layers, Calendar, Hash, Check } from 'lucide-react';

export const PublicationsView: React.FC = () => {
  const { language, publications, showToast } = useThinkTank();
  const [filterType, setFilterType] = useState<string>('all');
  const isFa = language === 'fa';

  const types = [
    { key: 'all', labelFa: 'همه انتشارات', labelEn: 'All Publications' },
    { key: 'Book', labelFa: 'کتاب و تک‌نگاشت', labelEn: 'Books & Monographs' },
    { key: 'Annual Report', labelFa: 'گزارش‌های سالانه', labelEn: 'Annual Reports' },
    { key: 'Policy Brief', labelFa: 'گزارش‌های سیاستی', labelEn: 'Policy Briefs' },
    { key: 'Whitepaper', labelFa: 'اسناد راهبردی', labelEn: 'Whitepapers' },
  ];

  const filtered = publications.filter((pub) => {
    if (filterType === 'all') return true;
    return pub.type === filterType;
  });

  const handleDownload = (title: string) => {
    showToast(
      isFa
        ? `در حال آماده‌سازی فایل کامل «${title}»...`
        : `Preparing full download for "${title}"...`,
      'info'
    );
  };

  return (
    <div className="py-12 lg:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="text-xs font-semibold text-blue-900 dark:text-blue-400 uppercase tracking-wider">
          {isFa ? 'مرکز اسناد، کتب و چاپ' : 'Publications & Academic Press'}
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          {isFa ? 'چاپ و انتشارات اندیشکده' : 'Books, Monographs & Official Reports'}
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          {isFa
            ? 'مجموعه کتب علمی، تک‌نگاشت‌های پژوهشی، گزارش‌های راهبردی سالانه و اسناد سیاستی رسمی منتشر شده توسط انتشارات اختصاصی اندیشکده.'
            : 'Academic monographs, annual institutional reports, strategic whitepapers, and published books produced under the imprint of the University Think Tank.'}
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/60 rounded-lg max-w-fit">
        {types.map((t) => (
          <button
            key={t.key}
            onClick={() => setFilterType(t.key)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              filterType === t.key
                ? 'bg-white dark:bg-slate-900 text-blue-900 dark:text-blue-400 shadow-xs font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {isFa ? t.labelFa : t.labelEn}
          </button>
        ))}
      </div>

      {/* Publications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filtered.map((pub) => {
          const title = isFa ? pub.title : pub.titleEn;
          const summary = isFa ? pub.summary : pub.summaryEn;
          const authors = isFa ? pub.authors : pub.authorsEn;
          const typeLabel = isFa ? pub.typeFa : pub.type;

          return (
            <div
              key={pub.id}
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all p-6 sm:p-7 flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                {/* Top Meta (Zero-Pill Discipline) */}
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-blue-900 dark:text-blue-400">{typeLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">{pub.year}</span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">{pub.pages} {isFa ? 'صفحه' : 'pages'}</span>
                  {pub.isbnOrDoi && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono text-[11px] text-slate-400">{pub.isbnOrDoi}</span>
                    </>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
                  {title}
                </h3>

                {/* Authors */}
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  <span className="font-medium text-slate-900 dark:text-slate-200">
                    {isFa ? 'پدیدآورندگان:' : 'Authors / Editorial Board:'}
                  </span>{' '}
                  {authors.join(' · ')}
                </div>

                {/* Summary */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {summary}
                </p>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                  {isFa ? 'نسخه دیجیتال (دسترسی آزاد CC)' : 'Open Access Edition (CC)'}
                </span>

                <button
                  onClick={() => handleDownload(title)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 rounded-lg shadow-xs transition-colors"
                >
                  <FileDown className="w-3.5 h-3.5" />
                  <span>{isFa ? 'دریافت نسخه چاپی / PDF' : 'Download PDF / Print'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
