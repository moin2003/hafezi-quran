import { Bookmark, UserSettings } from '../types';

const STORAGE_KEYS = {
  LAST_READ: 'hq_last_read_page',
  BOOKMARKS: 'hq_bookmarks',
  SETTINGS: 'hq_user_settings',
  DAILY_PAGES: 'hq_daily_read_pages',
};

export const defaultSettings: UserSettings = {
  readingMode: 'book',
  theme: 'paper',
  zoom: 100,
  autoHideBars: false,
  keepScreenAwake: false,
};

export const getLastReadPage = (): number => {
  try {
    const val = localStorage.getItem(STORAGE_KEYS.LAST_READ);
    if (val) {
      const page = parseInt(val, 10);
      if (page >= 1 && page <= 611) return page;
    }
  } catch (e) {
    console.error(e);
  }
  return 1;
};

export const setLastReadPage = (page: number): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.LAST_READ, page.toString());
    recordDailyRead(page);
  } catch (e) {
    console.error(e);
  }
};

export const getBookmarks = (): Bookmark[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error(e);
  }
  return [];
};

export const saveBookmarks = (bookmarks: Bookmark[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
  } catch (e) {
    console.error(e);
  }
};

export const getSettings = (): UserSettings => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (raw) return { ...defaultSettings, ...JSON.parse(raw) };
  } catch (e) {
    console.error(e);
  }
  return defaultSettings;
};

export const saveSettings = (settings: UserSettings): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.error(e);
  }
};

// Daily read tracking for Huffaz
export const recordDailyRead = (page: number): void => {
  try {
    const today = new Date().toISOString().slice(0, 10);
    const raw = localStorage.getItem(STORAGE_KEYS.DAILY_PAGES);
    const data: Record<string, number[]> = raw ? JSON.parse(raw) : {};
    
    if (!data[today]) {
      data[today] = [];
    }
    if (!data[today].includes(page)) {
      data[today].push(page);
    }
    localStorage.setItem(STORAGE_KEYS.DAILY_PAGES, JSON.stringify(data));
  } catch (e) {
    console.error(e);
  }
};

export const getTodayReadCount = (): number => {
  try {
    const today = new Date().toISOString().slice(0, 10);
    const raw = localStorage.getItem(STORAGE_KEYS.DAILY_PAGES);
    if (raw) {
      const data: Record<string, number[]> = JSON.parse(raw);
      return data[today] ? data[today].length : 0;
    }
  } catch (e) {
    console.error(e);
  }
  return 0;
};
