import React, { useState } from 'react';
import { useThinkTank } from '../../context/ThinkTankContext';
import { ShieldCheck, Target, Award, Send, Check } from 'lucide-react';

export const AboutView: React.FC = () => {
  const { language, config, showToast } = useThinkTank();
  const [formSent, setFormSent] = useState(false);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const isFa = language === 'fa';

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName.trim() || !inquiryEmail.trim() || !inquiryMessage.trim()) {
      showToast(
        isFa ? 'لطفاً تمامی فیلدهای فرم را تکمیل فرمایید' : 'Please fill all form fields',
        'error'
      );
      return;
    }
    setFormSent(true);
    showToast(
      isFa
        ? 'پیام شما به دبیرخانه اندیشکده ارسال گردید و در اسرع وقت پاسخ داده خواهد شد'
        : 'Inquiry submitted successfully to the think tank secretariat',
      'success'
    );
    setInquiryName('');
    setInquiryEmail('');
    setInquiryMessage('');
    setTimeout(() => setFormSent(false), 5000);
  };

  return (
    <div className="py-12 lg:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="text-xs font-semibold text-blue-900 dark:text-blue-400 uppercase tracking-wider">
          {isFa ? 'رسالت و جایگاه نهادی' : 'Institutional Mission & Origin'}
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          {isFa ? 'درباره اندیشکده فناوری و جامعه' : 'About the Think Tank'}
        </h2>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          {isFa ? config.taglineFa : config.taglineEn}
        </p>
      </div>

      {/* Origin & Methodology Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-900 dark:text-blue-400 flex items-center justify-center">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {isFa ? 'رویکرد پژوهش به اقدام (Research-to-Action)' : 'Research-to-Action Mandate'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {isFa
              ? 'برخلاف اتاق‌های فکر سنتی که صرفاً به تولید گزارش‌های کتابخانه‌ای می‌پردازند، مأموریت ما طراحی پروتوتایپ‌های سیاستی، استانداردهای فنی و ابزارهای منبع‌باز است که مستقیماً در نهادهای قانون‌گذار و اجرایی قابل پیاده‌سازی باشند.'
              : 'Beyond traditional passive research, we design operational policy prototypes, regulatory testbeds, and open-source public tools directly adoptable by parliaments and civic institutions.'}
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-900 dark:text-blue-400 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {isFa ? 'استقلال دانشگاهی و بی‌طرفی علمی' : 'Academic Rigor & Independence'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {isFa
              ? 'تمامی خروجی‌های ما بر مبنای داده‌های تجربی مستند و بدون وابستگی تجاری به غول‌های فناوری یا احزاب سیاسی تدوین می‌شوند. منشور اخلاقی ما پایبندی به منافع عمومی و شفافیت داده‌ها را تضمین می‌کند.'
              : 'Our outputs remain strictly independent from proprietary tech lobbying and partisan bias, anchored by peer-reviewed evidence, public data commons, and ethical charters.'}
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-900 dark:text-blue-400 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {isFa ? 'هم‌افزایی چندرشته‌ای' : 'Radical Interdisciplinarity'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {isFa
              ? 'ما مهندسان هوش مصنوعی، فیزیکدانان کوانتوم، حقوقدانان، جامعه‌شناسان و معماران شهری را گرد هم آورده‌ایم تا هیچ بعد انسانی در تحولات فناورانه نادیده گرفته نشود.'
              : 'Uniting machine learning scientists, quantum physicists, constitutional scholars, and urban sociologists to ensure technological shifts serve democratic well-being.'}
          </p>
        </div>
      </div>

      {/* University Governance & Advisory Council */}
      <div className="p-8 bg-slate-100 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          {isFa ? 'ساختار حکمرانی و شورای سیاست‌گذاری دانشگاه' : 'University Governance & Advisory Board'}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {isFa
            ? 'اندیشکده با هدایت شورای عالی متشکل از رؤسای دانشکده‌های مهندسی، علوم پایه، حقوق و مدیریت دانشگاه صنعتی و با نظارت کمیته اخلاق در پژوهش اداره می‌گردد. همچنین نشست‌های فصلی با هیئت مشاوران بین‌المللی برای تطبیق استانداردهای جهانی به طور منظم برگزار می‌شود.'
            : 'Guided by a Joint Academic Senate comprising deans of engineering, natural sciences, law, and public governance alongside regular consultations with global academic advisory networks.'}
        </p>
      </div>

      {/* Collaboration / Contact Inquiry Form */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 space-y-6">
        <div className="max-w-2xl space-y-2">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            {isFa ? 'ارتباط و همکاری با اندیشکده' : 'Collaborate or Inquire'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            {isFa
              ? 'اگر نماینده نهادی دولتی، پژوهشگر دانشگاهی، یا فعال مدنی هستید و مایل به همکاری در طرح‌های پژوهشی ما می‌باشید، پیام خود را ثبت فرمایید.'
              : 'Whether you represent a parliamentary committee, research lab, or civic organization seeking policy advisory or partnership, reach out below.'}
          </p>
        </div>

        <form onSubmit={handleInquirySubmit} className="space-y-4 max-w-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {isFa ? 'نام و سمت دانشگاهی/سازمانی' : 'Name & Affiliation'}
              </label>
              <input
                type="text"
                required
                value={inquiryName}
                onChange={(e) => setInquiryName(e.target.value)}
                placeholder={isFa ? 'مثال: دکتر رادمهر - دانشگاه تهران' : 'e.g. Dr. Radmehr, Faculty'}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {isFa ? 'پست الکترونیکی' : 'Email Address'}
              </label>
              <input
                type="email"
                required
                value={inquiryEmail}
                onChange={(e) => setInquiryEmail(e.target.value)}
                placeholder="contact@institution.org"
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900 dark:text-white"
                dir="ltr"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {isFa ? 'موضوع و شرح پیام یا پروپوزال همکاری' : 'Message or Proposal Summary'}
            </label>
            <textarea
              required
              rows={4}
              value={inquiryMessage}
              onChange={(e) => setInquiryMessage(e.target.value)}
              placeholder={
                isFa
                  ? 'لطفاً زمینه همکاری مورد نظر، آزمایشگاه مرتبط یا درخواست مشاوره سیاستی را شرح دهید...'
                  : 'Describe your collaboration inquiry or policy advisory request...'
              }
              className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900 dark:text-white"
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 rounded-lg shadow-xs transition-colors"
          >
            {formSent ? <Check className="w-4 h-4" /> : <Send className="w-4 h-4" />}
            <span>{isFa ? 'ارسال درخواست به دبیرخانه' : 'Submit Inquiry'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
