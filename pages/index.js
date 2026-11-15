import Layout from '@/components/Layout';
import Link from 'next/link';
import Counter from '@/components/Counter';
import BookCover from '@/components/BookCover';
import NextSession from '@/components/NextSession';
import { benefits, links, currentSessionsLink, quote, specialSessions, testimonials } from '@/data/club';
import { currentBook, getBook, homeStats as stats } from '@/lib/club';

export default function Home() {
  return (
    <Layout>
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 animate-float">The Technical Book Club</h1>
            <p className="text-xl text-white/60 mb-8">
              Join a community of developers reading and discussing essential programming books together
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href={links.joinForm}>
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

        <NextSession />

        {/* Special Sessions */}
        <section className="py-16 px-4 bg-white/5 animate-fade-in mb-24" style={{ animationDelay: '0.4s' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Special Sessions ✨</h2>
            {specialSessions.map((session, idx) => (
              <div key={idx} className="bg-black/50 rounded-lg p-8 border border-white/10">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="w-24 h-24 shrink-0 rounded-full bg-white/10 overflow-hidden">
                    <img 
                      src={session.photoUrl} 
                        alt={session.guest}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-xl mb-1">{session.guest}</h3>
                    <div className="text-white/60 mb-3">{session.role}</div>
                    <p className="text-white/80 mb-2">
                      Book Discussion:{' '}
                      <Link href={`/books/${session.book}`} className="text-white hover:underline underline-offset-4">
                        {getBook(session.book).title}
                      </Link>
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
                  <p dir="auto" className="text-white/80 mb-4 text-sm whitespace-pre-line">
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
                    +<Counter value={stat.value} duration={2000 + (idx * 500)} />
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
                <BookCover book={currentBook} />
                <div className="flex-1">
                  <h3 className="font-semibold text-2xl mb-2">
                    <Link href={`/books/${currentBook.slug}`} className="hover:underline underline-offset-4">
                      {currentBook.title}
                    </Link>
                  </h3>
                  <p className="text-white/60 mb-2">by {currentBook.author}</p>
                  <p className="text-white/60 mb-4">{currentBook.description}</p>
                  <div className="w-full bg-white/10 rounded-full h-2 mb-2">
                    <div 
                      className="bg-white rounded-full h-2 transition-all duration-1000" 
                      style={{ width: `${currentBook.progress}%` }}
                    ></div>
                  </div>
                  <div className="text-white/60 text-sm">
                    {currentBook.progress}% complete
                  </div>
                </div>
                <Link href={currentSessionsLink}>
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
              &ldquo;{quote.text}&rdquo;
            </blockquote>
            <p className="mt-4 text-white/60">― {quote.author}</p>
          </div>
        </section>
      </main>
    </Layout>
  );
}
