import React from 'react';
import { useThinkTank } from '../../context/ThinkTankContext';
import { Building2, User, CheckCircle2, ArrowLeft, ArrowRight } from 'lucide-react';

export const FocusAreasView: React.FC = () => {
  const { language, labs, setActiveTab } = useThinkTank();
  const isFa = language === 'fa';
  const ArrowIcon = isFa ? ArrowLeft : ArrowRight;

  return (
    <div className="py-12 lg:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Section Header */}
      <div className="max-w-3xl space-y-3">
        <div className="text-xs font-semibold text-blue-900 dark:text-blue-400 uppercase tracking-wider">
          {isFa ? 'خوشه‌های پژوهش به اقدام' : 'Research-to-Action Clusters'}
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          {isFa ? 'آزمایشگاه‌ها و حوزه‌های راهبردی اندیشکده' : 'Focus Areas & Specialized Labs'}
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          {isFa
            ? 'اندیشکده از طریق مجموعه‌ای از آزمایشگاه‌های بین‌رشته‌ای تخصصی، پاسخ‌هایی داده‌محور و ملموس برای بحران‌ها و فرصت‌های عصر دیجیتال ارائه می‌کند.'
            : 'Through specialized interdisciplinary labs, the Think Tank delivers data-driven, actionable frameworks addressing the pressing challenges and transformative opportunities of the digital era.'}
        </p>
      </div>

      {/* Labs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {labs.map((lab) => {
          const name = isFa ? lab.name : lab.nameEn;
          const desc = isFa ? lab.description : lab.descriptionEn;
          const lead = isFa ? lab.leadExpertName : lab.leadExpertNameEn;
          const focus = isFa ? lab.focusArea : lab.focusAreaEn;
          const initiatives = isFa ? lab.initiatives : lab.initiativesEn;

          return (
            <div
              key={lab.id}
              className="group bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col"
            >
              {/* Lab Visual Banner */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src={lab.imageUrl}
                  alt={name}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback container in case of path mismatch
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute top-3 start-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded">
                  {focus}
                </div>
              </div>

              {/* Lab Content */}
              <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-tight">
                    {name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {desc}
                  </p>

                  {/* Lead Scientist */}
                  <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <User className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span>
                      <strong className="text-slate-900 dark:text-slate-200">
                        {isFa ? 'مدیر آزمایشگاه:' : 'Lab Lead:'}
                      </strong>{' '}
                      {lead}
                    </span>
                  </div>

                  {/* Ongoing Initiatives */}
                  <div className="pt-2 space-y-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      {isFa ? 'طرح‌ها و پروژه‌های جاری:' : 'Key Active Initiatives:'}
                    </span>
                    <ul className="space-y-1.5">
                      {initiatives.map((init, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span>{init}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => {
                      setActiveTab('articles');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-900 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                  >
                    <span>{isFa ? 'مشاهده مقالات و اسناد مرتبط' : 'View Related Papers'}</span>
                    <ArrowIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
