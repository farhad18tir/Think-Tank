import React from 'react';
import { useThinkTank } from '../context/ThinkTankContext';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const { language, config, setActiveTab, setIsAdminOpen } = useThinkTank();
  const isFa = language === 'fa';

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Col 1: Identity & Motto */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-md bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                {isFa ? 'ات' : 'TT'}
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                {isFa ? config.nameFa : config.nameEn}
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isFa ? config.taglineFa : config.taglineEn}
            </p>
            <p className="text-[11px] text-slate-500">
              {isFa
                ? 'پلتفرم مستقل دانشگاهی برای پیوند علم، سیاست‌گذاری عمومی و جامعه مدنی با الگوبرداری از اندیشکده دانشگاه فنی مونیخ (TUM).'
                : 'An academic research-to-action platform bridging scientific discovery, public governance, and civil society inspired by TUM Think Tank.'}
            </p>
          </div>

          {/* Col 2: Sections & Pages */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              {isFa ? 'بخش‌های اصلی وب‌سایت' : 'Core Portals'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    setActiveTab('labs');
                    setIsAdminOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  {isFa ? 'آزمایشگاه‌ها و حوزه‌های پژوهشی' : 'Research Labs & Focus Areas'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('articles');
                    setIsAdminOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  {isFa ? 'مقالات و گزارش‌های سیاستی' : 'Working Papers & Policy Briefs'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('experts');
                    setIsAdminOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  {isFa ? 'اعضای هیئت علمی و متخصصان' : 'Fellows & Expert Directory'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('publications');
                    setIsAdminOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  {isFa ? 'چاپ و انتشارات (کتاب و اسناد)' : 'Monographs & Press Publications'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('events');
                    setIsAdminOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  {isFa ? 'میزگردها و همایش‌ها' : 'Roundtables & Symposia'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Research Ethics & Open Access */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              {isFa ? 'اصول علمی و دسترسی آزاد' : 'Academic Charter & Ethics'}
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              {isFa
                ? 'کلیه مقالات، خلاصه‌های سیاستی و گزارش‌های این اندیشکده منطبق بر موازین دسترسی آزاد (Open Access) تحت مجوز Creative Commons منتشر می‌شوند.'
                : 'All policy briefs, working papers, and reports produced by the Think Tank are committed to Open Access principles under Creative Commons licensing.'}
            </p>
            <div className="flex items-center gap-2 text-xs text-blue-400">
              <span>{isFa ? 'پژوهش برای منافع عمومی' : 'Research in Public Interest'}</span>
            </div>
          </div>

          {/* Col 4: Contact & University Address */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              {isFa ? 'ارتباط با دبیرخانه' : 'Secretariat & Contact'}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span>{isFa ? config.addressFa : config.addressEn}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-500 shrink-0" />
                <a href={`mailto:${config.email}`} className="hover:text-white transition-colors">
                  {config.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-500 shrink-0" />
                <span dir="ltr">{config.phone}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            © {new Date().getFullYear()} {isFa ? config.nameFa : config.nameEn} · {isFa ? config.universityFa : config.universityEn}
          </p>
          <div className="flex items-center gap-4">
            <span className="text-slate-600">|</span>
            <span>{isFa ? 'الهام‌گرفته از ساختار TUM Think Tank' : 'Inspired by TUM Think Tank Model'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
