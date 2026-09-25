import json

# Para (Juz) Metadata (1 to 30) for 15-line Hafezi Quran
# Standard 15-line format:
# Para 1: Page 1-21 (Al-Fatiha on p.1, Baqarah p.2, ends on p.21)
# Para 2: Page 22-41 (Starts with Sayaqool on p.22)
# Para 3: Page 42-61 (Starts with Tilkar Rusul on p.42)
# Para 4: Page 62-81 (Starts with Lan Tanalu on p.62)
# Para 5: Page 82-101 (Starts with Wal Muhsanat on p.82)
# Para 6: Page 102-121 (Starts with La Yuhibbullah on p.102)
# Para 7: Page 122-141 (Starts with Wa Iza Sami'u on p.122)
# Para 8: Page 142-161 (Starts with Wa Lau Annana on p.142)
# Para 9: Page 162-181 (Starts with Qalal Mala'u on p.162)
# Para 10: Page 182-201 (Starts with Wa A'lamu on p.182)
# Para 11: Page 202-221 (Starts with Ya'tazeruna on p.202)
# Para 12: Page 222-241 (Starts with Wa Ma Min Daabbatin on p.222)
# Para 13: Page 242-261 (Starts with Wa Ma Ubarri'u on p.242)
# Para 14: Page 262-281 (Starts with Rubama on p.262)
# Para 15: Page 282-301 (Starts with Subhanallazi on p.282)
# Para 16: Page 302-321 (Starts with Qala Alam on p.302)
# Para 17: Page 322-341 (Starts with Iqtaraba Lin Nasi on p.322)
# Para 18: Page 342-361 (Starts with Qad Aflaha on p.342)
# Para 19: Page 362-381 (Starts with Wa Qalal Lazina on p.362)
# Para 20: Page 382-401 (Starts with Am Man Khalaqa on p.382)
# Para 21: Page 402-421 (Starts with Utlu Ma Oohiya on p.402)
# Para 22: Page 422-441 (Starts with Wa Man Yaqnut on p.422)
# Para 23: Page 442-461 (Starts with Wa Maliya on p.442)
# Para 24: Page 462-481 (Starts with Faman Azlamu on p.462)
# Para 25: Page 482-501 (Starts with Ilaihi Yuraddu on p.482)
# Para 26: Page 502-521 (Starts with Ha-Meem on p.502)
# Para 27: Page 522-541 (Starts with Qala Fama Khatbukum on p.522)
# Para 28: Page 542-561 (Starts with Qad Sami' Allahu on p.542)
# Para 29: Page 562-581 (Starts with Tabarakallazi on p.562)
# Para 30: Page 582-610 (Starts with 'Amma Yatasa'alun on p.582, ends at p.610. 611 is Dua)

PARAS = [
    {"number": 1, "name_ar": "الم", "name_bn": "আলিফ লাম মীম", "start_page": 1, "end_page": 21, "start_ayah": "আল-ফাতিহা ১", "rub_pages": [6, 11, 16]},
    {"number": 2, "name_ar": "سَيَقُولُ", "name_bn": "সায়াকুল", "start_page": 22, "end_page": 41, "start_ayah": "আল-বাকারাহ ১৪২", "rub_pages": [27, 32, 37]},
    {"number": 3, "name_ar": "تِلْكَ الرُّسُلُ", "name_bn": "তিলকার রুসুল", "start_page": 42, "end_page": 61, "start_ayah": "আল-বাকারাহ ২৫৩", "rub_pages": [47, 52, 57]},
    {"number": 4, "name_ar": "لَنْ تَنَالُوا", "name_bn": "লান তানালু", "start_page": 62, "end_page": 81, "start_ayah": "আলে-ইমরান ৯২", "rub_pages": [67, 72, 77]},
    {"number": 5, "name_ar": "وَالْمُحْصَنَاتُ", "name_bn": "ওয়াল মুহসানাত", "start_page": 82, "end_page": 101, "start_ayah": "আন-নিসা ২৪", "rub_pages": [87, 92, 97]},
    {"number": 6, "name_ar": "لَا يُحِبُّ اللَّهُ", "name_bn": "লা ইউহিব্বুল্লাহ", "start_page": 102, "end_page": 121, "start_ayah": "আন-নিসা ১৪৮", "rub_pages": [107, 112, 117]},
    {"number": 7, "name_ar": "وَإِذَا سَمِعُوا", "name_bn": "ওয়া ইযা সামিউ", "start_page": 122, "end_page": 141, "start_ayah": "আল-মায়িদাহ ৮২", "rub_pages": [127, 132, 137]},
    {"number": 8, "name_ar": "وَلَوْ أَنَّنَا", "name_bn": "ওয়া লাও আন্নানা", "start_page": 142, "end_page": 161, "start_ayah": "আল-আনআম ১১১", "rub_pages": [147, 152, 157]},
    {"number": 9, "name_ar": "قَالَ الْمَلَأُ", "name_bn": "ক্বলাল মালাউ", "start_page": 162, "end_page": 181, "start_ayah": "আল-আরাফ ৮৮", "rub_pages": [167, 172, 177]},
    {"number": 10, "name_ar": "وَاعْلَمُوا", "name_bn": "ওয়া'লামু", "start_page": 182, "end_page": 201, "start_ayah": "আল-আনফাল ৪১", "rub_pages": [187, 192, 197]},
    {"number": 11, "name_ar": "يَعْتَذِرُونَ", "name_bn": "ইয়া'তাযিরুনা", "start_page": 202, "end_page": 221, "start_ayah": "আত-তাওবাহ ৯৩", "rub_pages": [207, 212, 217]},
    {"number": 12, "name_ar": "وَمَا مِنْ دَابَّةٍ", "name_bn": "ওয়া মা মিন দাব্বাহ", "start_page": 222, "end_page": 241, "start_ayah": "হূদ ৬", "rub_pages": [227, 232, 237]},
    {"number": 13, "name_ar": "وَمَا أُبَرِّئُ", "name_bn": "ওয়া মা উবাররিউ", "start_page": 242, "end_page": 261, "start_ayah": "ইউসুফ ৫৩", "rub_pages": [247, 252, 257]},
    {"number": 14, "name_ar": "رُبَمَا", "name_bn": "রুবামা", "start_page": 262, "end_page": 281, "start_ayah": "আল-হিজর ১", "rub_pages": [267, 272, 277]},
    {"number": 15, "name_ar": "سُبْحَانَ الَّذِي", "name_bn": "সুবহানাল্লাযী", "start_page": 282, "end_page": 301, "start_ayah": "বনী ইসরাঈল ১", "rub_pages": [287, 292, 297]},
    {"number": 16, "name_ar": "قَالَ أَلَمْ", "name_bn": "ক্বলা আলাম", "start_page": 302, "end_page": 321, "start_ayah": "আল-কাহফ ৭৪", "rub_pages": [307, 312, 317]},
    {"number": 17, "name_ar": "اقْتَرَبَ لِلنَّاسِ", "name_bn": "ইক্বতারাবা লিন্নাস", "start_page": 322, "end_page": 341, "start_ayah": "আল-আম্বিয়া ১", "rub_pages": [327, 332, 337]},
    {"number": 18, "name_ar": "قَدْ أَفْلَحَ", "name_bn": "ক্বাদ আফলাহা", "start_page": 342, "end_page": 361, "start_ayah": "আল-মুমিনুন ১", "rub_pages": [347, 352, 357]},
    {"number": 19, "name_ar": "وَقَالَ الَّذِينَ", "name_bn": "ওয়া ক্বালাল্লাযীনা", "start_page": 362, "end_page": 381, "start_ayah": "আল-ফুরকান ২১", "rub_pages": [367, 372, 377]},
    {"number": 20, "name_ar": "أَمَّنْ خَلَقَ", "name_bn": "আম্মান খালাক্বা", "start_page": 382, "end_page": 401, "start_ayah": "আন-নামল ৬০", "rub_pages": [387, 392, 397]},
    {"number": 21, "name_ar": "اتْلُ مَا أُوحِيَ", "name_bn": "উতলু মা উহিয়া", "start_page": 402, "end_page": 421, "start_ayah": "আল-আনকাবুত ৪৫", "rub_pages": [407, 412, 417]},
    {"number": 22, "name_ar": "وَمَنْ يَقْنُتْ", "name_bn": "ওয়া মান ইয়াক্বনুত", "start_page": 422, "end_page": 441, "start_ayah": "আল-আহযাব ৩১", "rub_pages": [427, 432, 437]},
    {"number": 23, "name_ar": "وَمَا لِيَ", "name_bn": "ওয়া মালিয়া", "start_page": 442, "end_page": 461, "start_ayah": "ইয়াসীন ২২", "rub_pages": [447, 452, 457]},
    {"number": 24, "name_ar": "فَمَنْ أَظْلَمُ", "name_bn": "ফামান আযলামু", "start_page": 462, "end_page": 481, "start_ayah": "আয-যুমার ৩২", "rub_pages": [467, 472, 477]},
    {"number": 25, "name_ar": "إِلَيْهِ يُرَدُّ", "name_bn": "ইলাইহি ইউরাদ্দু", "start_page": 482, "end_page": 501, "start_ayah": "ফুসসিলাত ৪৭", "rub_pages": [487, 492, 497]},
    {"number": 26, "name_ar": "حم", "name_bn": "হা-মীম", "start_page": 502, "end_page": 521, "start_ayah": "আল-আহকাফ ১", "rub_pages": [507, 512, 517]},
    {"number": 27, "name_ar": "قَالَ فَمَا خَطْبُكُمْ", "name_bn": "ক্বলা ফামা খাতবুকুম", "start_page": 522, "end_page": 541, "start_ayah": "আয-যারিয়াত ৩১", "rub_pages": [527, 532, 537]},
    {"number": 28, "name_ar": "قَدْ سَمِعَ اللَّهُ", "name_bn": "ক্বাদ সামিয়াল্লাহু", "start_page": 542, "end_page": 561, "start_ayah": "আল-মুজাদালাহ ১", "rub_pages": [547, 552, 557]},
    {"number": 29, "name_ar": "تَبَارَكَ الَّذِي", "name_bn": "তাবারাকাল্লাযী", "start_page": 562, "end_page": 581, "start_ayah": "আল-মুলক ১", "rub_pages": [567, 572, 577]},
    {"number": 30, "name_ar": "عَمَّ يَتَسَاءَلُونَ", "name_bn": "আম্মা ইয়াতাসাআলুন", "start_page": 582, "end_page": 610, "start_ayah": "আন-নাবা ১", "rub_pages": [587, 593, 600]}
]

# 7 Manzils
MANZILS = [
    {"number": 1, "name": "মঞ্জিল ১", "surah_range": "আল-ফাতিহা (১) হতে আন-নিসা (৪)", "page_start": 1, "page_end": 101},
    {"number": 2, "name": "মঞ্জিল ২", "surah_range": "আল-মায়িদাহ (৫) হতে আত-তাওবাহ (৯)", "page_start": 102, "page_end": 201},
    {"number": 3, "name": "মঞ্জিল ৩", "surah_range": "ইউনুস (১০) হতে আন-নাহল (১৬)", "page_start": 202, "page_end": 281},
    {"number": 4, "name": "মঞ্জিল ৪", "surah_range": "বনী ইসরাঈল (১৭) হতে আল-ফুরকান (২৫)", "page_start": 282, "page_end": 381},
    {"number": 5, "name": "মঞ্জিল ৫", "surah_range": "আশ-শুআরা (২৬) হতে ইয়াসীন (৩৬)", "page_start": 382, "page_end": 461},
    {"number": 6, "name": "মঞ্জিল ৬", "surah_range": "আস-সাফফাত (৩৭) হতে আল-হুজুরাত (৪৯)", "page_start": 462, "page_end": 521},
    {"number": 7, "name": "মঞ্জিল ৭", "surah_range": "ক্বাফ (৫০) হতে আন-নাস (১১৪)", "page_start": 522, "page_end": 610}
]

# Musabbahat Surahs (মুসাব্বাহাত - যে সকল সূরা তাসবীহ/মহিমা ঘোষণা দিয়ে শুরু হয়েছে)
MUSABBAHAT = [
    {"surah_number": 17, "name_bn": "বনী ইসরাঈল (আল-ইসরা)", "name_ar": "الإسراء", "start_word": "سُبْحَانَ الَّذِي أَسْرَىٰ", "page": 282, "total_ayahs": 111},
    {"surah_number": 57, "name_bn": "আল-হাদীদ", "name_ar": "الحديد", "start_word": "سَبَّحَ لِلَّهِ مَا فِي السَّمَاوَاتِ", "page": 537, "total_ayahs": 29},
    {"surah_number": 59, "name_bn": "আল-হাশর", "name_ar": "الحشر", "start_word": "سَبَّحَ لِلَّهِ مَا فِي السَّمَاوَاتِ", "page": 545, "total_ayahs": 24},
    {"surah_number": 61, "name_bn": "আস-সফ", "name_ar": "الصف", "start_word": "سَبَّحَ لِلَّهِ مَا فِي السَّمَاوَاتِ", "page": 551, "total_ayahs": 14},
    {"surah_number": 62, "name_bn": "আল-জুমুআহ", "name_ar": "الجمعة", "start_word": "يُسَبِّحُ لِلَّهِ مَا فِي السَّمَاوَاتِ", "page": 553, "total_ayahs": 11},
    {"surah_number": 64, "name_bn": "আত-তাগাবুন", "name_ar": "التغابن", "start_word": "يُسَبِّحُ لِلَّهِ مَا فِي السَّمَاوَاتِ", "page": 556, "total_ayahs": 18},
    {"surah_number": 87, "name_bn": "আল-আ'লা", "name_ar": "الأعلى", "start_word": "سَبِّحِ اسْمَ رَبِّكَ الْأَعْلَى", "page": 591, "total_ayahs": 19}
]

# 14 Sajdah Ayahs (সিজদাহ আয়াতসমূহ)
SAJDAHS = [
    {"number": 1, "surah_number": 7, "surah_name_bn": "আল-আ'রাফ", "surah_name_ar": "الأعراف", "ayah": 206, "page": 175, "juz": 9},
    {"number": 2, "surah_number": 13, "surah_name_bn": "আর-রাদ", "surah_name_ar": "الرعد", "ayah": 15, "page": 250, "juz": 13},
    {"number": 3, "surah_number": 16, "surah_name_bn": "আন-নাহল", "surah_name_ar": "النحل", "ayah": 50, "page": 271, "juz": 14},
    {"number": 4, "surah_number": 17, "surah_name_bn": "বনী ইসরাঈল", "surah_name_ar": "الإسراء", "ayah": 109, "page": 293, "juz": 15},
    {"number": 5, "surah_number": 19, "surah_name_bn": "মারইয়াম", "surah_name_ar": "مريم", "ayah": 58, "page": 308, "juz": 16},
    {"number": 6, "surah_number": 22, "surah_name_bn": "আল-হজ্জ (১ম)", "surah_name_ar": "الحج", "ayah": 18, "page": 333, "juz": 17},
    {"number": 7, "surah_number": 22, "surah_name_bn": "আল-হজ্জ (২য়)", "surah_name_ar": "الحج", "ayah": 77, "page": 340, "juz": 17},
    {"number": 8, "surah_number": 25, "surah_name_bn": "আল-ফুরকান", "surah_name_ar": "الفرقان", "ayah": 60, "page": 364, "juz": 19},
    {"number": 9, "surah_number": 27, "surah_name_bn": "আন-নামল", "surah_name_ar": "النمل", "ayah": 26, "page": 378, "juz": 19},
    {"number": 10, "surah_number": 32, "surah_name_bn": "আস-সাজদাহ", "surah_name_ar": "السجدة", "ayah": 15, "page": 415, "juz": 21},
    {"number": 11, "surah_number": 38, "surah_name_bn": "ছোয়াদ", "surah_name_ar": "ص", "ayah": 24, "page": 454, "juz": 23},
    {"number": 12, "surah_number": 41, "surah_name_bn": "ফুসসিলাত (হা-মীম সাজদাহ)", "surah_name_ar": "فصلت", "ayah": 38, "page": 480, "juz": 24},
    {"number": 13, "surah_number": 53, "surah_name_bn": "আন-নাজম", "surah_name_ar": "النجم", "ayah": 62, "page": 527, "juz": 27},
    {"number": 14, "surah_number": 84, "surah_name_bn": "আল-ইনশিকাক্ব", "surah_name_ar": "الانشقاق", "ayah": 21, "page": 589, "juz": 30},
    {"number": 15, "surah_number": 96, "surah_name_bn": "আল-আলাক্ব", "surah_name_ar": "العلق", "ayah": 19, "page": 597, "juz": 30}
]

print("Generating full Quran database...")
