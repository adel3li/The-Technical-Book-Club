import Navbar from '../components/Navbar';
import Link from 'next/link';
import Counter from '../components/Counter';

export default function Home() {
  const stats = [
    { label: "Total Sessions", value: "32", prefix: "+" },
    { label: "Hours Discussed", value: "64", prefix: "+" },
    { label: "Books Covered", value: "2", prefix: "+" },
    { label: "Registered Members", value: "350", prefix: "+", note: "(~10 active/session)" }
  ];

  const currentBook = {
    title: "Automate the Boring Stuff with Python.",
    description: "Practical programming for total beginners",
    progress: "10%",
    author: "Al Sweigart",
    // Add a cover to public/image/ and set its path here, e.g. "/image/automate-python.png".
    // Until then a styled placeholder is shown instead of a broken image.
    coverImage: null
  };

  const specialSessions = [
    {
      guest: "Mohamed Elsherif",
      role: "Software Architect at Apple",
      book: "The Pragmatic Programmer",
      description: "An interactive session discussing practical principles and real-world applications of concepts from The Pragmatic Programmer.",
      photoUrl: "/image/mohamed.png",
      recordingUrl: "https://drive.google.com/file/d/1PjOdmeKh8cot12PxVUWSJnmgfX38Q6Ij/view?usp=share_link"
    }
  ];

  const benefits = [
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

  const testimonials = [
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

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 animate-float">The Technical Book Club</h1>
            <p className="text-xl text-white/60 mb-8">
              Join a community of developers reading and discussing essential programming books together
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="https://forms.gle/9u41zzdHQpmXJhKF6">
                <div className="inline-block bg-black text-white px-8 py-3 rounded-full font-semibold border border-white/20 hover:bg-white hover:text-black transition-all duration-200 glow-button">
                  📖 Join the Club
                </div>
              </Link>
              <Link href="/books">
                <div className="inline-block bg-white/5 text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-all duration-200">
                  View Book Roadmap
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Special Sessions */}
        <section className="py-16 px-4 bg-white/5 animate-fade-in mb-24" style={{ animationDelay: '0.4s' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Special Sessions ✨</h2>
            {specialSessions.map((session, idx) => (
              <div key={idx} className="bg-black/50 rounded-lg p-8 border border-white/10">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="w-24 h-24 rounded-full bg-white/10 overflow-hidden">
                    <img 
                      src={session.photoUrl} 
                      alt={session.guest}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-white/60 mb-1">{session.date}</div>
                    <h3 className="font-semibold text-xl mb-1">{session.guest}</h3>
                    <div className="text-white/60 mb-3">{session.role}</div>
                    <p className="text-white/80 mb-2">
                      Book Discussion: <span className="text-white">{session.book}</span>
                    </p>
                    <p className="text-white/60 mb-4">{session.description}</p>
                    <a
                      href={session.recordingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full text-sm transition-all duration-200 border border-white/10"
                    >
                      <span>📹</span> Watch Session Recording
                      <span className="text-xs">↗</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 px-4 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">What Our Members Say 💝</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((testimonial, idx) => (
                <div 
                  key={idx}
                  className="bg-white/5 p-6 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <p className="text-white/80 mb-4 text-sm">
                    {testimonial.text}
                  </p>
                  <div className="border-t border-white/10 pt-4">
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-white/60 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Join Us */}
        <section className="py-16 px-4 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Why Join Us ✨</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, idx) => (
                <div 
                  key={idx} 
                  className="bg-white/5 p-6 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="text-3xl mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-white/60">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="py-16 bg-white/5 animate-fade-in mt-24" style={{ animationDelay: '0.6s' }}>
          <div className="max-w-4xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-3xl font-bold mb-2">
                    {stat.prefix}<Counter value={stat.value} duration={2000 + (idx * 500)} />
                  </div>
                  <div className="text-white/60 text-sm">
                    {stat.label}
                    {stat.note && <div className="text-xs mt-1 text-white/40">{stat.note}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Current Book */}
        <section className="py-16 px-4 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">📚 Currently Reading</h2>
            <div className="bg-white/5 rounded-lg p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-48 h-64 overflow-hidden rounded-lg border border-white/10 shrink-0">
                  {currentBook.coverImage ? (
                    <img
                      src={currentBook.coverImage}
                      alt={currentBook.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col justify-between p-4 bg-gradient-to-br from-white/15 to-white/5">
                      <span className="text-3xl">📘</span>
                      <div>
                        <div className="font-semibold leading-tight">{currentBook.title}</div>
                        <div className="text-xs text-white/60 mt-2">{currentBook.author}</div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-2xl mb-2">{currentBook.title}</h3>
                  <p className="text-white/60 mb-2">by {currentBook.author}</p>
                  <p className="text-white/60 mb-4">{currentBook.description}</p>
                  <div className="w-full bg-white/10 rounded-full h-2 mb-2">
                    <div 
                      className="bg-white rounded-full h-2 transition-all duration-1000" 
                      style={{ width: currentBook.progress }}
                    ></div>
                  </div>
                  <div className="text-white/60 text-sm">
                    {currentBook.progress} complete
                  </div>
                </div>
                <Link href="https://chat.whatsapp.com/DIvv9XUSZ6QBYiRMPmLa49">
                  <div className="px-6 py-3 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all duration-200">
                    Join Current Sessions →
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Quote Section */}
        <section className="py-24 px-4 animate-fade-in bg-gradient-to-b from-transparent to-white/5" style={{ animationDelay: '1s' }}>
          <div className="max-w-3xl mx-auto text-center">
            <blockquote className="text-2xl font-light italic text-white/80">
              &ldquo;The more that you read, the more things you will know. The more that you learn, the more places you&apos;ll go.&rdquo;
            </blockquote>
            <p className="mt-4 text-white/60">― Dr. Seuss</p>
          </div>
        </section>
      </main>
    </div>
  );
}
