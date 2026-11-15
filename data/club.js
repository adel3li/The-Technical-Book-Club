// All of the club's site content lives in this file.
// Edit here and every page (home, books, groups, resources) picks it up.

export const links = {
  joinForm: "https://forms.gle/9u41zzdHQpmXJhKF6",
};

// Main community group (shown at the top of the Community page)
export const community = {
  title: "The Technical Book Club Community",
  description: "Our main WhatsApp community where we share announcements, resources, and engage in general discussions about software engineering and learning.",
  members: 150,
  platform: "WhatsApp",
  link: "https://chat.whatsapp.com/KCSluMrzenhKJlziP351jA",
  icon: "👥",
};

// Books in reading order (oldest first).
//   status:   "finished" | "reading" | "planned"
//   sessions: planned number of sessions for the book
//   progress: percent of the book covered so far (0-100)
//   group:    the book's WhatsApp study group, if it has one
//   driveLink: Google Drive folder with the session slides, if any
export const books = [
  {
    slug: "the-pragmatic-programmer",
    title: "The Pragmatic Programmer",
    icon: "🎓",
    status: "finished",
    sessions: 14,
    progress: 100,
    driveLink: "https://drive.google.com/drive/folders/1lSLEjO53mC5fT3esXKTiAYcmTpoDKL7y?usp=sharing",
    group: {
      description: "Continued discussions and implementation of pragmatic programming practices",
      members: 80,
      link: "https://chat.whatsapp.com/Gi84p1zzgISCMojxSMZ8W5",
    },
  },
  {
    slug: "the-art-of-clean-code",
    title: "The Art of Clean Code",
    icon: "🧹",
    status: "finished",
    sessions: 5,
    progress: 100,
    driveLink: "https://drive.google.com/drive/folders/11wKA2PeJye36uCnQreb2PRTRvjDT4YUC?usp=share_link",
    group: {
      description: "Discussions and implementation of clean code practices",
      members: 100,
      link: "https://chat.whatsapp.com/DbSVlunS6ucLmt6LuXE5Ce",
    },
  },
  {
    slug: "alice-and-bob-learn-application-security",
    title: "Alice and Bob Learn Application Security",
    icon: "🔒",
    status: "reading",
    sessions: 14,
    progress: 70,
    driveLink: "https://drive.google.com/drive/folders/1mMFHdJGTRjIPYi9t-UDHnhuXdX3-NF2n?usp=sharing",
    group: {
      description: "Currently reading and discussing Application Security concepts",
      members: 55,
      link: "https://chat.whatsapp.com/DIvv9XUSZ6QBYiRMPmLa49",
    },
  },
  {
    slug: "automate-the-boring-stuff-with-python",
    title: "Automate the Boring Stuff with Python",
    author: "Al Sweigart",
    description: "Practical programming for total beginners",
    status: "reading",
    sessions: 10,
    progress: 10,
    // Add a cover to public/image/ and set its path here, e.g. "/image/automate-python.png".
    // Until then a styled placeholder is shown instead.
    cover: null,
  },
];

// The book featured in "Currently Reading" on the home page
export const currentBookSlug = "automate-the-boring-stuff-with-python";

// Where the "Join Current Sessions" button on the home page goes.
// NOTE: this is the Alice & Bob group, as on the site before. The current
// book (Automate the Boring Stuff) has no group of its own listed yet.
export const currentSessionsLink = "https://chat.whatsapp.com/DIvv9XUSZ6QBYiRMPmLa49";

// Numbers that can't be worked out from the book list above.
// "Books covered" and "hours discussed" are calculated (see lib/club.js).
export const stats = {
  totalSessions: 32,
  hoursPerSession: 2,
  registeredMembers: 350,
  activePerSession: 10,
};

// Guest sessions. `book` is the slug of a book above.
export const specialSessions = [
  {
    guest: "Mohamed Elsherif",
    role: "Software Architect at Apple",
    book: "the-pragmatic-programmer",
    description: "An interactive session discussing practical principles and real-world applications of concepts from The Pragmatic Programmer.",
    photoUrl: "/image/mohamed.png",
    recordingUrl: "https://drive.google.com/file/d/1PjOdmeKh8cot12PxVUWSJnmgfX38Q6Ij/view?usp=share_link"
  }
];

export const benefits = [
  {
    icon: "🤝",
    title: "Community-Driven Learning",
    description: "Learn together with other developers in an engaging, supportive environment"
  },
  {
    icon: "📚",
    title: "Curated Content",
    description: "Carefully selected technical books that enhance your software engineering skills"
  },
  {
    icon: "💡",
    title: "Practical Discussions",
    description: "Weekly sessions focusing on real-world applications and best practices"
  },
  {
    icon: "🎯",
    title: "Structured Approach",
    description: "Organized chapter-by-chapter discussions with prepared materials"
  }
];

export const testimonials = [
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

export const quote = {
  text: "The more that you read, the more things you will know. The more that you learn, the more places you'll go.",
  author: "Dr. Seuss",
};
