import type { Locale, Localized } from "./types";

export const locales: Locale[] = ["en", "ar"];
export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as string[]).includes(value);
}

export const dir = (locale: Locale) => (locale === "ar" ? "rtl" : "ltr");

/** Pick the visitor's language from a Localized value. */
export const t = (text: Localized, locale: Locale) => text[locale];

/** Prefix an internal path with the locale: href("/books", "ar") → "/ar/books" */
export const href = (path: string, locale: Locale) => `/${locale}${path === "/" ? "" : path}`;

export function formatNumber(value: number, locale: Locale) {
  return new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-US").format(value);
}

/** 70 → "70%" in English, "٧٠٪" in Arabic. */
export function formatPercent(value: number, locale: Locale) {
  return new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-US", { style: "percent" }).format(value / 100);
}

const en = {
  meta: {
    description: "A community of developers reading and discussing essential software engineering books together.",
  },
  nav: {
    home: "Home",
    library: "Library",
    sessions: "Sessions",
    community: "Community",
    resources: "Resources",
    join: "Join the club",
    switchLanguage: "العربية",
    switchLanguageLabel: "Switch to Arabic",
    theme: "Toggle dark mode",
    menu: "Main navigation",
  },
  status: { finished: "Finished", reading: "Reading now", planned: "Up next" },
  common: {
    sessions: (n: string) => `${n} sessions`,
    members: (n: string) => `${n}+ members`,
    progress: "Progress",
    joinGroup: "Join the study group",
    joinWhatsApp: "Join on WhatsApp",
    slides: "Session slides",
    watchRecording: "Watch recording",
    viewBook: "View book",
    by: (author: string) => `by ${author}`,
    allBooks: "All books",
  },
  home: {
    eyebrow: "Now reading",
    title: "Read the books that make great engineers.",
    subtitle:
      "A community of developers reading essential software books together, one chapter and one live discussion at a time.",
    primaryCta: "Join the club",
    secondaryCta: "Explore the library",
    stats: {
      sessions: "Sessions held",
      hours: "Hours of discussion",
      finished: "Books finished",
      members: "Registered members",
    },
    readingTitle: "On the reading list now",
    readingSubtitle: "Pick up wherever the club is. Every book has its own study group.",
    howTitle: "How the club works",
    howSubtitle: "No pressure, no grades. Just good books and better conversations.",
    steps: [
      { title: "Join the community", body: "Sign up and join the WhatsApp community, where sessions and new books are announced." },
      { title: "Read a chapter", body: "Each session covers a chapter or two, so the pace stays comfortable alongside work or study." },
      { title: "Discuss it live", body: "Meet online for about two hours, share how the ideas apply to real projects, and revisit slides any time." },
    ],
    guestTitle: "Guest sessions",
    guestSubtitle: "Practitioners join us to connect the book to their day-to-day work.",
    testimonialsTitle: "What members say",
    ctaTitle: "Your next favourite book is on our list.",
    ctaBody: "Join hundreds of developers reading and growing together. It's free.",
  },
  library: {
    title: "Library",
    subtitle: "Every book the club has read, is reading, and plans to read.",
    filters: { all: "All", reading: "Reading now", finished: "Finished" },
    sessionPlan: "Session plan",
    sessionPlanBody: (n: string) => `${n} sessions, about a chapter each.`,
    guestSessions: "Guest sessions",
    groupMembers: "Group members",
    notFound: "Book not found",
  },
  sessions: {
    title: "Sessions",
    subtitle: "Live, online discussions of the book we're reading, with slides and recordings afterwards.",
    next: "Next session",
    noneTitle: "No session scheduled right now",
    noneBody: "Dates and links are announced in the WhatsApp community first.",
    addGoogle: "Add to Google Calendar",
    downloadIcs: "Download .ics",
    joinSession: "Join the session",
    activeTitle: "Books in progress",
    formatTitle: "How a session runs",
    format: [
      { title: "Online and live", body: "We meet online so anyone can join from anywhere." },
      { title: "About two hours", body: "Enough time for a chapter and a proper discussion." },
      { title: "Chapter by chapter", body: "Each book is split into sessions you can prepare for." },
      { title: "Slides and recordings", body: "Catch up later in Resources if you miss one." },
    ],
  },
  community: {
    title: "Community",
    subtitle: "Join the main community for announcements, then a study group for each book you read.",
    mainLabel: "Main community",
    groupsTitle: "Book study groups",
    active: "Active",
    completed: "Completed",
  },
  resources: {
    title: "Resources",
    subtitle: "Recordings and slides from past sessions, all in one place.",
    recordings: "Recordings",
    slides: "Slides",
    slidesBody: "Session slides for every chapter, on Google Drive.",
    openDrive: "Open in Drive",
  },
  footer: {
    tagline: "Developers reading essential software engineering books together.",
    builtBy: "Built by",
    explore: "Explore",
    connect: "Connect",
  },
  notFound: { title: "Page not found", body: "The page you're looking for doesn't exist.", back: "Back to home" },
};

export type Dictionary = typeof en;

const ar: Dictionary = {
  meta: {
    description: "مجتمع من المطورين يقرؤون ويناقشون معًا أهم كتب هندسة البرمجيات.",
  },
  nav: {
    home: "الرئيسية",
    library: "المكتبة",
    sessions: "الجلسات",
    community: "المجتمع",
    resources: "المصادر",
    join: "انضم إلى النادي",
    switchLanguage: "English",
    switchLanguageLabel: "التبديل إلى الإنجليزية",
    theme: "تبديل الوضع الداكن",
    menu: "التنقل الرئيسي",
  },
  status: { finished: "انتهينا منه", reading: "نقرؤه الآن", planned: "التالي" },
  common: {
    sessions: (n) => `${n} جلسة`,
    members: (n) => `+${n} عضو`,
    progress: "التقدّم",
    joinGroup: "انضم إلى مجموعة الكتاب",
    joinWhatsApp: "انضم عبر واتساب",
    slides: "شرائح الجلسات",
    watchRecording: "شاهد التسجيل",
    viewBook: "عرض الكتاب",
    by: (author) => `تأليف ${author}`,
    allBooks: "كل الكتب",
  },
  home: {
    eyebrow: "نقرأ الآن",
    title: "اقرأ الكتب التي تصنع مهندسي برمجيات أفضل.",
    subtitle: "مجتمع من المطورين يقرؤون معًا أهم كتب البرمجيات، فصلًا بفصل ونقاشًا مباشرًا بعد آخر.",
    primaryCta: "انضم إلى النادي",
    secondaryCta: "تصفّح المكتبة",
    stats: {
      sessions: "جلسة عقدناها",
      hours: "ساعة من النقاش",
      finished: "كتب أنهيناها",
      members: "عضو مسجّل",
    },
    readingTitle: "على قائمة القراءة الآن",
    readingSubtitle: "انضم من حيث وصل النادي. لكل كتاب مجموعة دراسة خاصة به.",
    howTitle: "كيف يعمل النادي",
    howSubtitle: "بلا ضغط وبلا درجات. كتب جيدة ونقاشات أفضل.",
    steps: [
      { title: "انضم إلى المجتمع", body: "سجّل وانضم إلى مجتمع واتساب، حيث نعلن عن الجلسات والكتب الجديدة." },
      { title: "اقرأ فصلًا", body: "تغطي كل جلسة فصلًا أو اثنين، فيبقى الإيقاع مريحًا بجانب العمل أو الدراسة." },
      { title: "ناقشه مباشرةً", body: "نلتقي أونلاين لنحو ساعتين، ونشارك كيف تنطبق الأفكار على مشاريع حقيقية، والشرائح متاحة في أي وقت." },
    ],
    guestTitle: "جلسات الضيوف",
    guestSubtitle: "خبراء ينضمون إلينا ليربطوا الكتاب بعملهم اليومي.",
    testimonialsTitle: "ماذا يقول الأعضاء",
    ctaTitle: "كتابك المفضّل القادم على قائمتنا.",
    ctaBody: "انضم إلى مئات المطورين الذين يقرؤون ويتطوّرون معًا. مجانًا.",
  },
  library: {
    title: "المكتبة",
    subtitle: "كل الكتب التي قرأها النادي، وما نقرؤه الآن، وما نخطط لقراءته.",
    filters: { all: "الكل", reading: "نقرؤه الآن", finished: "انتهينا منه" },
    sessionPlan: "خطة الجلسات",
    sessionPlanBody: (n) => `${n} جلسة، فصل تقريبًا في كل جلسة.`,
    guestSessions: "جلسات الضيوف",
    groupMembers: "أعضاء المجموعة",
    notFound: "الكتاب غير موجود",
  },
  sessions: {
    title: "الجلسات",
    subtitle: "نقاشات مباشرة أونلاين للكتاب الذي نقرؤه، مع الشرائح والتسجيلات بعدها.",
    next: "الجلسة القادمة",
    noneTitle: "لا توجد جلسة مجدولة حاليًا",
    noneBody: "نعلن عن المواعيد والروابط أولًا في مجتمع واتساب.",
    addGoogle: "أضف إلى تقويم Google",
    downloadIcs: "تنزيل ملف ‎.ics",
    joinSession: "انضم إلى الجلسة",
    activeTitle: "كتب قيد القراءة",
    formatTitle: "كيف تسير الجلسة",
    format: [
      { title: "أونلاين ومباشرة", body: "نلتقي أونلاين ليتمكن الجميع من الحضور من أي مكان." },
      { title: "نحو ساعتين", body: "وقت كافٍ لفصل كامل ونقاش حقيقي." },
      { title: "فصلًا بفصل", body: "كل كتاب مقسّم إلى جلسات يمكنك التحضير لها." },
      { title: "شرائح وتسجيلات", body: "إن فاتتك جلسة، تجدها لاحقًا في المصادر." },
    ],
  },
  community: {
    title: "المجتمع",
    subtitle: "انضم إلى المجتمع الرئيسي للإعلانات، ثم إلى مجموعة دراسة لكل كتاب تقرؤه.",
    mainLabel: "المجتمع الرئيسي",
    groupsTitle: "مجموعات دراسة الكتب",
    active: "نشطة",
    completed: "مكتملة",
  },
  resources: {
    title: "المصادر",
    subtitle: "تسجيلات وشرائح الجلسات السابقة في مكان واحد.",
    recordings: "التسجيلات",
    slides: "الشرائح",
    slidesBody: "شرائح الجلسات لكل فصل على Google Drive.",
    openDrive: "افتح في Drive",
  },
  footer: {
    tagline: "مطورون يقرؤون معًا أهم كتب هندسة البرمجيات.",
    builtBy: "صُنع بواسطة",
    explore: "استكشف",
    connect: "تواصل",
  },
  notFound: { title: "الصفحة غير موجودة", body: "الصفحة التي تبحث عنها غير موجودة.", back: "العودة للرئيسية" },
};

export const dictionaries: Record<Locale, Dictionary> = { en, ar };
export const getDictionary = (locale: Locale) => dictionaries[locale];
