import Link from 'next/link';
import Layout from '@/components/Layout';
import BookCover from '@/components/BookCover';
import { books } from '@/data/club';
import { STATUS_LABELS, getBook, sessionsForBook } from '@/lib/club';

export function getStaticPaths() {
  return { paths: books.map((book) => ({ params: { slug: book.slug } })), fallback: false };
}

export function getStaticProps({ params }) {
  return { props: { slug: params.slug } };
}

const pill =
  'inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm border border-white/15 transition-all duration-200';

export default function BookPage({ slug }) {
  const book = getBook(slug);
  const guestSessions = sessionsForBook(slug);
  const status = STATUS_LABELS[book.status].timeline;
  const description =
    book.description ||
    `${status === 'Finished' ? 'The club read' : 'The club is reading'} ${book.title}${
      book.author ? ` by ${book.author}` : ''
    } over ${book.sessions} sessions.`;

  return (
    <Layout title={book.title} description={description} image={book.cover || undefined}>
      <main className="pt-28 sm:pt-32 px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <Link href="/books" className="inline-flex items-center gap-1 text-sm text-white/60 hover:text-white transition-colors mb-8">
            ← All books
          </Link>

          <section className="flex flex-col sm:flex-row gap-8 items-center sm:items-start animate-fade-in">
            <BookCover book={book} className="w-44 h-60 sm:w-52 sm:h-72" />
            <div className="flex-1 w-full text-center sm:text-left">
              <div className="inline-flex items-center gap-2 text-sm text-white/70 mb-3">
                <span
                  aria-hidden="true"
                  className={`w-2 h-2 rounded-full ${book.status === 'reading' ? 'bg-green-500' : 'bg-blue-500'}`}
                />
                {status}
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">{book.title}</h1>
              {book.author && <p className="text-white/60 mb-4">by {book.author}</p>}
              {book.description && <p className="text-white/70 mb-4">{book.description}</p>}

              <dl className="flex justify-center sm:justify-start gap-8 my-6">
                <div>
                  <dt className="text-sm text-white/50">Sessions</dt>
                  <dd className="text-2xl font-semibold">{book.sessions}</dd>
                </div>
                {guestSessions.length > 0 && (
                  <div>
                    <dt className="text-sm text-white/50">Guest sessions</dt>
                    <dd className="text-2xl font-semibold">{guestSessions.length}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-sm text-white/50">Progress</dt>
                  <dd className="text-2xl font-semibold">{book.progress}%</dd>
                </div>
              </dl>

              <div
                className="w-full bg-white/10 rounded-full h-2 mb-8"
                role="progressbar"
                aria-valuenow={book.progress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Reading progress"
              >
                <div className="bg-white rounded-full h-2" style={{ width: `${book.progress}%` }} />
              </div>

              <div className="flex flex-wrap justify-center sm:justify-start gap-3">
                {book.group && (
                  <a href={book.group.link} target="_blank" rel="noopener noreferrer" className={`${pill} bg-white text-black border-white hover:bg-white/90`}>
                    Join the study group →
                  </a>
                )}
                {book.driveLink && (
                  <a href={book.driveLink} target="_blank" rel="noopener noreferrer" className={`${pill} bg-white/5 hover:bg-white/10`}>
                    📊 Session slides ↗
                  </a>
                )}
              </div>
              {book.group && (
                <p className="text-sm text-white/50 mt-3">
                  {book.group.members}+ members · {book.group.description}
                </p>
              )}
            </div>
          </section>

          {guestSessions.length > 0 && (
            <section className="mt-16 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-2xl font-bold mb-6">Guest sessions ✨</h2>
              <div className="space-y-4">
                {guestSessions.map((session) => (
                  <div key={session.guest} className="bg-white/5 rounded-lg p-6 border border-white/10 flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                    <img src={session.photoUrl} alt={session.guest} loading="lazy" className="w-20 h-20 rounded-full object-cover shrink-0" />
                    <div className="text-center sm:text-left">
                      <h3 className="font-semibold text-lg">{session.guest}</h3>
                      <div className="text-white/60 text-sm mb-2">{session.role}</div>
                      <p className="text-white/70 mb-4">{session.description}</p>
                      {session.recordingUrl && (
                        <a href={session.recordingUrl} target="_blank" rel="noopener noreferrer" className={`${pill} bg-white/5 hover:bg-white/10`}>
                          📹 Watch the recording ↗
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </Layout>
  );
}
