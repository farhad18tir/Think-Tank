import React, { useState } from 'react';
import { useThinkTank } from '../../context/ThinkTankContext';
import { EventItem } from '../../types';
import { Calendar, Clock, MapPin, User, Check, X } from 'lucide-react';

export const EventsView: React.FC = () => {
  const { language, events, showToast } = useThinkTank();
  const [registeringEvent, setRegisteringEvent] = useState<EventItem | null>(null);
  const [attendeeName, setAttendeeName] = useState('');
  const [attendeeEmail, setAttendeeEmail] = useState('');
  const isFa = language === 'fa';

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!attendeeName.trim() || !attendeeEmail.trim()) {
      showToast(
        isFa ? 'لطفاً نام و ایمیل خود را وارد نمایید' : 'Please provide your name and email',
        'error'
      );
      return;
    }
    showToast(
      isFa
        ? `ثبت‌نام شما برای «${isFa ? registeringEvent?.title : registeringEvent?.titleEn}» با موفقیت تأیید شد`
        : `Registration confirmed for "${isFa ? registeringEvent?.title : registeringEvent?.titleEn}"`,
      'success'
    );
    setRegisteringEvent(null);
    setAttendeeName('');
    setAttendeeEmail('');
  };

  return (
    <div className="py-12 lg:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Registration Modal */}
      {registeringEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {isFa ? 'ثبت‌نام در نشست تخصصی' : 'Register for Academic Event'}
              </h3>
              <button
                onClick={() => setRegisteringEvent(null)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300">
              {isFa ? registeringEvent.title : registeringEvent.titleEn}
            </p>

            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {isFa ? 'نام و نام خانوادگی' : 'Full Name'}
                </label>
                <input
                  type="text"
                  required
                  value={attendeeName}
                  onChange={(e) => setAttendeeName(e.target.value)}
                  placeholder={isFa ? 'مثال: دکتر علی رضایی' : 'e.g. Dr. John Doe'}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {isFa ? 'پست الکترونیکی سازمانی / دانشگاهی' : 'Institutional Email'}
                </label>
                <input
                  type="email"
                  required
                  value={attendeeEmail}
                  onChange={(e) => setAttendeeEmail(e.target.value)}
                  placeholder="name@university.ac.ir"
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900 dark:text-white"
                  dir="ltr"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setRegisteringEvent(null)}
                  className="px-3 py-1.5 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
                >
                  {isFa ? 'انصراف' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 rounded-md transition-colors"
                >
                  {isFa ? 'تأیید و دریافت لینک ورود' : 'Confirm Registration'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="text-xs font-semibold text-blue-900 dark:text-blue-400 uppercase tracking-wider">
          {isFa ? 'گفتگوهای سیاستی و کارگاه‌ها' : 'Roundtables, Debates & Symposia'}
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          {isFa ? 'رویدادها و نشست‌های اندیشکده' : 'Upcoming & Recent Events'}
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          {isFa
            ? 'میزگردهای تخصصی در اتاق‌های بسته و عمومی با حضور نمایندگان مجلس، دولتمردان، پژوهشگران ارشد و فعالان جامعه مدنی برای تضارب آرا و اجماع‌سازی.'
            : 'Multi-stakeholder policy roundtables, technical workshops, and public symposia uniting legislators, scholars, and civil society actors.'}
        </p>
      </div>

      {/* Events List */}
      <div className="grid grid-cols-1 gap-6">
        {events.map((ev) => {
          const title = isFa ? ev.title : ev.titleEn;
          const location = isFa ? ev.location : ev.locationEn;
          const speaker = isFa ? ev.speaker : ev.speakerEn;
          const desc = isFa ? ev.description : ev.descriptionEn;
          const typeLabel = isFa ? ev.typeFa : ev.type;

          return (
            <div
              key={ev.id}
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all p-6 sm:p-7 space-y-4"
            >
              {/* Unboxed Metadata (Zero-Pill Discipline) */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-semibold text-blue-900 dark:text-blue-400">{typeLabel}</span>
                <span aria-hidden="true">·</span>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span className="tabular-nums">{ev.date}</span>
                </div>
                <span aria-hidden="true">·</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span className="tabular-nums">{ev.time}</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
                {title}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {desc}
              </p>

              {/* Location & Speaker Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{location}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <User className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>
                    <strong className="text-slate-900 dark:text-slate-200">
                      {isFa ? 'سخنران/دبیر:' : 'Keynote / Chair:'}
                    </strong>{' '}
                    {speaker}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-3 flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {ev.registrationOpen
                    ? isFa
                      ? 'ظرفیت ثبت‌نام باز است'
                      : 'Open for registration'
                    : isFa
                    ? 'ظرفیت تکمیل شده است'
                    : 'Registration closed'}
                </span>

                {ev.registrationOpen && (
                  <button
                    onClick={() => setRegisteringEvent(ev)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 rounded-lg shadow-xs transition-colors"
                  >
                    <span>{isFa ? 'ثبت‌نام رایگان در نشست' : 'Register for Session'}</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
