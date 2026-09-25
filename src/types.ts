export interface Para {
  number: number;
  name_ar: string;
  name_bn: string;
  start_page: number;
  end_page: number;
  start_ayah: string;
  rub_pages: number[];
}

export interface Surah {
  number: number;
  name_bn: string;
  name_ar: string;
  name_en: string;
  page: number;
  total_ayahs: number;
  type: string;
  juz: number;
}

export interface Manzil {
  number: number;
  name: string;
  surah_range: string;
  page_start: number;
  page_end: number;
}

export interface Musabbahat {
  surah_number: number;
  name_bn: string;
  name_ar: string;
  start_word: string;
  page: number;
  total_ayahs: number;
}

export interface Sajdah {
  number: number;
  surah_number: number;
  surah_name_bn: string;
  surah_name_ar: string;
  ayah: number;
  page: number;
  juz: number;
}

export interface QuranMetadata {
  total_pages: number;
  paras: Para[];
  surahs: Surah[];
  manzils: Manzil[];
  musabbahat: Musabbahat[];
  sajdahs: Sajdah[];
}

export type BookmarkType = 'sabaq' | 'amukhta' | 'dawr' | 'general';

export interface Bookmark {
  id: string;
  page: number;
  title: string;
  note?: string;
  type: BookmarkType;
  createdAt: number;
}

export type ReadingMode = 'book' | 'scroll' | 'single';
export type ThemeMode = 'paper' | 'sepia' | 'dark';

export interface UserSettings {
  readingMode: ReadingMode;
  theme: ThemeMode;
  zoom: number;
  autoHideBars: boolean;
  keepScreenAwake: boolean;
  selectedReciter?: string;
  playbackSpeed?: number;
}

export interface Reciter {
  id: string;
  name_en: string;
  name_bn: string;
  name_ar: string;
  style?: string;
  description_bn: string;
  description_en: string;
}

export type RepeatMode = 'none' | 'repeat-ayah' | 'repeat-page' | 'continuous';

export interface AyahAudioData {
  number: number;
  numberInSurah: number;
  juz: number;
  page: number;
  surahNumber: number;
  surahName_ar: string;
  surahName_en: string;
  surahName_bn: string;
  audioUrl: string;
  text_ar?: string;
}
