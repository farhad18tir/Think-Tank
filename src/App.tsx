/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ThinkTankProvider, useThinkTank } from './context/ThinkTankContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HeroSection } from './components/public/HeroSection';
import { FocusAreasView } from './components/public/FocusAreasView';
import { ArticlesView } from './components/public/ArticlesView';
import { ExpertsView } from './components/public/ExpertsView';
import { PublicationsView } from './components/public/PublicationsView';
import { EventsView } from './components/public/EventsView';
import { AboutView } from './components/public/AboutView';
import { AdminPortal } from './components/admin/AdminPortal';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { ArticleDetailModal } from './components/public/ArticleDetailModal';
import { ArrowLeft, ArrowRight, Building2, BookOpen, Users, Calendar, CheckCircle2 } from 'lucide-react';

const MainLayout: React.FC = () => {
  const {
    language,
    activeTab,
    setActiveTab,
    isAdminOpen,
    setIsAdminOpen,
    adminSession,
    toast,
    labs,
    articles,
    experts,
    events,
    selectedArticle,
    setSelectedArticle,
  } = useThinkTank();

  const isFa = language === 'fa';
  const ArrowIcon = isFa ? ArrowLeft : ArrowRight;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Toast Notification Container */}
      {toast && (
        <div className="fixed bottom-5 start-5 z-50 max-w-sm animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div
            className={`px-4 py-3 rounded-lg shadow-lg text-xs font-semibold flex items-center gap-2 border ${
              toast.type === 'error'
                ? 'bg-red-600 text-white border-red-700'
                : toast.type === 'info'
                ? 'bg-slate-800 text-white border-slate-700'
                : 'bg-emerald-700 text-white border-emerald-800'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Global Top Navbar */}
      <Navbar />

      {/* Admin Passcode Modal if user requested CMS without active session */}
      {isAdminOpen && !adminSession && (
        <AdminLoginModal onClose={() => setIsAdminOpen(false)} />
      )}

      {/* Main View Router */}
      <main className="flex-1">
        {isAdminOpen && adminSession ? (
          <AdminPortal />
        ) : (
          <>
            {activeTab === 'home' && (
              <>
                <HeroSection />

                {/* 1. Featured Labs Section */}
                <section className="py-14 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                      <div>
                        <div className="text-xs font-semibold text-blue-900 dark:text-blue-400 uppercase tracking-wider mb-1">
                          {isFa ? 'خوشه‌های بین‌رشته‌ای' : 'Interdisciplinary Clusters'}
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                          {isFa ? 'آزمایشگاه‌های پژوهشی اندیشکده' : 'Key Research Labs'}
                        </h2>
                      </div>
                      <button
                        onClick={() => {
                          setActiveTab('labs');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-900 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors self-start sm:self-auto"
                      >
                        <span>{isFa ? 'مشاهده همه آزمایشگاه‌ها' : 'Explore All Labs'}</span>
                        <ArrowIcon className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {labs.slice(0, 3).map((lab) => (
                        <div
                          key={lab.id}
                          className="bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden group hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between"
                        >
                          <div className="aspect-[16/10] overflow-hidden bg-slate-200 dark:bg-slate-800">
                            <img
                              src={lab.imageUrl}
                              alt={lab.name}
                              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                            <div>
                              <span className="text-[11px] font-semibold text-blue-900 dark:text-blue-400">
                                {isFa ? lab.focusArea : lab.focusAreaEn}
                              </span>
                              <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight mt-1">
                                {isFa ? lab.name : lab.nameEn}
                              </h3>
                              <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 mt-2 leading-relaxed">
                                {isFa ? lab.description : lab.descriptionEn}
                              </p>
                            </div>
                            <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
                              <strong className="text-slate-800 dark:text-slate-200">
                                {isFa ? 'مدیر علمی:' : 'Lead:'}
                              </strong>{' '}
                              {isFa ? lab.leadExpertName : lab.leadExpertNameEn}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* 2. Latest Research Papers & Policy Briefs */}
                <section className="py-14 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                      <div>
                        <div className="text-xs font-semibold text-blue-900 dark:text-blue-400 uppercase tracking-wider mb-1">
                          {isFa ? 'تازه‌ترین دستاوردهای علمی' : 'Latest Scholarly Output'}
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                          {isFa ? 'مقالات و گزارش‌های سیاستی جدید' : 'Featured Working Papers'}
                        </h2>
                      </div>
                      <button
                        onClick={() => {
                          setActiveTab('articles');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-900 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors self-start sm:self-auto"
                      >
                        <span>{isFa ? 'مشاهده آرشیو کامل مقالات' : 'View Full Archive'}</span>
                        <ArrowIcon className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {articles.slice(0, 4).map((art) => (
                        <div
                          key={art.id}
                          className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all space-y-3 flex flex-col justify-between"
                        >
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                              <span className="font-semibold text-blue-900 dark:text-blue-400">
                                {isFa ? art.category : art.categoryEn}
                              </span>
                              <span>·</span>
                              <span className="tabular-nums">{art.date}</span>
                            </div>

                            <h3
                              onClick={() => setSelectedArticle(art)}
                              className="text-base font-bold text-slate-900 dark:text-white leading-snug cursor-pointer hover:text-blue-900 dark:hover:text-blue-400 transition-colors"
                            >
                              {isFa ? art.title : art.titleEn}
                            </h3>

                            <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                              {isFa ? art.abstract : art.abstractEn}
                            </p>
                          </div>

                          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                            <span className="text-slate-500">
                              {(isFa ? art.authors : art.authorsEn).join(' · ')}
                            </span>
                            <button
                              onClick={() => setSelectedArticle(art)}
                              className="font-semibold text-blue-900 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                            >
                              {isFa ? 'استناد و جزئیات' : 'Cite & Read'}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* 3. Experts Spotlight */}
                <section className="py-14 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                      <div>
                        <div className="text-xs font-semibold text-blue-900 dark:text-blue-400 uppercase tracking-wider mb-1">
                          {isFa ? 'سرمایه انسانی و هیئت علمی' : 'Academic Leadership'}
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                          {isFa ? 'پژوهشگران و اساتید وابسته' : 'Fellows & Senior Researchers'}
                        </h2>
                      </div>
                      <button
                        onClick={() => {
                          setActiveTab('experts');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-900 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors self-start sm:self-auto"
                      >
                        <span>{isFa ? 'فهرست کامل اعضای اندیشکده' : 'Meet All Fellows'}</span>
                        <ArrowIcon className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {experts.slice(0, 4).map((exp) => (
                        <div
                          key={exp.id}
                          className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3 flex flex-col justify-between"
                        >
                          <div className="space-y-3">
                            <img
                              src={exp.imageUrl}
                              alt={exp.name}
                              className="w-14 h-14 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                              referrerPolicy="no-referrer"
                            />
                            <div>
                              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                                {isFa ? exp.name : exp.nameEn}
                              </h3>
                              <p className="text-[11px] font-medium text-blue-900 dark:text-blue-400">
                                {isFa ? exp.role : exp.roleEn}
                              </p>
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                              {isFa ? exp.bio : exp.bioEn}
                            </p>
                          </div>

                          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500">
                            {exp.publicationsCount} {isFa ? 'اثر پژوهشی ثبت‌شده' : 'publications'}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* 4. Upcoming Events Preview Strip */}
                <section className="py-14 bg-slate-50 dark:bg-slate-950 transition-colors">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                      <div>
                        <div className="text-xs font-semibold text-blue-900 dark:text-blue-400 uppercase tracking-wider mb-1">
                          {isFa ? 'رویدادهای پیش رو' : 'Dialogues & Agenda'}
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                          {isFa ? 'میزگردها و نشست‌های سیاستی' : 'Upcoming Policy Symposia'}
                        </h2>
                      </div>
                      <button
                        onClick={() => {
                          setActiveTab('events');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-900 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors self-start sm:self-auto"
                      >
                        <span>{isFa ? 'تقویم کامل رویدادها' : 'View Full Calendar'}</span>
                        <ArrowIcon className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {events.slice(0, 2).map((ev) => (
                        <div
                          key={ev.id}
                          className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
                        >
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <span className="font-semibold text-blue-900 dark:text-blue-400">
                              {isFa ? ev.typeFa : ev.type}
                            </span>
                            <span>·</span>
                            <span className="tabular-nums">{ev.date}</span>
                            <span>·</span>
                            <span className="tabular-nums">{ev.time}</span>
                          </div>
                          <h3 className="text-base font-bold text-slate-900 dark:text-white">
                            {isFa ? ev.title : ev.titleEn}
                          </h3>
                          <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                            {isFa ? ev.description : ev.descriptionEn}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </>
            )}

            {activeTab === 'labs' && <FocusAreasView />}
            {activeTab === 'articles' && <ArticlesView />}
            {activeTab === 'experts' && <ExpertsView />}
            {activeTab === 'publications' && <PublicationsView />}
            {activeTab === 'events' && <EventsView />}
            {activeTab === 'about' && <AboutView />}

            {/* Modal for viewing article details if triggered from any page */}
            {selectedArticle && activeTab !== 'articles' && (
              <ArticleDetailModal
                article={selectedArticle}
                onClose={() => setSelectedArticle(null)}
              />
            )}
          </>
        )}
      </main>

      {/* Institutional Footer */}
      {!isAdminOpen && <Footer />}
    </div>
  );
};

export default function App() {
  return (
    <ThinkTankProvider>
      <MainLayout />
    </ThinkTankProvider>
  );
}
