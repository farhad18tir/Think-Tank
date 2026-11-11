import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Article,
  Expert,
  Lab,
  Publication,
  EventItem,
  ThinkTankConfig,
  Language,
  PublicTab,
  AdminTab,
} from '../types';
import {
  initialConfig,
  initialLabs,
  initialArticles,
  initialExperts,
  initialPublications,
  initialEvents,
} from '../data/initialData';

interface ToastState {
  message: string;
  type: 'success' | 'info' | 'error';
}

interface ThinkTankContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  activeTab: PublicTab;
  setActiveTab: (tab: PublicTab) => void;
  selectedArticle: Article | null;
  setSelectedArticle: (art: Article | null) => void;

  // Admin state
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  adminSession: boolean;
  setAdminSession: (session: boolean) => void;
  activeAdminTab: AdminTab;
  setActiveAdminTab: (tab: AdminTab) => void;
  toast: ToastState | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;

  // Collections
  config: ThinkTankConfig;
  updateConfig: (cfg: Partial<ThinkTankConfig>) => void;

  articles: Article[];
  addArticle: (art: Omit<Article, 'id'>) => void;
  updateArticle: (id: string, art: Partial<Article>) => void;
  deleteArticle: (id: string) => void;

  experts: Expert[];
  addExpert: (exp: Omit<Expert, 'id'>) => void;
  updateExpert: (id: string, exp: Partial<Expert>) => void;
  deleteExpert: (id: string) => void;

  labs: Lab[];
  addLab: (lab: Omit<Lab, 'id'>) => void;
  updateLab: (id: string, lab: Partial<Lab>) => void;
  deleteLab: (id: string) => void;

  publications: Publication[];
  addPublication: (pub: Omit<Publication, 'id'>) => void;
  updatePublication: (id: string, pub: Partial<Publication>) => void;
  deletePublication: (id: string) => void;

  events: EventItem[];
  addEvent: (ev: Omit<EventItem, 'id'>) => void;
  updateEvent: (id: string, ev: Partial<EventItem>) => void;
  deleteEvent: (id: string) => void;

  resetToDefaults: () => void;
  exportJSON: () => void;
  importJSON: (jsonString: string) => boolean;
}

const ThinkTankContext = createContext<ThinkTankContextType | undefined>(undefined);

const STORAGE_KEY_PREFIX = 'tum_thinktank_';

export const ThinkTankProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}lang`);
    return (saved as Language) || 'fa';
  });

  const [activeTab, setActiveTab] = useState<PublicTab>('home');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // Admin
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [adminSession, setAdminSession] = useState<boolean>(() => {
    return localStorage.getItem(`${STORAGE_KEY_PREFIX}admin_session`) === 'true';
  });
  const [activeAdminTab, setActiveAdminTab] = useState<AdminTab>('overview');
  const [toast, setToast] = useState<ToastState | null>(null);

  // Data Collections
  const [config, setConfig] = useState<ThinkTankConfig>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}config`);
    return saved ? JSON.parse(saved) : initialConfig;
  });

  const [articles, setArticles] = useState<Article[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}articles`);
    return saved ? JSON.parse(saved) : initialArticles;
  });

  const [experts, setExperts] = useState<Expert[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}experts`);
    return saved ? JSON.parse(saved) : initialExperts;
  });

  const [labs, setLabs] = useState<Lab[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}labs`);
    return saved ? JSON.parse(saved) : initialLabs;
  });

  const [publications, setPublications] = useState<Publication[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}publications`);
    return saved ? JSON.parse(saved) : initialPublications;
  });

  const [events, setEvents] = useState<EventItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}events`);
    return saved ? JSON.parse(saved) : initialEvents;
  });

  // Sync document direction and language tag
  useEffect(() => {
    document.documentElement.dir = language === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    localStorage.setItem(`${STORAGE_KEY_PREFIX}lang`, language);
  }, [language]);

  // Sync session
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}admin_session`, adminSession ? 'true' : 'false');
  }, [adminSession]);

  // Sync collections
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}config`, JSON.stringify(config));
  }, [config]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}articles`, JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}experts`, JSON.stringify(experts));
  }, [experts]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}labs`, JSON.stringify(labs));
  }, [labs]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}publications`, JSON.stringify(publications));
  }, [publications]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}events`, JSON.stringify(events));
  }, [events]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === 'fa' ? 'en' : 'fa'));
  };

  // CRUD Operations
  const updateConfig = (cfg: Partial<ThinkTankConfig>) => {
    setConfig((prev) => ({ ...prev, ...cfg }));
    showToast(language === 'fa' ? 'تنظیمات اندیشکده با موفقیت ذخیره شد' : 'Settings updated successfully');
  };

  // Articles
  const addArticle = (art: Omit<Article, 'id'>) => {
    const newArt: Article = {
      ...art,
      id: `art-${Date.now().toString(36)}`,
    };
    setArticles((prev) => [newArt, ...prev]);
    showToast(language === 'fa' ? 'مقاله جدید با موفقیت منتشر شد' : 'Article published successfully');
  };

  const updateArticle = (id: string, updated: Partial<Article>) => {
    setArticles((prev) => prev.map((item) => (item.id === id ? { ...item, ...updated } : item)));
    showToast(language === 'fa' ? 'تغییرات مقاله ذخیره شد' : 'Article updated successfully');
  };

  const deleteArticle = (id: string) => {
    setArticles((prev) => prev.filter((item) => item.id !== id));
    showToast(language === 'fa' ? 'مقاله حذف شد' : 'Article deleted', 'info');
  };

  // Experts
  const addExpert = (exp: Omit<Expert, 'id'>) => {
    const newExp: Expert = {
      ...exp,
      id: `exp-${Date.now().toString(36)}`,
    };
    setExperts((prev) => [newExp, ...prev]);
    showToast(language === 'fa' ? 'متخصص جدید به فهرست اضافه شد' : 'Expert added successfully');
  };

  const updateExpert = (id: string, updated: Partial<Expert>) => {
    setExperts((prev) => prev.map((item) => (item.id === id ? { ...item, ...updated } : item)));
    showToast(language === 'fa' ? 'اطلاعات متخصص به‌روزرسانی شد' : 'Expert updated successfully');
  };

  const deleteExpert = (id: string) => {
    setExperts((prev) => prev.filter((item) => item.id !== id));
    showToast(language === 'fa' ? 'متخصص حذف شد' : 'Expert removed', 'info');
  };

  // Labs
  const addLab = (lab: Omit<Lab, 'id'>) => {
    const newLab: Lab = {
      ...lab,
      id: `lab-${Date.now().toString(36)}`,
    };
    setLabs((prev) => [...prev, newLab]);
    showToast(language === 'fa' ? 'آزمایشگاه جدید ایجاد شد' : 'Lab created successfully');
  };

  const updateLab = (id: string, updated: Partial<Lab>) => {
    setLabs((prev) => prev.map((item) => (item.id === id ? { ...item, ...updated } : item)));
    showToast(language === 'fa' ? 'آزمایشگاه به‌روزرسانی شد' : 'Lab updated successfully');
  };

  const deleteLab = (id: string) => {
    setLabs((prev) => prev.filter((item) => item.id !== id));
    showToast(language === 'fa' ? 'آزمایشگاه حذف شد' : 'Lab deleted', 'info');
  };

  // Publications
  const addPublication = (pub: Omit<Publication, 'id'>) => {
    const newPub: Publication = {
      ...pub,
      id: `pub-${Date.now().toString(36)}`,
    };
    setPublications((prev) => [newPub, ...prev]);
    showToast(language === 'fa' ? 'اثر چاپی/گزارش جدید ثبت شد' : 'Publication added successfully');
  };

  const updatePublication = (id: string, updated: Partial<Publication>) => {
    setPublications((prev) => prev.map((item) => (item.id === id ? { ...item, ...updated } : item)));
    showToast(language === 'fa' ? 'اطلاعات انتشارات به‌روز شد' : 'Publication updated successfully');
  };

  const deletePublication = (id: string) => {
    setPublications((prev) => prev.filter((item) => item.id !== id));
    showToast(language === 'fa' ? 'انتشارات حذف شد' : 'Publication removed', 'info');
  };

  // Events
  const addEvent = (ev: Omit<EventItem, 'id'>) => {
    const newEvent: EventItem = {
      ...ev,
      id: `ev-${Date.now().toString(36)}`,
    };
    setEvents((prev) => [newEvent, ...prev]);
    showToast(language === 'fa' ? 'رویداد جدید تعریف شد' : 'Event scheduled successfully');
  };

  const updateEvent = (id: string, updated: Partial<EventItem>) => {
    setEvents((prev) => prev.map((item) => (item.id === id ? { ...item, ...updated } : item)));
    showToast(language === 'fa' ? 'رویداد با موفقیت ویرایش شد' : 'Event updated successfully');
  };

  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((item) => item.id !== id));
    showToast(language === 'fa' ? 'رویداد لغو شد' : 'Event cancelled', 'info');
  };

  // Reset to initial demo
  const resetToDefaults = () => {
    setConfig(initialConfig);
    setArticles(initialArticles);
    setExperts(initialExperts);
    setLabs(initialLabs);
    setPublications(initialPublications);
    setEvents(initialEvents);
    showToast(
      language === 'fa' ? 'داده‌ها به حالت پیش‌فرض دانشگاه بازنشانی شد' : 'Restored official demo data',
      'info'
    );
  };

  // Export JSON
  const exportJSON = () => {
    const bundle = {
      config,
      articles,
      experts,
      labs,
      publications,
      events,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(bundle, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `thinktank-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast(language === 'fa' ? 'فایل پشتیبان JSON دانلود شد' : 'JSON backup exported successfully');
  };

  // Import JSON
  const importJSON = (jsonString: string): boolean => {
    try {
      const data = JSON.parse(jsonString);
      if (data.articles && data.experts && data.config) {
        setConfig(data.config);
        setArticles(data.articles);
        setExperts(data.experts);
        if (data.labs) setLabs(data.labs);
        if (data.publications) setPublications(data.publications);
        if (data.events) setEvents(data.events);
        showToast(language === 'fa' ? 'اطلاعات با موفقیت بارگذاری شد' : 'Data imported successfully');
        return true;
      }
      throw new Error('Invalid schema');
    } catch (err) {
      showToast(language === 'fa' ? 'خطا در بارگذاری فایل JSON' : 'Failed to import JSON file', 'error');
      return false;
    }
  };

  return (
    <ThinkTankContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        activeTab,
        setActiveTab,
        selectedArticle,
        setSelectedArticle,
        isAdminOpen,
        setIsAdminOpen,
        adminSession,
        setAdminSession,
        activeAdminTab,
        setActiveAdminTab,
        toast,
        showToast,
        config,
        updateConfig,
        articles,
        addArticle,
        updateArticle,
        deleteArticle,
        experts,
        addExpert,
        updateExpert,
        deleteExpert,
        labs,
        addLab,
        updateLab,
        deleteLab,
        publications,
        addPublication,
        updatePublication,
        deletePublication,
        events,
        addEvent,
        updateEvent,
        deleteEvent,
        resetToDefaults,
        exportJSON,
        importJSON,
      }}
    >
      {children}
    </ThinkTankContext.Provider>
  );
};

export const useThinkTank = () => {
  const ctx = useContext(ThinkTankContext);
  if (!ctx) throw new Error('useThinkTank must be used within a ThinkTankProvider');
  return ctx;
};
