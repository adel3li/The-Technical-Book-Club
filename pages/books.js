import Layout from '@/components/Layout';
import { books } from '@/data/club';
import { STATUS_LABELS, specialSessionCount } from '@/lib/club';

function BookDetails({ book, align }) {
  const specials = specialSessionCount(book.slug);
  return (
    <div className={align === 'right' ? 'md:text-right' : ''}>
      <div className="text-lg text-white/80 mb-1">{STATUS_LABELS[book.status].timeline}</div>
      <div className="text-white/60">
        {book.sessions} sessions
        {specials > 0 && (
          <span className="text-white/40 ml-2">
            (+{specials} special session{specials > 1 ? 's' : ''})
          </span>
        )}
      </div>
      {book.status === 'reading' && (
        <div className={`mt-3 flex items-center gap-3 text-sm text-white/60 ${align === 'right' ? 'md:justify-end' : ''}`}>
          <div className="w-32 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full" style={{ width: `${book.progress}%` }} />
          </div>
          {book.progress}%
        </div>
      )}
    </div>
  );
}

function BookTitle({ book, align }) {
  return (
    <h2 className={`text-xl md:text-2xl font-semibold ${align === 'right' ? 'md:text-right' : ''}`}>
      {book.title}
    </h2>
  );
}

export default function Books() {
  return (
    <Layout title="Books" description="Every book the club has read, is reading, and plans to read.">
      <main className="pt-32 px-4 pb-20">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-center animate-fade-in">📚 Our Book Club Journey</h1>
          <p className="text-lg sm:text-xl text-white/60 mb-16 md:mb-24 text-center max-w-2xl mx-auto animate-fade-in">
            Explore books we&apos;ve read, are reading, and plan to read.
          </p>

          <ol className="relative">
            {/* Timeline line: left edge on phones, centred on desktop */}
            <div
              aria-hidden="true"
              className="absolute left-[11px] md:left-1/2 top-2 bottom-2 w-[2px] md:-translate-x-1/2 bg-gradient-to-b from-white/5 via-white/20 to-white/5"
            />

            {books.map((book, idx) => {
              const titleLeft = idx % 2 === 0;
              return (
                <li
                  key={book.slug}
                  className="relative grid grid-cols-[24px_1fr] md:grid-cols-[1fr_auto_1fr] gap-x-6 md:gap-x-12 mb-14 md:mb-28 last:mb-0 animate-fade-in"
                  style={{ animationDelay: `${idx * 0.15}s` }}
                >
                  {/* Dot */}
                  <div className="relative row-span-2 md:row-span-1 md:col-start-2 flex md:items-center justify-center pt-1.5 md:pt-0">
                    <div aria-hidden="true" className="relative w-6 h-6 flex items-center justify-center">
                      <div className={`absolute inset-0 rounded-full bg-white/20 ${book.status === 'reading' ? 'animate-pulse' : ''}`} />
                      <div className="w-3.5 h-3.5 rounded-full bg-white" />
                    </div>
                  </div>

                  {/* Phone: title then details, stacked to the right of the line */}
                  <div className="md:hidden">
                    <BookTitle book={book} />
                  </div>
                  <div className="md:hidden col-start-2 mt-2">
                    <BookDetails book={book} />
                  </div>

                  {/* Desktop: title and details on alternating sides of the line */}
                  <div className="hidden md:flex md:col-start-1 md:row-start-1 items-center justify-end">
                    {titleLeft ? <BookTitle book={book} align="right" /> : <BookDetails book={book} align="right" />}
                  </div>
                  <div className="hidden md:flex md:col-start-3 md:row-start-1 items-center">
                    {titleLeft ? <BookDetails book={book} /> : <BookTitle book={book} />}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </main>
    </Layout>
  );
}
