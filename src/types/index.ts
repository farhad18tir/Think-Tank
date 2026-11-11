export type Language = 'fa' | 'en';

export type PublicTab =
  | 'home'
  | 'labs'
  | 'articles'
  | 'experts'
  | 'publications'
  | 'events'
  | 'about';

export type AdminTab =
  | 'overview'
  | 'articles'
  | 'experts'
  | 'publications'
  | 'events'
  | 'labs'
  | 'settings';

export interface Article {
  id: string;
  title: string;
  titleEn: string;
  abstract: string;
  abstractEn: string;
  category: string;
  categoryEn: string;
  authors: string[];
  authorsEn: string[];
  date: string;
  doi: string;
  readTime: string;
  readTimeEn: string;
  pdfUrl?: string;
  featured: boolean;
  published: boolean;
  tags: string[];
  tagsEn: string[];
}

export interface Expert {
  id: string;
  name: string;
  nameEn: string;
  role: string;
  roleEn: string;
  department: string;
  departmentEn: string;
  researchAreas: string[];
  researchAreasEn: string[];
  bio: string;
  bioEn: string;
  imageUrl: string;
  email: string;
  publicationsCount: number;
}

export interface Lab {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  leadExpertName: string;
  leadExpertNameEn: string;
  initiatives: string[];
  initiativesEn: string[];
  imageUrl: string;
  focusArea: string;
  focusAreaEn: string;
}

export interface Publication {
  id: string;
  title: string;
  titleEn: string;
  type: 'Policy Brief' | 'Annual Report' | 'Book' | 'Whitepaper';
  typeFa: 'گزارش سیاستی' | 'گزارش سالانه' | 'کتاب و تک‌نگاشت' | 'سند راهبردی';
  authors: string[];
  authorsEn: string[];
  year: number;
  pages: number;
  isbnOrDoi?: string;
  summary: string;
  summaryEn: string;
  downloadUrl?: string;
}

export interface EventItem {
  id: string;
  title: string;
  titleEn: string;
  date: string;
  time: string;
  location: string;
  locationEn: string;
  type: 'Roundtable' | 'Symposium' | 'Public Lecture' | 'Workshop';
  typeFa: 'میزگرد سیاستی' | 'همایش علمی' | 'سخنرانی عمومی' | 'کارگاه تخصصی';
  speaker: string;
  speakerEn: string;
  description: string;
  descriptionEn: string;
  registrationOpen: boolean;
}

export interface ThinkTankConfig {
  nameFa: string;
  nameEn: string;
  universityFa: string;
  universityEn: string;
  taglineFa: string;
  taglineEn: string;
  missionFa: string;
  missionEn: string;
  email: string;
  phone: string;
  addressFa: string;
  addressEn: string;
}
