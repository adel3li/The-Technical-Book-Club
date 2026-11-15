import Layout from '@/components/Layout';
import { booksWithSlides } from '@/lib/club';

export default function Resources() {
  const books = booksWithSlides;

  return (
    <Layout title="Resources" description="Session slides and study materials for each book.">
      <main className="pt-32 px-4 pb-20 max-w-4xl mx-auto">
        <div className="animate-fade-in">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
            📚 Study Materials
          </h1>
          <p className="text-xl text-white/60 mb-8 text-center">
            Browse session slides for each book
          </p>
        </div>
        <div className="space-y-6">
          {books.map((book, index) => (
            <div key={index} className="bg-white/5 rounded-lg p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <h2 className="text-xl sm:text-2xl font-bold flex items-start gap-3">
                  {book.icon} {book.title}
                </h2>
                <a 
                  href={book.driveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 self-start sm:self-auto inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm text-white/80 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-all duration-200"
                >
                  View in Drive <span className="text-xs">↗</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>
    </Layout>
  );
}