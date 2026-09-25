import { QuranMetadata, Para, Surah, Sajdah } from '../types';

export const toBanglaNumber = (num: number | string): string => {
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().replace(/\d/g, (d) => banglaDigits[parseInt(d, 10)]);
};

export interface PageInfo {
  page: number;
  para: Para | undefined;
  surahs: Surah[];
  sajdah: Sajdah | undefined;
  isRub: boolean;
  rubType?: string;
}

export const getPageInfo = (page: number, metadata: QuranMetadata | null): PageInfo => {
  if (!metadata) {
    return {
      page,
      para: undefined,
      surahs: [],
      sajdah: undefined,
      isRub: false,
    };
  }

  // Find active Para
  const para = metadata.paras.find((p) => page >= p.start_page && page <= p.end_page);

  // Find active Surah(s) that appear on or before this page
  // A page can start a surah or continue a previous one
  const surahs = metadata.surahs.filter((s, idx) => {
    const nextSurah = metadata.surahs[idx + 1];
    const surahEndPage = nextSurah ? nextSurah.page : 611;
    return page >= s.page && page <= surahEndPage;
  });

  // Check Sajdah on this page
  const sajdah = metadata.sajdahs.find((s) => s.page === page);

  // Check Rub / Quarter of Juz
  let isRub = false;
  let rubType = undefined;
  if (para) {
    const relativePage = page - para.start_page + 1;
    if (relativePage === 5) {
      isRub = true;
      rubType = 'রুব’ (১/৪)';
    } else if (relativePage === 10) {
      isRub = true;
      rubType = 'নিসফ (১/২)';
    } else if (relativePage === 15) {
      isRub = true;
      rubType = 'সালাসা (৩/৪)';
    }
  }

  return {
    page,
    para,
    surahs,
    sajdah,
    isRub,
    rubType,
  };
};

export const getParaEnglishName = (num: number): string => {
  const paraNamesEn: Record<number, string> = {
    1: 'Alif Lam Meem',
    2: 'Sayaqool',
    3: 'Tilkal Rusul',
    4: 'Lan Tanaloo',
    5: 'Wal Mohsanat',
    6: 'La Yuhibbullah',
    7: 'Wa Iza Samiu',
    8: 'Wa Lau Annana',
    9: 'Qalal Malao',
    10: 'Wa A\'lamu',
    11: 'Yatazeroon',
    12: 'Wa Mamin Da\'abat',
    13: 'Wa Ma Ubrioo',
    14: 'Rubama',
    15: 'Subhanallazi',
    16: 'Qal Alam',
    17: 'Iqtaraba',
    18: 'Qadd Aflaha',
    19: 'Wa Qalallazina',
    20: 'A\'man Khalaq',
    21: 'Utlu Ma Oohiya',
    22: 'Wa Manyaqnut',
    23: 'Wa Mali',
    24: 'Faman Azlam',
    25: 'Elahe Yuruddo',
    26: 'Ha\'a Meem',
    27: 'Qala Fama Khatbukum',
    28: 'Qadd Sami Allah',
    29: 'Tabarakallazi',
    30: 'Amma Yatasa\'aloon',
  };
  return paraNamesEn[num] || `Para ${num}`;
};

export const formatPageNumber = (num: number | string, lang: 'bn' | 'en' = 'en'): string => {
  return lang === 'bn' ? toBanglaNumber(num) : num.toString();
};
