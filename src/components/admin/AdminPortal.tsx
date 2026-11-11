import React, { useState, useRef } from 'react';
import { useThinkTank } from '../../context/ThinkTankContext';
import { AdminTab, Article, Expert, Publication, EventItem, Lab } from '../../types';
import {
  LayoutDashboard,
  FileText,
  Users,
  Printer,
  Building2,
  Calendar,
  Settings,
  Plus,
  Pencil,
  Trash2,
  Eye,
  Download,
  Upload,
  RotateCcw,
  LogOut,
  CheckCircle,
  X,
  ExternalLink,
} from 'lucide-react';

export const AdminPortal: React.FC = () => {
  const {
    language,
    activeAdminTab,
    setActiveAdminTab,
    setIsAdminOpen,
    setAdminSession,
    articles,
    addArticle,
    updateArticle,
    deleteArticle,
    experts,
    addExpert,
    updateExpert,
    deleteExpert,
    publications,
    addPublication,
    updatePublication,
    deletePublication,
    labs,
    addLab,
    updateLab,
    deleteLab,
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    config,
    updateConfig,
    resetToDefaults,
    exportJSON,
    importJSON,
    showToast,
  } = useThinkTank();

  const isFa = language === 'fa';
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Modal states for CRUD operations
  const [editingArticle, setEditingArticle] = useState<Article | 'new' | null>(null);
  const [editingExpert, setEditingExpert] = useState<Expert | 'new' | null>(null);
  const [editingPublication, setEditingPublication] = useState<Publication | 'new' | null>(null);
  const [editingEvent, setEditingEvent] = useState<EventItem | 'new' | null>(null);
  const [editingLab, setEditingLab] = useState<Lab | 'new' | null>(null);

  const tabs: { key: AdminTab; labelFa: string; labelEn: string; icon: React.ElementType }[] = [
    { key: 'overview', labelFa: 'داشبورد کلی', labelEn: 'Overview', icon: LayoutDashboard },
    { key: 'articles', labelFa: 'مدیریت مقالات', labelEn: 'Articles & Papers', icon: FileText },
    { key: 'experts', labelFa: 'مدیریت متخصصان', labelEn: 'Faculty & Experts', icon: Users },
    { key: 'publications', labelFa: 'مدیریت چاپ و انتشارات', labelEn: 'Books & Press', icon: Printer },
    { key: 'labs', labelFa: 'مدیریت آزمایشگاه‌ها', labelEn: 'Research Labs', icon: Building2 },
    { key: 'events', labelFa: 'مدیریت رویدادها', labelEn: 'Events & Seminars', icon: Calendar },
    { key: 'settings', labelFa: 'تنظیمات اندیشکده', labelEn: 'Site Settings', icon: Settings },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        if (content) {
          importJSON(content);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 pb-16 transition-colors">
      {/* Top Admin Action Bar */}
      <div className="bg-slate-900 text-white border-b border-slate-800 sticky top-16 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-blue-600 text-white rounded">
              CMS
            </span>
            <span className="text-sm font-semibold text-slate-100">
              {isFa ? 'سامانه مدیریت محتوای اندیشکده دانشگاه' : 'Think Tank Content Management Portal'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Live Preview Switch */}
            <button
              onClick={() => setIsAdminOpen(false)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-blue-700 hover:bg-blue-600 text-white rounded-md transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{isFa ? 'مشاهده زنده در سایت عمومی' : 'Live Preview Public Site'}</span>
            </button>

            {/* Export JSON */}
            <button
              onClick={exportJSON}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md transition-colors"
              title={isFa ? 'دانلود نسخه پشتیبان JSON' : 'Export JSON Backup'}
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden md:inline">{isFa ? 'پشتیبان JSON' : 'Export'}</span>
            </button>

            {/* Import JSON */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".json"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md transition-colors"
              title={isFa ? 'بارگذاری نسخه پشتیبان' : 'Import JSON Backup'}
            >
              <Upload className="w-3.5 h-3.5" />
              <span className="hidden md:inline">{isFa ? 'بارگذاری' : 'Import'}</span>
            </button>

            {/* Reset Demo Data */}
            <button
              onClick={() => {
                if (
                  confirm(
                    isFa
                      ? 'آیا مایل به بازنشانی همه بخش‌ها به داده‌های اولیه رسمی دانشگاه هستید؟'
                      : 'Restore all think tank entities to official demo seed data?'
                  )
                ) {
                  resetToDefaults();
                }
              }}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-md transition-colors"
              title={isFa ? 'بازنشانی به داده‌های پیش‌فرض' : 'Reset to seed data'}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">{isFa ? 'بازنشانی پیش‌فرض' : 'Reset'}</span>
            </button>

            {/* Logout */}
            <button
              onClick={() => {
                setAdminSession(false);
                setIsAdminOpen(false);
                showToast(isFa ? 'از پنل مدیریت خارج شدید' : 'Logged out from Admin CMS', 'info');
              }}
              className="p-1.5 text-slate-400 hover:text-white rounded-md"
              title={isFa ? 'خروج از حساب مدیریت' : 'Logout'}
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation Ribbon */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto gap-2 border-t border-slate-800 py-1.5">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeAdminTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveAdminTab(tab.key)}
                className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  isActive
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{isFa ? tab.labelFa : tab.labelEn}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Tab View Workspace */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeAdminTab === 'overview' && (
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              <div
                onClick={() => setActiveAdminTab('articles')}
                className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs hover:border-blue-500 cursor-pointer transition-all space-y-1"
              >
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {isFa ? 'کل مقالات و اسناد' : 'Total Articles & Briefs'}
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-blue-900 dark:text-blue-400 tabular-nums">
                  {articles.length}
                </div>
                <span className="text-[11px] text-emerald-600">
                  {articles.filter((a) => a.published).length} {isFa ? 'منتشرشده' : 'published'}
                </span>
              </div>

              <div
                onClick={() => setActiveAdminTab('experts')}
                className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs hover:border-blue-500 cursor-pointer transition-all space-y-1"
              >
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {isFa ? 'اعضای هیئت علمی و متخصصان' : 'Fellows & Experts'}
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-blue-900 dark:text-blue-400 tabular-nums">
                  {experts.length}
                </div>
                <span className="text-[11px] text-slate-500">
                  {experts.reduce((sum, e) => sum + e.publicationsCount, 0)} {isFa ? 'استناد ثبت‌شده' : 'citations'}
                </span>
              </div>

              <div
                onClick={() => setActiveAdminTab('publications')}
                className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs hover:border-blue-500 cursor-pointer transition-all space-y-1"
              >
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {isFa ? 'کتب و گزارش‌های چاپ‌شده' : 'Books & Publications'}
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-blue-900 dark:text-blue-400 tabular-nums">
                  {publications.length}
                </div>
                <span className="text-[11px] text-slate-500">
                  {isFa ? 'شامل کتب، اسناد و گزارش‌ها' : 'Monographs & reports'}
                </span>
              </div>

              <div
                onClick={() => setActiveAdminTab('events')}
                className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs hover:border-blue-500 cursor-pointer transition-all space-y-1"
              >
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {isFa ? 'رویدادها و نشست‌ها' : 'Active Events'}
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-blue-900 dark:text-blue-400 tabular-nums">
                  {events.length}
                </div>
                <span className="text-[11px] text-emerald-600">
                  {events.filter((e) => e.registrationOpen).length} {isFa ? 'ثبت‌نام باز' : 'open registrations'}
                </span>
              </div>
            </div>

            {/* Quick Actions Guide */}
            <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {isFa ? 'راهنمای سریع به‌روزرسانی بخش‌های اندیشکده' : 'Quick Content Management Guide'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {isFa
                  ? 'این سامانه به شما اجازه می‌دهد کلیه بخش‌های سایت از جمله مقالات پژوهشی، مشخصات متخصصان، آثار چاپی، آزمایشگاه‌ها و رویدادها را به صورت آنی مدیریت، ویرایش و اضافه نمایید. با فشردن دکمه «مشاهده زنده در سایت عمومی»، می‌توانید فوراً تغییرات ایجاد شده را در سایت اصلی بررسی نمایید.'
                  : 'This CMS enables real-time management of all university think tank sections: working papers, fellow directories, printed monographs, research labs, and symposia. Toggle "Live Preview Public Site" anytime to inspect updates instantly.'}
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => {
                    setActiveAdminTab('articles');
                    setEditingArticle('new');
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 dark:bg-blue-600 rounded-md shadow-xs transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isFa ? 'ثبت مقاله یا گزارش جدید' : 'Publish New Paper'}</span>
                </button>
                <button
                  onClick={() => {
                    setActiveAdminTab('experts');
                    setEditingExpert('new');
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isFa ? 'افزودن عضو هیئت علمی / متخصص' : 'Add New Fellow'}</span>
                </button>
                <button
                  onClick={() => {
                    setActiveAdminTab('publications');
                    setEditingPublication('new');
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isFa ? 'ثبت کتاب یا گزارش سالانه' : 'Add Monograph / Report'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ARTICLES MANAGEMENT TAB */}
        {activeAdminTab === 'articles' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {isFa ? 'مدیریت و به‌روزرسانی مقالات' : 'Articles & Working Papers Management'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {isFa ? 'تعداد کل مقالات:' : 'Total Papers:'} {articles.length}
                </p>
              </div>
              <button
                onClick={() => setEditingArticle('new')}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 dark:bg-blue-600 rounded-lg shadow-xs transition-colors self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>{isFa ? 'افزودن مقاله جدید' : 'New Article'}</span>
              </button>
            </div>

            {/* Articles Table */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-start text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
                    <tr>
                      <th className="py-3 px-4 text-start">{isFa ? 'عنوان مقاله' : 'Title'}</th>
                      <th className="py-3 px-4 text-start">{isFa ? 'دسته موضوعی' : 'Category'}</th>
                      <th className="py-3 px-4 text-start">{isFa ? 'نویسندگان' : 'Authors'}</th>
                      <th className="py-3 px-4 text-start">{isFa ? 'تاریخ' : 'Date'}</th>
                      <th className="py-3 px-4 text-center">{isFa ? 'وضعیت انتشار' : 'Status'}</th>
                      <th className="py-3 px-4 text-end">{isFa ? 'عملیات' : 'Actions'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {articles.map((art) => (
                      <tr key={art.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                        <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white max-w-xs truncate">
                          {isFa ? art.title : art.titleEn}
                        </td>
                        <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                          {isFa ? art.category : art.categoryEn}
                        </td>
                        <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400">
                          {(isFa ? art.authors : art.authorsEn).join(', ')}
                        </td>
                        <td className="py-3.5 px-4 tabular-nums text-slate-500 dark:text-slate-400">
                          {art.date}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <button
                            onClick={() => updateArticle(art.id, { published: !art.published })}
                            className={`px-2 py-0.5 text-[10px] font-semibold rounded cursor-pointer ${
                              art.published
                                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                            }`}
                          >
                            {art.published ? (isFa ? 'منتشرشده' : 'Published') : isFa ? 'پیش‌نویس' : 'Draft'}
                          </button>
                        </td>
                        <td className="py-3.5 px-4 text-end">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setEditingArticle(art)}
                              className="p-1.5 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 rounded"
                              title={isFa ? 'ویرایش مقاله' : 'Edit'}
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(isFa ? 'آیا از حذف این مقاله اطمینان دارید؟' : 'Delete this article?')) {
                                  deleteArticle(art.id);
                                }
                              }}
                              className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/50 rounded"
                              title={isFa ? 'حذف مقاله' : 'Delete'}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* EXPERTS MANAGEMENT TAB */}
        {activeAdminTab === 'experts' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {isFa ? 'مدیریت و به‌روزرسانی متخصصان' : 'Faculty & Experts Directory Management'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {isFa ? 'تعداد اعضای هیئت علمی و پژوهشگران:' : 'Total Fellows:'} {experts.length}
                </p>
              </div>
              <button
                onClick={() => setEditingExpert('new')}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 dark:bg-blue-600 rounded-lg shadow-xs transition-colors self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>{isFa ? 'افزودن متخصص جدید' : 'New Expert'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {experts.map((exp) => (
                <div
                  key={exp.id}
                  className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-xs"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={exp.imageUrl}
                      alt={exp.name}
                      className="w-12 h-12 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                        {isFa ? exp.name : exp.nameEn}
                      </h4>
                      <p className="text-[11px] text-blue-900 dark:text-blue-400 truncate">
                        {isFa ? exp.role : exp.roleEn}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                    {isFa ? exp.bio : exp.bioEn}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                    <span className="text-slate-500">
                      {exp.publicationsCount} {isFa ? 'اثر پژوهشی' : 'works'}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingExpert(exp)}
                        className="p-1.5 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 rounded"
                        title={isFa ? 'ویرایش' : 'Edit'}
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(isFa ? 'آیا از حذف این متخصص اطمینان دارید؟' : 'Delete this expert?')) {
                            deleteExpert(exp.id);
                          }
                        }}
                        className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/50 rounded"
                        title={isFa ? 'حذف' : 'Delete'}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PUBLICATIONS MANAGEMENT TAB */}
        {activeAdminTab === 'publications' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {isFa ? 'مدیریت بخش چاپ، کتب و انتشارات' : 'Press, Books & Publications Management'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {isFa ? 'کتب و گزارش‌های ثبت‌شده:' : 'Total Publications:'} {publications.length}
                </p>
              </div>
              <button
                onClick={() => setEditingPublication('new')}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 dark:bg-blue-600 rounded-lg shadow-xs transition-colors self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>{isFa ? 'ثبت اثر چاپی جدید' : 'New Publication'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {publications.map((pub) => (
                <div
                  key={pub.id}
                  className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 space-y-3 shadow-xs"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-blue-900 dark:text-blue-400">
                      {isFa ? pub.typeFa : pub.type}
                    </span>
                    <span className="tabular-nums text-slate-500">{pub.year}</span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                    {isFa ? pub.title : pub.titleEn}
                  </h4>

                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                    {isFa ? pub.summary : pub.summaryEn}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                    <span className="text-slate-500 tabular-nums">
                      {pub.pages} {isFa ? 'صفحه' : 'pages'} · {pub.isbnOrDoi || 'No ISBN'}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingPublication(pub)}
                        className="p-1.5 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 rounded"
                        title={isFa ? 'ویرایش' : 'Edit'}
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(isFa ? 'آیا از حذف این اثر اطمینان دارید؟' : 'Delete this publication?')) {
                            deletePublication(pub.id);
                          }
                        }}
                        className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/50 rounded"
                        title={isFa ? 'حذف' : 'Delete'}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LABS MANAGEMENT TAB */}
        {activeAdminTab === 'labs' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {isFa ? 'مدیریت آزمایشگاه‌های اندیشکده' : 'Research Labs Management'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {isFa ? 'آزمایشگاه‌های فعال:' : 'Active Labs:'} {labs.length}
                </p>
              </div>
              <button
                onClick={() => setEditingLab('new')}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 dark:bg-blue-600 rounded-lg shadow-xs transition-colors self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>{isFa ? 'ایجاد آزمایشگاه جدید' : 'New Lab'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {labs.map((lab) => (
                <div
                  key={lab.id}
                  className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 space-y-3 shadow-xs"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-blue-900 dark:text-blue-400">
                      {isFa ? lab.focusArea : lab.focusAreaEn}
                    </span>
                    <span className="text-slate-500">
                      {isFa ? 'مدیر:' : 'Lead:'} {isFa ? lab.leadExpertName : lab.leadExpertNameEn}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    {isFa ? lab.name : lab.nameEn}
                  </h4>

                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3">
                    {isFa ? lab.description : lab.descriptionEn}
                  </p>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                    <button
                      onClick={() => setEditingLab(lab)}
                      className="p-1.5 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 rounded"
                      title={isFa ? 'ویرایش' : 'Edit'}
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(isFa ? 'آیا از حذف این آزمایشگاه اطمینان دارید؟' : 'Delete this lab?')) {
                          deleteLab(lab.id);
                        }
                      }}
                      className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/50 rounded"
                      title={isFa ? 'حذف' : 'Delete'}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EVENTS MANAGEMENT TAB */}
        {activeAdminTab === 'events' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {isFa ? 'مدیریت رویدادها و نشست‌های تخصصی' : 'Events & Symposia Management'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {isFa ? 'تعداد رویدادها:' : 'Total Events:'} {events.length}
                </p>
              </div>
              <button
                onClick={() => setEditingEvent('new')}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 dark:bg-blue-600 rounded-lg shadow-xs transition-colors self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>{isFa ? 'ثبت رویداد جدید' : 'New Event'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {events.map((ev) => (
                <div
                  key={ev.id}
                  className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="font-semibold text-blue-900 dark:text-blue-400">
                        {isFa ? ev.typeFa : ev.type}
                      </span>
                      <span>·</span>
                      <span className="tabular-nums">{ev.date}</span>
                      <span>·</span>
                      <span className="tabular-nums">{ev.time}</span>
                    </div>
                    <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                      {isFa ? ev.title : ev.titleEn}
                    </h4>
                    <p className="text-xs text-slate-500">
                      {isFa ? ev.location : ev.locationEn} · {isFa ? 'سخنران:' : 'Speaker:'}{' '}
                      {isFa ? ev.speaker : ev.speakerEn}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={() => updateEvent(ev.id, { registrationOpen: !ev.registrationOpen })}
                      className={`px-2.5 py-1 text-xs font-semibold rounded cursor-pointer ${
                        ev.registrationOpen
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                      }`}
                    >
                      {ev.registrationOpen ? (isFa ? 'ثبت‌نام باز' : 'Open') : isFa ? 'تکمیل ظرفیت' : 'Closed'}
                    </button>
                    <button
                      onClick={() => setEditingEvent(ev)}
                      className="p-1.5 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 rounded"
                      title={isFa ? 'ویرایش' : 'Edit'}
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(isFa ? 'آیا از حذف این رویداد اطمینان دارید؟' : 'Delete this event?')) {
                          deleteEvent(ev.id);
                        }
                      }}
                      className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/50 rounded"
                      title={isFa ? 'حذف' : 'Delete'}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeAdminTab === 'settings' && (
          <div className="max-w-3xl bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-xs">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {isFa ? 'تنظیمات هویتی و ساختار اندیشکده' : 'Think Tank General Settings'}
            </h3>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    نام اندیشکده (فارسی)
                  </label>
                  <input
                    type="text"
                    value={config.nameFa}
                    onChange={(e) => updateConfig({ nameFa: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Think Tank Title (English)
                  </label>
                  <input
                    type="text"
                    value={config.nameEn}
                    onChange={(e) => updateConfig({ nameEn: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900 dark:text-white"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    نام دانشگاه و دانشکده همکار (فارسی)
                  </label>
                  <input
                    type="text"
                    value={config.universityFa}
                    onChange={(e) => updateConfig({ universityFa: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Affiliated University (English)
                  </label>
                  <input
                    type="text"
                    value={config.universityEn}
                    onChange={(e) => updateConfig({ universityEn: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900 dark:text-white"
                    dir="ltr"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  شعار راهبردی اندیشکده (فارسی)
                </label>
                <input
                  type="text"
                  value={config.taglineFa}
                  onChange={(e) => updateConfig({ taglineFa: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  شرح بیانیه مأموریت (فارسی)
                </label>
                <textarea
                  rows={3}
                  value={config.missionFa}
                  onChange={(e) => updateConfig({ missionFa: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    پست الکترونیکی دبیرخانه
                  </label>
                  <input
                    type="email"
                    value={config.email}
                    onChange={(e) => updateConfig({ email: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900 dark:text-white"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    تلفن تماس
                  </label>
                  <input
                    type="text"
                    value={config.phone}
                    onChange={(e) => updateConfig({ phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900 dark:text-white"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <button
                  type="button"
                  onClick={() =>
                    showToast(isFa ? 'تنظیمات عمومی با موفقیت ذخیره شد' : 'Settings saved')
                  }
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 dark:bg-blue-600 rounded-md transition-colors"
                >
                  {isFa ? 'ذخیره تغییرات' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ARTICLE EDIT / CREATE MODAL */}
      {editingArticle && (
        <ArticleEditModal
          article={editingArticle === 'new' ? null : editingArticle}
          onClose={() => setEditingArticle(null)}
          onSave={(data) => {
            if (editingArticle === 'new') {
              addArticle(data);
            } else {
              updateArticle(editingArticle.id, data);
            }
            setEditingArticle(null);
          }}
        />
      )}

      {/* EXPERT EDIT / CREATE MODAL */}
      {editingExpert && (
        <ExpertEditModal
          expert={editingExpert === 'new' ? null : editingExpert}
          onClose={() => setEditingExpert(null)}
          onSave={(data) => {
            if (editingExpert === 'new') {
              addExpert(data);
            } else {
              updateExpert(editingExpert.id, data);
            }
            setEditingExpert(null);
          }}
        />
      )}

      {/* PUBLICATION EDIT / CREATE MODAL */}
      {editingPublication && (
        <PublicationEditModal
          publication={editingPublication === 'new' ? null : editingPublication}
          onClose={() => setEditingPublication(null)}
          onSave={(data) => {
            if (editingPublication === 'new') {
              addPublication(data);
            } else {
              updatePublication(editingPublication.id, data);
            }
            setEditingPublication(null);
          }}
        />
      )}

      {/* EVENT EDIT / CREATE MODAL */}
      {editingEvent && (
        <EventEditModal
          eventItem={editingEvent === 'new' ? null : editingEvent}
          onClose={() => setEditingEvent(null)}
          onSave={(data) => {
            if (editingEvent === 'new') {
              addEvent(data);
            } else {
              updateEvent(editingEvent.id, data);
            }
            setEditingEvent(null);
          }}
        />
      )}

      {/* LAB EDIT / CREATE MODAL */}
      {editingLab && (
        <LabEditModal
          lab={editingLab === 'new' ? null : editingLab}
          onClose={() => setEditingLab(null)}
          onSave={(data) => {
            if (editingLab === 'new') {
              addLab(data);
            } else {
              updateLab(editingLab.id, data);
            }
            setEditingLab(null);
          }}
        />
      )}
    </div>
  );
};

// --- SUB-MODALS FOR CLEAN CRUD ---

// 1. Article Edit Modal
const ArticleEditModal: React.FC<{
  article: Article | null;
  onClose: () => void;
  onSave: (data: Omit<Article, 'id'>) => void;
}> = ({ article, onClose, onSave }) => {
  const { language } = useThinkTank();
  const isFa = language === 'fa';

  const [title, setTitle] = useState(article?.title || '');
  const [titleEn, setTitleEn] = useState(article?.titleEn || '');
  const [abstract, setAbstract] = useState(article?.abstract || '');
  const [abstractEn, setAbstractEn] = useState(article?.abstractEn || '');
  const [category, setCategory] = useState(article?.category || 'سیاست‌گذاری هوش مصنوعی');
  const [categoryEn, setCategoryEn] = useState(article?.categoryEn || 'AI Policy');
  const [authors, setAuthors] = useState(article?.authors.join(', ') || 'دکتر علیرضا رستگار');
  const [authorsEn, setAuthorsEn] = useState(article?.authorsEn.join(', ') || 'Prof. Dr. Alireza Rastegar');
  const [date, setDate] = useState(article?.date || '۲۰۲۶/۰۳/۱۵');
  const [doi, setDoi] = useState(article?.doi || '10.1016/j.techsoc.2026.10482');
  const [readTime, setReadTime] = useState(article?.readTime || '۸ دقیقه مطالعه');
  const [readTimeEn, setReadTimeEn] = useState(article?.readTimeEn || '8 min read');
  const [tags, setTags] = useState(article?.tags.join(', ') || 'هوش مصنوعی, سیاست‌گذاری');
  const [tagsEn, setTagsEn] = useState(article?.tagsEn.join(', ') || 'Artificial Intelligence, Policy');
  const [featured, setFeatured] = useState(article?.featured ?? true);
  const [published, setPublished] = useState(article?.published ?? true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title,
      titleEn: titleEn || title,
      abstract,
      abstractEn: abstractEn || abstract,
      category,
      categoryEn: categoryEn || category,
      authors: authors.split(',').map((s) => s.trim()).filter(Boolean),
      authorsEn: (authorsEn || authors).split(',').map((s) => s.trim()).filter(Boolean),
      date,
      doi,
      readTime,
      readTimeEn,
      tags: tags.split(',').map((s) => s.trim()).filter(Boolean),
      tagsEn: (tagsEn || tags).split(',').map((s) => s.trim()).filter(Boolean),
      featured,
      published,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 my-8 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {article ? (isFa ? 'ویرایش مقاله' : 'Edit Paper') : isFa ? 'ثبت مقاله جدید' : 'New Paper'}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                عنوان مقاله (فارسی)
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                Title (English)
              </label>
              <input
                type="text"
                value={titleEn}
                onChange={(e) => setTitleEn(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md text-slate-900 dark:text-white"
                dir="ltr"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
              چکیده و خلاصه‌سیاستی (فارسی)
            </label>
            <textarea
              required
              rows={3}
              value={abstract}
              onChange={(e) => setAbstract(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md text-slate-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">دسته موضوعی</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">نویسندگان (با کاما)</label>
              <input
                type="text"
                value={authors}
                onChange={(e) => setAuthors(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">شناسه DOI</label>
              <input
                type="text"
                value={doi}
                onChange={(e) => setDoi(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md text-slate-900 dark:text-white"
                dir="ltr"
              />
            </div>
          </div>

          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="rounded"
              />
              <span>{isFa ? 'منتشر شود (عمومی)' : 'Published'}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="rounded"
              />
              <span>{isFa ? 'نمایش در مقالات برگزیده' : 'Featured on Home'}</span>
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
            >
              {isFa ? 'انصراف' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-4 py-2 font-semibold text-white bg-blue-900 hover:bg-blue-800 dark:bg-blue-600 rounded-md"
            >
              {isFa ? 'ذخیره مقاله' : 'Save Paper'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// 2. Expert Edit Modal
const ExpertEditModal: React.FC<{
  expert: Expert | null;
  onClose: () => void;
  onSave: (data: Omit<Expert, 'id'>) => void;
}> = ({ expert, onClose, onSave }) => {
  const { language } = useThinkTank();
  const isFa = language === 'fa';

  const [name, setName] = useState(expert?.name || '');
  const [nameEn, setNameEn] = useState(expert?.nameEn || '');
  const [role, setRole] = useState(expert?.role || '');
  const [roleEn, setRoleEn] = useState(expert?.roleEn || '');
  const [department, setDepartment] = useState(expert?.department || '');
  const [departmentEn, setDepartmentEn] = useState(expert?.departmentEn || '');
  const [researchAreas, setResearchAreas] = useState(expert?.researchAreas.join(', ') || '');
  const [bio, setBio] = useState(expert?.bio || '');
  const [bioEn, setBioEn] = useState(expert?.bioEn || '');
  const [email, setEmail] = useState(expert?.email || 'expert@univ.ac.ir');
  const [publicationsCount, setPublicationsCount] = useState(expert?.publicationsCount || 10);
  const [imageUrl, setImageUrl] = useState(
    expert?.imageUrl ||
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      nameEn: nameEn || name,
      role,
      roleEn: roleEn || role,
      department,
      departmentEn: departmentEn || department,
      researchAreas: researchAreas.split(',').map((s) => s.trim()).filter(Boolean),
      researchAreasEn: researchAreas.split(',').map((s) => s.trim()).filter(Boolean),
      bio,
      bioEn: bioEn || bio,
      email,
      publicationsCount: Number(publicationsCount),
      imageUrl,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 my-8 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {expert ? (isFa ? 'ویرایش مشخصات متخصص' : 'Edit Expert') : isFa ? 'افزودن متخصص جدید' : 'New Expert'}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                نام و عنوان (فارسی)
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="دکتر ..."
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                Full Name (English)
              </label>
              <input
                type="text"
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
                placeholder="Dr. ..."
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md text-slate-900 dark:text-white"
                dir="ltr"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                سمت در اندیشکده
              </label>
              <input
                type="text"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="پژوهشگر ارشد / رئیس اندیشکده"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                دانشکده / مرکز تحقیقاتی
              </label>
              <input
                type="text"
                required
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
              حوزه‌های پژوهش تخصصی (با کاما جدا کنید)
            </label>
            <input
              type="text"
              value={researchAreas}
              onChange={(e) => setResearchAreas(e.target.value)}
              placeholder="هوش مصنوعی, حکمرانی داده, اخلاق"
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
              بیوگرافی و سوابق علمی
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md text-slate-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                ایمیل سازمانی
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md text-slate-900 dark:text-white"
                dir="ltr"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                تعداد آثار منتشرشده
              </label>
              <input
                type="number"
                value={publicationsCount}
                onChange={(e) => setPublicationsCount(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
            >
              {isFa ? 'انصراف' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-4 py-2 font-semibold text-white bg-blue-900 hover:bg-blue-800 dark:bg-blue-600 rounded-md"
            >
              {isFa ? 'ذخیره اطلاعات متخصص' : 'Save Expert'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// 3. Publication Edit Modal
const PublicationEditModal: React.FC<{
  publication: Publication | null;
  onClose: () => void;
  onSave: (data: Omit<Publication, 'id'>) => void;
}> = ({ publication, onClose, onSave }) => {
  const { language } = useThinkTank();
  const isFa = language === 'fa';

  const [title, setTitle] = useState(publication?.title || '');
  const [titleEn, setTitleEn] = useState(publication?.titleEn || '');
  const [type, setType] = useState<Publication['type']>(publication?.type || 'Book');
  const [authors, setAuthors] = useState(publication?.authors.join(', ') || 'دکتر علیرضا رستگار');
  const [year, setYear] = useState(publication?.year || 2026);
  const [pages, setPages] = useState(publication?.pages || 150);
  const [isbnOrDoi, setIsbnOrDoi] = useState(publication?.isbnOrDoi || 'ISBN 978-600-00-0000-0');
  const [summary, setSummary] = useState(publication?.summary || '');
  const [summaryEn, setSummaryEn] = useState(publication?.summaryEn || '');

  const typeFaMap: Record<Publication['type'], Publication['typeFa']> = {
    Book: 'کتاب و تک‌نگاشت',
    'Annual Report': 'گزارش سالانه',
    'Policy Brief': 'گزارش سیاستی',
    Whitepaper: 'سند راهبردی',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title,
      titleEn: titleEn || title,
      type,
      typeFa: typeFaMap[type],
      authors: authors.split(',').map((s) => s.trim()).filter(Boolean),
      authorsEn: authors.split(',').map((s) => s.trim()).filter(Boolean),
      year: Number(year),
      pages: Number(pages),
      isbnOrDoi,
      summary,
      summaryEn: summaryEn || summary,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 my-8 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {publication ? (isFa ? 'ویرایش اثر چاپی' : 'Edit Publication') : isFa ? 'ثبت اثر چاپی جدید' : 'New Publication'}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
              عنوان اثر یا کتاب (فارسی)
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md text-slate-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">قالب اثر</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as Publication['type'])}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md text-slate-900 dark:text-white"
              >
                <option value="Book">کتاب / Book</option>
                <option value="Annual Report">گزارش سالانه / Annual Report</option>
                <option value="Policy Brief">گزارش سیاستی / Policy Brief</option>
                <option value="Whitepaper">سند راهبردی / Whitepaper</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">سال چاپ</label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">تعداد صفحات</label>
              <input
                type="number"
                value={pages}
                onChange={(e) => setPages(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">پدیدآورندگان</label>
              <input
                type="text"
                value={authors}
                onChange={(e) => setAuthors(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">شابک یا شناسه DOI</label>
              <input
                type="text"
                value={isbnOrDoi}
                onChange={(e) => setIsbnOrDoi(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md text-slate-900 dark:text-white"
                dir="ltr"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
              خلاصه معرفی اثر
            </label>
            <textarea
              rows={3}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md text-slate-900 dark:text-white"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
            >
              {isFa ? 'انصراف' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-4 py-2 font-semibold text-white bg-blue-900 hover:bg-blue-800 dark:bg-blue-600 rounded-md"
            >
              {isFa ? 'ذخیره اثر چاپی' : 'Save Publication'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// 4. Event Edit Modal
const EventEditModal: React.FC<{
  eventItem: EventItem | null;
  onClose: () => void;
  onSave: (data: Omit<EventItem, 'id'>) => void;
}> = ({ eventItem, onClose, onSave }) => {
  const { language } = useThinkTank();
  const isFa = language === 'fa';

  const [title, setTitle] = useState(eventItem?.title || '');
  const [titleEn, setTitleEn] = useState(eventItem?.titleEn || '');
  const [date, setDate] = useState(eventItem?.date || '۱۴۰۵/۰۲/۱۵');
  const [time, setTime] = useState(eventItem?.time || '۱۰:۰۰ الی ۱۳:۰۰');
  const [location, setLocation] = useState(eventItem?.location || 'سالن همایش‌های بین‌المللی دانشگاه');
  const [locationEn, setLocationEn] = useState(eventItem?.locationEn || 'University Convention Center');
  const [speaker, setSpeaker] = useState(eventItem?.speaker || 'دکتر علیرضا رستگار');
  const [speakerEn, setSpeakerEn] = useState(eventItem?.speakerEn || 'Prof. Dr. Alireza Rastegar');
  const [description, setDescription] = useState(eventItem?.description || '');
  const [registrationOpen, setRegistrationOpen] = useState(eventItem?.registrationOpen ?? true);
  const [type, setType] = useState<EventItem['type']>(eventItem?.type || 'Roundtable');

  const typeFaMap: Record<EventItem['type'], EventItem['typeFa']> = {
    Roundtable: 'میزگرد سیاستی',
    Symposium: 'همایش علمی',
    'Public Lecture': 'سخنرانی عمومی',
    Workshop: 'کارگاه تخصصی',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title,
      titleEn: titleEn || title,
      date,
      time,
      location,
      locationEn: locationEn || location,
      speaker,
      speakerEn: speakerEn || speaker,
      description,
      descriptionEn: description,
      registrationOpen,
      type,
      typeFa: typeFaMap[type],
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 my-8 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {eventItem ? (isFa ? 'ویرایش رویداد' : 'Edit Event') : isFa ? 'ثبت رویداد جدید' : 'New Event'}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
              عنوان رویداد یا نشست
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md text-slate-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">نوع رویداد</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as EventItem['type'])}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md text-slate-900 dark:text-white"
              >
                <option value="Roundtable">میزگرد سیاستی</option>
                <option value="Symposium">همایش علمی</option>
                <option value="Public Lecture">سخنرانی عمومی</option>
                <option value="Workshop">کارگاه تخصصی</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">تاریخ برگزاری</label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">ساعت برگزاری</label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">محل برگزاری</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">سخنرانان / دبیر نشست</label>
              <input
                type="text"
                value={speaker}
                onChange={(e) => setSpeaker(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">شرح برنامه</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md text-slate-900 dark:text-white"
            />
          </div>

          <label className="flex items-center gap-2 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={registrationOpen}
              onChange={(e) => setRegistrationOpen(e.target.checked)}
              className="rounded"
            />
            <span>{isFa ? 'امکان ثبت‌نام عمومی برای شرکت‌کنندگان فعال باشد' : 'Open Registration'}</span>
          </label>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
            >
              {isFa ? 'انصراف' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-4 py-2 font-semibold text-white bg-blue-900 hover:bg-blue-800 dark:bg-blue-600 rounded-md"
            >
              {isFa ? 'ذخیره رویداد' : 'Save Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// 5. Lab Edit Modal
const LabEditModal: React.FC<{
  lab: Lab | null;
  onClose: () => void;
  onSave: (data: Omit<Lab, 'id'>) => void;
}> = ({ lab, onClose, onSave }) => {
  const { language } = useThinkTank();
  const isFa = language === 'fa';

  const [name, setName] = useState(lab?.name || '');
  const [nameEn, setNameEn] = useState(lab?.nameEn || '');
  const [description, setDescription] = useState(lab?.description || '');
  const [leadExpertName, setLeadExpertName] = useState(lab?.leadExpertName || 'دکتر علیرضا رستگار');
  const [focusArea, setFocusArea] = useState(lab?.focusArea || 'هوش مصنوعی');
  const [initiatives, setInitiatives] = useState(
    lab?.initiatives.join(', ') || 'پروژه ۱, پروژه ۲'
  );
  const [imageUrl, setImageUrl] = useState(
    lab?.imageUrl || '/src/assets/images/lab_ai_governance_1794416137133.jpg'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      nameEn: nameEn || name,
      description,
      descriptionEn: description,
      leadExpertName,
      leadExpertNameEn: leadExpertName,
      focusArea,
      focusAreaEn: focusArea,
      initiatives: initiatives.split(',').map((s) => s.trim()).filter(Boolean),
      initiativesEn: initiatives.split(',').map((s) => s.trim()).filter(Boolean),
      imageUrl,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 my-8 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {lab ? (isFa ? 'ویرایش آزمایشگاه' : 'Edit Lab') : isFa ? 'ایجاد آزمایشگاه جدید' : 'New Lab'}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
              نام آزمایشگاه پژوهشی
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md text-slate-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                حوزه کلیدی (Focus Area)
              </label>
              <input
                type="text"
                value={focusArea}
                onChange={(e) => setFocusArea(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                مدیر علمی آزمایشگاه
              </label>
              <input
                type="text"
                value={leadExpertName}
                onChange={(e) => setLeadExpertName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
              شرح مأموریت آزمایشگاه
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
              پروژه‌ها و طرح‌های فعال (با کاما جدا کنید)
            </label>
            <input
              type="text"
              value={initiatives}
              onChange={(e) => setInitiatives(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md text-slate-900 dark:text-white"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
            >
              {isFa ? 'انصراف' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-4 py-2 font-semibold text-white bg-blue-900 hover:bg-blue-800 dark:bg-blue-600 rounded-md"
            >
              {isFa ? 'ذخیره آزمایشگاه' : 'Save Lab'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
