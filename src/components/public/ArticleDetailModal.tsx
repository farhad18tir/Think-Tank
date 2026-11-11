import React, { useState } from 'react';
import { Article } from '../../types';
import { useThinkTank } from '../../context/ThinkTankContext';
import { X, Copy, Check, FileDown, BookOpen, ExternalLink, Calendar, Clock, Hash } from 'lucide-react';

interface Props {
  article: Article;
  onClose: () => void;
}

export const ArticleDetailModal: React.FC<Props> = ({ article, onClose }) => {
  const { language, showToast } = useThinkTank();
  const [copiedBib, setCopiedBib] = useState(false);
  const isFa = language === 'fa';

  const title = isFa ? article.title : article.titleEn;
  const abstract = isFa ? article.abstract : article.abstractEn;
  const category = isFa ? article.category : article.categoryEn;
  const authors = isFa ? article.authors : article.authorsEn;
  const readTime = isFa ? article.readTime : article.readTimeEn;

  const bibtex = `@article{${article.id},
  title = {${article.titleEn}},
  author = {${article.authorsEn.join(' and ')}},
  journal = {University Think Tank Policy Series},
  year = {${article.date.slice(0, 4)}},
  doi = {${article.doi}}
}`;

  const handleCopyBibtex = () => {
    navigator.clipboard.writeText(bibtex);
    setCopiedBib(true);
    showToast(isFa ? 'استناد BibTeX کپی شد' : 'BibTeX citation copied to clipboard');
    setTimeout(() => setCopiedBib(false), 2500);
  };

  const handleDownload = () => {
    showToast(
      isFa
        ? 'در حال آماده‌سازی فایل PDF مقاله...'
        : 'Preparing academic PDF document...',
      'info'
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 my-8 overflow-hidden">
        {/* Header Ribbon */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="font-semibold text-slate-700 dark:text-slate-300">{category}</span>
            <span>·</span>
            <span>{readTime}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Title */}
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug">
            {title}
          </h2>

          {/* Authors & Publication Date */}
          <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-1.5">
              <span className="font-medium text-slate-900 dark:text-slate-200">
                {isFa ? 'نویسندگان:' : 'Authors:'}
              </span>
              <span>{authors.join(' · ')}</span>
            </div>
            <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">|</span>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span className="tabular-nums">{article.date}</span>
            </div>
            <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">|</span>
            <div className="flex items-center gap-1.5">
              <Hash className="w-3.5 h-3.5 text-slate-400" />
              <span className="tabular-nums font-mono text-[11px] text-blue-600 dark:text-blue-400">
                DOI: {article.doi}
              </span>
            </div>
          </div>

          {/* Abstract */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {isFa ? 'چکیده و خلاصه‌سیاستی پژوهش' : 'Executive Abstract & Policy Findings'}
            </h3>
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed text-justify">
              {abstract}
            </p>
          </div>

          {/* Keywords / Tags (Unboxed Discipline) */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {isFa ? 'کلیدواژه‌های موضوعی:' : 'Subject Keywords:'}
            </h4>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
              {(isFa ? article.tags : article.tagsEn).map((tag, idx) => (
                <span key={idx} className="after:content-['·'] last:after:content-[''] after:ms-2">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* BibTeX Citation Box */}
          <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {isFa ? 'ارجاع علمی (BibTeX)' : 'Academic Citation (BibTeX)'}
              </span>
              <button
                onClick={handleCopyBibtex}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors"
              >
                {copiedBib ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedBib ? (isFa ? 'کپی شد' : 'Copied') : isFa ? 'کپی ارجاع' : 'Copy BibTeX'}</span>
              </button>
            </div>
            <pre className="p-3 text-[11px] font-mono bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-300 rounded-md overflow-x-auto border border-slate-200 dark:border-slate-800" dir="ltr">
              {bibtex}
            </pre>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={handleDownload}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 rounded-lg shadow-sm transition-colors"
            >
              <FileDown className="w-4 h-4" />
              <span>{isFa ? 'دانلود نسخه کامل مقاله (PDF)' : 'Download Full Paper (PDF)'}</span>
            </button>
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors border border-slate-300 dark:border-slate-700"
            >
              {isFa ? 'بستن' : 'Close'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
