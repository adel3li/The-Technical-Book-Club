// Book cover image, or a styled placeholder when the book has no `cover`.
export default function BookCover({ book, className = 'w-48 h-64' }) {
  return (
    <div className={`${className} shrink-0 overflow-hidden rounded-lg border border-white/10`}>
      {book.cover ? (
        <img src={book.cover} alt={`Cover of ${book.title}`} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex flex-col justify-between p-4 bg-gradient-to-br from-white/15 to-white/5">
          <span aria-hidden="true" className="text-3xl">📘</span>
          <div>
            <div className="font-semibold leading-tight">{book.title}</div>
            {book.author && <div className="text-xs text-white/60 mt-2">{book.author}</div>}
          </div>
        </div>
      )}
    </div>
  );
}
