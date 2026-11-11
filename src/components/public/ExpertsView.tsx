import React, { useState, useMemo } from 'react';
import { useThinkTank } from '../../context/ThinkTankContext';
import { Search, Mail, BookOpen, GraduationCap, Award } from 'lucide-react';

export const ExpertsView: React.FC = () => {
  const { language, experts } = useThinkTank();
  const [search, setSearch] = useState('');
  const isFa = language === 'fa';

  const filteredExperts = useMemo(() => {
    return experts.filter((exp) => {
      const name = isFa ? exp.name : exp.nameEn;
      const role = isFa ? exp.role : exp.roleEn;
      const dept = isFa ? exp.department : exp.departmentEn;
      const areas = (isFa ? exp.researchAreas : exp.researchAreasEn).join(' ');

      const query = search.toLowerCase().trim();
      return (
        query === '' ||
        name.toLowerCase().includes(query) ||
        role.toLowerCase().includes(query) ||
        dept.toLowerCase().includes(query) ||
        areas.toLowerCase().includes(query)
      );
    });
  }, [experts, search, isFa]);

  return (
    <div className="py-12 lg:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="text-xs font-semibold text-blue-900 dark:text-blue-400 uppercase tracking-wider">
          {isFa ? 'اعضای هیئت علمی و همکاران بین‌رشته‌ای' : 'Academic Fellows & Leadership'}
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          {isFa ? 'متخصصان و پژوهشگران ارشد اندیشکده' : 'Experts, Fellows & Chairs'}
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          {isFa
            ? 'اندیشکده شبکه‌ای پویا از اساتید دانشگاه، متخصصان حقوقی، دانشمندان علوم کامپیوتر و مشاوران خط‌مشی است که در تلاقی علم و جامعه فعالیت می‌کنند.'
            : 'A vibrant interdisciplinary consortium of tenured chairs, computer scientists, legal philosophers, and policy fellows translating research into real-world impact.'}
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute top-3.5 start-3.5 pointer-events-none" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={
            isFa
              ? 'جستجو بر اساس نام متخصص، دانشکده یا حوزه پژوهشی...'
              : 'Search experts by name, faculty, or topic...'
          }
          className="w-full ps-10 pe-4 py-2.5 text-xs sm:text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900 dark:text-white placeholder:text-slate-400 shadow-sm"
        />
      </div>

      {/* Experts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredExperts.map((exp) => {
          const name = isFa ? exp.name : exp.nameEn;
          const role = isFa ? exp.role : exp.roleEn;
          const dept = isFa ? exp.department : exp.departmentEn;
          const areas = isFa ? exp.researchAreas : exp.researchAreasEn;
          const bio = isFa ? exp.bio : exp.bioEn;

          return (
            <div
              key={exp.id}
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
            >
              <div className="p-6 space-y-4">
                {/* Avatar & Header */}
                <div className="flex items-start gap-4">
                  <img
                    src={exp.imageUrl}
                    alt={name}
                    className="w-16 h-16 rounded-full object-cover border border-slate-200 dark:border-slate-700 shrink-0 bg-slate-100"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback avatar
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200';
                    }}
                  />
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                      {name}
                    </h3>
                    <p className="text-xs font-medium text-blue-900 dark:text-blue-400 leading-snug">
                      {role}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                      {dept}
                    </p>
                  </div>
                </div>

                {/* Research Areas (Zero-Pill Discipline) */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1">
                  <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                    {isFa ? 'حوزه‌های پژوهش تخصصی:' : 'Core Research Domains:'}
                  </span>
                  <div className="text-xs text-slate-700 dark:text-slate-300">
                    {areas.map((area, i) => (
                      <span key={i} className="after:content-['·'] last:after:content-[''] after:mx-1.5 font-medium">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bio Excerpt */}
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-4">
                  {bio}
                </p>
              </div>

              {/* Card Footer */}
              <div className="px-6 py-3.5 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                  <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                  <span className="tabular-nums font-semibold">{exp.publicationsCount}</span>
                  <span>{isFa ? 'اثر پژوهشی' : 'publications'}</span>
                </div>

                <a
                  href={`mailto:${exp.email}`}
                  className="inline-flex items-center gap-1 text-slate-700 dark:text-slate-300 hover:text-blue-900 dark:hover:text-blue-400 transition-colors font-medium"
                  title={exp.email}
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{isFa ? 'ارتباط' : 'Contact'}</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
