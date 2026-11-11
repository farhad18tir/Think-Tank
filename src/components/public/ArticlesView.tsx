import React, { useState, useMemo } from 'react';
import { useThinkTank } from '../../context/ThinkTankContext';
import { Search, BookOpen, ExternalLink, Calendar, Hash, ArrowLeft, ArrowRight } from 'lucide-react';
import { ArticleDetailModal } from './ArticleDetailModal';

export const ArticlesView: React.FC = () => {
  const { language, articles, selectedArticle, setSelectedArticle } = useThinkTank();
  const isFa = language === 'fa';
  const ArrowIcon = isFa ? ArrowLeft : ArrowRight;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = useMemo(() => {
    const list = Array.from(new Set(articles.map((a) => (isFa ? a.category : a.categoryEn))));
    return ['all', ...list];
  }, [articles, isFa]);

  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      const title = isFa ? art.title : art.titleEn;
      const abstract = isFa ? art.abstract : art.abstractEn;
      const category = isFa ? art.category : art.categoryEn;
      const authors = (isFa ? art.authors : art.authorsEn).join(' ');
      const tags = (isFa ? art.tags : art.tagsEn).join(' ');

      const matchesCategory = selectedCategory === 'all' || category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
        authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tags.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [articles, selectedCategory, searchQuery, isFa]);

  return (
    <div className="py-12 lg:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Detail / Citation Modal */}
      {selectedArticle && (
        <ArticleDetailModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}

      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="text-xs font-semibold text-blue-900 dark:text-blue-400 uppercase tracking-wider">
          {isFa ? 'اسناد سیاستی و انتشارات آکادمیک' : 'Policy Briefs & Working Papers'}
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          {isFa ? 'مقالات پژوهشی و خلاصه‌های سیاستی' : 'Research Papers & Policy Recommendations'}
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          {isFa
            ? 'مجموعه مقالات علمی داوری‌شده، یادداشت‌های سیاستی فوری برای قانون‌گذاران و تحلیل‌های مستقل پیرامون تأثیرات فناوری‌های نوظهور.'
            : 'Peer-reviewed working papers, rapid policy briefs for legislators, and independent empirical inquiries on the societal footprint of emerging technologies.'}
        </p>
      </div>

      {/* Search Bar & Category Filter Controls */}
      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute top-3.5 start-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              isFa
                ? 'جستجو بر اساس عنوان مقاله، نام نویسنده یا موضوع...'
                : 'Search papers by title, author, or keyword...'
            }
            className="w-full ps-10 pe-4 py-2.5 text-xs sm:text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900 dark:text-white placeholder:text-slate-400 shadow-sm"
          />
        </div>

        {/* Filter Controls (Buttons/Segmented controls) */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/60 rounded-lg max-w-fit">
          {categories.map((cat) => {
            const isAll = cat === 'all';
            const label = isAll ? (isFa ? 'همه مقالات' : 'All Papers') : cat;
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  isSelected
                    ? 'bg-white dark:bg-slate-900 text-blue-900 dark:text-blue-400 shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Articles List / Grid */}
      {filteredArticles.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-xl border border-dashed border-slate-300 dark:border-slate-800 space-y-2">
          <BookOpen className="w-8 h-8 text-slate-400 mx-auto" />
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {isFa ? 'مقاله‌ای با این مشخصات یافت نشد' : 'No articles match your criteria'}
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="text-xs text-blue-600 hover:underline"
          >
            {isFa ? 'پاک کردن فیلترها' : 'Clear filters'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredArticles.map((art) => {
            const title = isFa ? art.title : art.titleEn;
            const abstract = isFa ? art.abstract : art.abstractEn;
            const category = isFa ? art.category : art.categoryEn;
            const authors = isFa ? art.authors : art.authorsEn;
            const readTime = isFa ? art.readTime : art.readTimeEn;

            return (
              <article
                key={art.id}
                className="group p-6 sm:p-7 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all space-y-4"
              >
                {/* Unboxed Metadata (Zero-Pill Discipline) */}
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-blue-900 dark:text-blue-400">{category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">{art.date}</span>
                  <span aria-hidden="true">·</span>
                  <span>{readTime}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono text-[11px] text-slate-400">DOI: {art.doi}</span>
                </div>

                {/* Title */}
                <h3
                  onClick={() => setSelectedArticle(art)}
                  className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug group-hover:text-blue-900 dark:group-hover:text-blue-400 transition-colors cursor-pointer"
                >
                  {title}
                </h3>

                {/* Abstract Excerpt */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                  {abstract}
                </p>

                {/* Footer: Authors & Action */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                    <span className="font-medium text-slate-900 dark:text-slate-200">
                      {isFa ? 'نویسندگان:' : 'Authors:'}
                    </span>
                    <span>{authors.join(' · ')}</span>
                  </div>

                  <button
                    onClick={() => setSelectedArticle(art)}
                    className="inline-flex items-center gap-1.5 font-semibold text-blue-900 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors whitespace-nowrap self-start sm:self-auto"
                  >
                    <span>{isFa ? 'مشاهده متن کامل و استناد (BibTeX)' : 'Full Abstract & Citation'}</span>
                    <ArrowIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};
