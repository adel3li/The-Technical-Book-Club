// All of the club's content lives in this file. Edit it and every page
// (and both languages) updates. Text shown to visitors has an English (en)
// and Arabic (ar) version; names, titles and testimonials stay as written.

import type { Book, GuestSession, Localized, ScheduledSession, StudyGroup, Testimonial } from "@/lib/types";

export const site = {
  name: "The Technical Book Club",
  shortName: "TTBC",
  url: "https://the-technical-book-club.vercel.app",
  joinForm: "https://forms.gle/9u41zzdHQpmXJhKF6",
  github: "https://github.com/adel3li",
};

export const community: StudyGroup & { name: Localized } = {
  name: { en: "The Technical Book Club Community", ar: "مجتمع نادي الكتاب التقني" },
  members: 150,
  link: "https://chat.whatsapp.com/KCSluMrzenhKJlziP351jA",
  description: {
    en: "Announcements, session links and everyday discussion about software engineering and learning.",
    ar: "الإعلانات وروابط الجلسات والنقاشات اليومية حول هندسة البرمجيات والتعلّم.",
  },
};

// Books in reading order (oldest first). Each one gets a page at /books/<slug>.
export const books: Book[] = [
  {
    slug: "the-pragmatic-programmer",
    title: "The Pragmatic Programmer",
    author: "David Thomas & Andrew Hunt",
    status: "finished",
    sessions: 14,
    progress: 100,
    summary: {
      en: "Timeless principles of the craft: ownership, orthogonality, tracer bullets and the habits that separate good programmers from great ones.",
      ar: "مبادئ خالدة في حرفة البرمجة: تحمّل المسؤولية، والاستقلالية بين المكوّنات، ورصاصات التتبّع، والعادات التي تصنع المبرمج المتميّز.",
    },
    slidesUrl: "https://drive.google.com/drive/folders/1lSLEjO53mC5fT3esXKTiAYcmTpoDKL7y?usp=sharing",
    group: {
      members: 80,
      link: "https://chat.whatsapp.com/Gi84p1zzgISCMojxSMZ8W5",
      description: {
        en: "Continued discussions and implementation of pragmatic programming practices.",
        ar: "نقاشات مستمرة وتطبيق عملي لممارسات البرمجة البراغماتية.",
      },
    },
  },
  {
    slug: "the-art-of-clean-code",
    title: "The Art of Clean Code",
    author: "Christian Mayer",
    status: "finished",
    sessions: 5,
    progress: 100,
    summary: {
      en: "Writing code that is simple, focused and easy to change, and avoiding the complexity that slows teams down.",
      ar: "كتابة كود بسيط ومركّز وسهل التعديل، وتجنّب التعقيد الذي يبطئ الفرق.",
    },
    slidesUrl: "https://drive.google.com/drive/folders/11wKA2PeJye36uCnQreb2PRTRvjDT4YUC?usp=share_link",
    group: {
      members: 100,
      link: "https://chat.whatsapp.com/DbSVlunS6ucLmt6LuXE5Ce",
      description: {
        en: "Discussions and implementation of clean code practices.",
        ar: "نقاشات وتطبيق عملي لممارسات الكود النظيف.",
      },
    },
  },
  {
    slug: "alice-and-bob-learn-application-security",
    title: "Alice and Bob Learn Application Security",
    author: "Tanya Janca",
    cover: "/image/image-AliceandBob.png",
    status: "reading",
    sessions: 14,
    progress: 70,
    summary: {
      en: "Building security into every stage of software development, from requirements and design to secure coding and testing.",
      ar: "دمج الأمان في كل مراحل تطوير البرمجيات، من المتطلبات والتصميم إلى البرمجة الآمنة والاختبار.",
    },
    slidesUrl: "https://drive.google.com/drive/folders/1mMFHdJGTRjIPYi9t-UDHnhuXdX3-NF2n?usp=sharing",
    group: {
      members: 55,
      link: "https://chat.whatsapp.com/DIvv9XUSZ6QBYiRMPmLa49",
      description: {
        en: "Reading and discussing application security concepts.",
        ar: "قراءة ونقاش مفاهيم أمان التطبيقات.",
      },
    },
  },
  {
    slug: "automate-the-boring-stuff-with-python",
    title: "Automate the Boring Stuff with Python",
    author: "Al Sweigart",
    status: "reading",
    sessions: 10,
    progress: 10,
    summary: {
      en: "Practical programming for total beginners: using Python to automate everyday tasks.",
      ar: "برمجة عملية للمبتدئين تمامًا: استخدام بايثون لأتمتة المهام اليومية.",
    },
  },
];

// Where "Join current sessions" points. NOTE: this is the Alice & Bob group,
// as on the site before; Automate the Boring Stuff has no group listed yet.
export const currentSessionsLink = "https://chat.whatsapp.com/DIvv9XUSZ6QBYiRMPmLa49";

// The next scheduled session. When set, the Home and Sessions pages show it
// with "Add to calendar" buttons, in each visitor's time zone, until it starts.
//
// export const nextSession: ScheduledSession | null = {
//   start: "2026-11-22T18:00:00Z",
//   durationMinutes: 90,
//   book: "automate-the-boring-stuff-with-python",
//   topic: { en: "Chapter 3: Functions", ar: "الفصل الثالث: الدوال" },
//   joinLink: "https://meet.google.com/...",
// };
export const nextSession: ScheduledSession | null = null;

// Numbers that can't be worked out from the book list.
export const stats = {
  totalSessions: 32,
  hoursPerSession: 2,
  registeredMembers: 350,
  activePerSession: 10,
};

export const guestSessions: GuestSession[] = [
  {
    id: "pragmatic-mohamed-elsherif",
    guest: "Mohamed Elsherif",
    role: "Software Architect at Apple",
    book: "the-pragmatic-programmer",
    description: {
      en: "An interactive session on the practical principles and real-world applications of The Pragmatic Programmer.",
      ar: "جلسة تفاعلية عن المبادئ العملية لكتاب The Pragmatic Programmer وتطبيقاتها في الواقع.",
    },
    photo: "/image/mohamed.png",
    recordingUrl: "https://drive.google.com/file/d/1PjOdmeKh8cot12PxVUWSJnmgfX38Q6Ij/view?usp=share_link",
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Abuobaida Abdi",
    role: "Software Engineer",
    text: "كانت تجربة ممتعة ومفيدة جدًا! كتاب 𝙏𝙝𝙚 𝙋𝙧𝙖𝙜𝙢𝙖𝙩𝙞𝙘 𝙋𝙧𝙤𝙜𝙧𝙖𝙢𝙢𝙚𝙧 مليء بالأفكار العميقة عن حرفة صناعة البرمجيات، والنقاشات مع الشباب كانت مثرية. الأجمل أن التجربة (نادي القراءة) كانت مشجعة ومحفزة لنا على الاستمرار في القراءة. شكر خاص لك حج عادل على إدارتك الرائعة للجلسات. 🌹📚"
  },
  {
    name: "Mohamed Allam",
    role: "Android Developer",
    text: "Thanks to my amazing book club members for making this journey great. Special thanks to Adel Ali for his efforts and contributions 😍"
  },
  {
    name: "Adel Mahmoud",
    role: "Software Engineering Student",
    text: "It was really a great experience, for me the best part was how everyone was interpreting a thought mentioned in the book based on his/her background/experiences, which really helped broadening the perspective of all of us. And ofc the fun we had along the way 🤣\n\nLooking forward to see you all in the next book."
  },
  {
    name: "Rayhan Shhadeh",
    role: "Computer Engineering Student",
    text: "The only thing I know is that you won't get rid of me in this club. It's wonderful getting to know you, Adel, and learning from your experiences as well as those of the other members is even more valuable. I gained valuable insights from this book and I'm ready for our next one! 🌿 🤍"
  },
  {
    name: "Duaa Braik",
    role: "Software Engineer",
    text: "It was really nice knowing and learning from each one of you 🤩"
  },
  {
    name: "Hend Mohammed",
    role: "Mobile App Enthusiast",
    text: "Thank a lot for the excellent session! the discussion was truly engaging. It was both motivating and inspiring. A special thanks a lot to our guest for sharing valuable insights, knowledge, and practical tips that will help us continue to grow and work towards achieving our goals Insha'Allah."
  }
];

