// pages/roadmap.js
import Navbar from '../components/Navbar';
import Link from 'next/link';
import Counter from '../components/Counter';

export default function Home() {
  const stats = [
    { label: "Active Members", value: "24" },
    { label: "Total Sessions", value: "156" },
    { label: "Hours Discussed", value: "312" },
  ];

  const currentBook = {
    title: "Designing Data-Intensive Applications",
    description: "Big ideas behind reliable systems",
    progress: "35%",
    author: "Martin Kleppmann"
  };

  const specialSessions = [
    {
      guest: "Mohamed Elsherif",
      role: "Software Architect at Apple",
      book: "The Pragmatic Programmer",
      date: "December 2023",
      description: "An interactive session discussing practical software design principles and real-world applications of concepts from The Pragmatic Programmer.",
      photoUrl: "/images/session-sherif.jpg",
      recordingUrl: "https://drive.google.com/file/d/your-file-id/view" // Add your actual Drive URL here
    }
  ];

  const testimonials = [
    {
      name: "Ahmed M.",
      role: "Software Engineer",
      text: "The discussions helped me understand complex concepts through real-world experiences.",
      avatar: "/avatars/ahmed.jpg"
    },
    {
      name: "Sara K.",
      role: "Frontend Developer",
      text: "Great community! The weekly sessions keep me accountable and learning consistently.",
      avatar: "/avatars/sara.jpg"
    }
  ];

  const upcomingEvents = [
    {
      date: "Mar 15, 2024",
      title: "System Design Workshop",
      description: "Practical implementation of concepts from DDIA Chapter 5",
      type: "Workshop"
    },
    {
      date: "Mar 22, 2024",
      title: "Guest Speaker: Database Internals",
      description: "Deep dive into database architecture with senior DB engineer",
      type: "Special Session"
    }
  ];

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 animate-float">Programming Study Club</h1>
            <p className="text-xl text-white/60 mb-8">
              Join a community of developers reading and discussing essential programming books together
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/books">
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
        <section className="py-16 px-4 bg-white/5 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">✨ Special Sessions</h2>
            {specialSessions.map((session, idx) => (
              <div key={idx} className="bg-black/50 rounded-lg p-8 border border-white/10">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="w-24 h-24 rounded-full bg-white/10 overflow-hidden">
                    {/* Add image here if available */}
                    <div className="w-full h-full bg-gradient-to-br from-white/10 to-white/5" />
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

        {/* Stats Grid */}
        <section className="py-16 bg-white/5 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="max-w-4xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-3xl font-bold mb-2">
                    <Counter value={stat.value} duration={2000 + (idx * 500)} />
                  </div>
                  <div className="text-white/60">{stat.label}</div>
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
                <Link href="/books">
                  <div className="px-6 py-3 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all duration-200">
                    Join Current Sessions →
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="py-16 px-4 animate-fade-in" style={{ animationDelay: '1s' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">📅 Upcoming Events</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {upcomingEvents.map((event, idx) => (
                <div key={idx} className="bg-white/5 rounded-lg p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="text-sm text-white/60 mb-2">{event.date}</div>
                  <div className="inline-block px-2 py-1 bg-white/10 rounded-full text-xs mb-3">
                    {event.type}
                  </div>
                  <h3 className="font-semibold text-xl mb-2">{event.title}</h3>
                  <p className="text-white/60">{event.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Member Testimonials */}
        <section className="py-16 px-4 bg-white/5 animate-fade-in" style={{ animationDelay: '1.2s' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">💬 Member Experiences</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, idx) => (
                <div key={idx} className="bg-black/50 rounded-lg p-6 border border-white/10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-white/10 overflow-hidden">
                      {/* Avatar image here */}
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-white/60">{testimonial.role}</div>
                    </div>
                  </div>
                  <p className="text-white/80 italic">"{testimonial.text}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-4 animate-fade-in" style={{ animationDelay: '1.4s' }}>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Join Our Community?</h2>
            <p className="text-white/60 mb-8 max-w-2xl mx-auto">
              Start your journey of continuous learning with fellow developers who are passionate about growing together.
            </p>
            <Link href="/books">
              <div className="inline-block bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-white/90 transition-all duration-200">
                Get Started Today →
              </div>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}