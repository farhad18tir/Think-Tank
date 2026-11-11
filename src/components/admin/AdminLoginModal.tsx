import React, { useState } from 'react';
import { useThinkTank } from '../../context/ThinkTankContext';
import { Lock, KeyRound, ShieldAlert, X } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export const AdminLoginModal: React.FC<Props> = ({ onClose }) => {
  const { language, setAdminSession, showToast } = useThinkTank();
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);
  const isFa = language === 'fa';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'admin123') {
      setAdminSession(true);
      showToast(
        isFa ? 'ورود به پنل مدیریت با موفقیت انجام شد' : 'Logged into Admin CMS successfully',
        'success'
      );
      onClose();
    } else {
      setError(true);
      showToast(
        isFa ? 'رمز عبور نادرست است (رمز پیش‌فرض: admin123)' : 'Incorrect passcode (default: admin123)',
        'error'
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
      <div className="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
            <Lock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>{isFa ? 'ورود به سامانه مدیریت محتوا' : 'Admin CMS Authentication'}</span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          {isFa
            ? 'برای دسترسی به پنل مدیریت مقالات، متخصصان و انتشارات، لطفاً رمز عبور مدیریت را وارد کنید.'
            : 'Enter the administrative passcode to access the Think Tank content management system.'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              {isFa ? 'رمز عبور مدیریت' : 'Management Passcode'}
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-400 absolute top-2.5 start-3 pointer-events-none" />
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  if (error) setError(false);
                }}
                placeholder="••••••••"
                className="w-full ps-9 pe-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900 dark:text-white"
                dir="ltr"
                autoFocus
              />
            </div>
            {error && (
              <p className="text-[11px] text-red-500 mt-1.5">
                {isFa ? 'رمز عبور نادرست است' : 'Invalid passcode'}
              </p>
            )}
          </div>

          <div className="p-2.5 bg-blue-50 dark:bg-blue-950/40 rounded-lg border border-blue-100 dark:border-blue-900/40 text-[11px] text-blue-900 dark:text-blue-300 flex items-center justify-between">
            <span>{isFa ? 'رمز عبور پیش‌فرض:' : 'Default Demo Passcode:'}</span>
            <code
              onClick={() => setPasscode('admin123')}
              className="px-2 py-0.5 bg-white dark:bg-slate-800 rounded font-mono font-bold cursor-pointer hover:bg-blue-100 dark:hover:bg-slate-700 border border-blue-200 dark:border-blue-800"
              title={isFa ? 'کلیک برای پر کردن خودکار' : 'Click to autofill'}
            >
              admin123
            </code>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
            >
              {isFa ? 'انصراف' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 rounded-md transition-colors"
            >
              {isFa ? 'تأیید و ورود' : 'Unlock Portal'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
