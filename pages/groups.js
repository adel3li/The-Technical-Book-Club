import Layout from '@/components/Layout';
import { GroupCard } from '../components/GroupCard';
import { community } from '@/data/club';
import { bookGroups as groups } from '@/lib/club';

export default function Groups() {
  const mainCommunity = { ...community, members: `+${community.members}` };
  const bookGroups = groups.map((group) => ({ ...group, members: `+${group.members}` }));

  return (
    <Layout title="Community" description="Join the club's WhatsApp community and book study groups.">
      <main className="pt-32 px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 flex items-center justify-center gap-3 animate-fade-in">
            👥 Our Groups
          </h1>
          <p className="text-xl text-white/60 mb-16 text-center animate-fade-in">
            Join our community and book-specific study groups
          </p>

          {/* Main Community Card */}
          <div className="mb-16 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-2xl font-semibold mb-6">Main Community</h2>
            <GroupCard group={mainCommunity} featured={true} />
          </div>

          {/* Book Groups */}
          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <h2 className="text-2xl font-semibold mb-6">Book Study Groups</h2>
            <div className="grid gap-6">
              {bookGroups.map((group, idx) => (
                <GroupCard 
                  key={idx} 
                  group={group}
                  delay={idx * 0.2} 
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}