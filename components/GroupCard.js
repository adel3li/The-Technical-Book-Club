export function GroupCard({ group, featured = false, delay = 0 }) {
  return (
    <div
      className={`
        ${featured ? 'bg-white/10' : 'bg-white/5'}
        rounded-lg p-5 sm:p-8 border border-white/10
        hover:bg-white/[0.15] transition-all duration-300
        animate-fade-in
      `}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex items-start gap-4 sm:gap-6">
        <div aria-hidden="true" className={`${featured ? 'text-4xl' : 'text-3xl'} shrink-0`}>
          {group.icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="min-w-0">
              <h3 className="text-xl font-semibold mb-2">{group.title}</h3>
              <p className="text-white/60">{group.description}</p>
            </div>
            <a
              href={group.link}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 self-start px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full text-sm transition-all duration-200 border border-white/10 whitespace-nowrap"
            >
              Join {group.platform} →
            </a>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/60">
            <div className="flex items-center gap-2 whitespace-nowrap">
              <span aria-hidden="true">👤</span> {group.members} members
            </div>
            {group.status && (
              <div className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className={`w-2 h-2 rounded-full ${group.status === 'Active' ? 'bg-green-500' : 'bg-blue-500'}`}
                />
                {group.status}
              </div>
            )}
            {group.progress && (
              <div className="flex items-center gap-2">
                <div className="w-20 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full" style={{ width: group.progress }} />
                </div>
                {group.progress}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
