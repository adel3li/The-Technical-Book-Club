import Navbar from '../components/Navbar';
import { useState } from 'react';
import { ResourceSection } from '../components/ResourceSection';

export default function Resources() {
  const books = [
    {
      title: "The Pragmatic Programmer",
      icon: "📚",
      driveLink: "https://drive.google.com/drive/folders/1lSLEjO53mC5fT3esXKTiAYcmTpoDKL7y?usp=sharing",
      chapters: Array.from({ length: 9 }, (_, i) => ({
        title: `Chapter ${i + 1}: ${getChapterTitle(i + 1)}`,
        resources: [
          { 
            type: "slides", 
            title: `Session Slides`, 
            url: `/slides/pragmatic/ch${i + 1}/slides.pdf` 
          }
        ]
      }))
    },
    {
      title: "The Art of Clean Code",
      icon: "🧹",
      driveLink: "https://drive.google.com/drive/folders/11wKA2PeJye36uCnQreb2PRTRvjDT4YUC?usp=share_link",
      chapters: Array.from({ length: 5 }, (_, i) => ({
        title: `Chapter ${i + 1}`,
        resources: [
          { 
            type: "slides", 
            title: `Session Slides`, 
            url: `/slides/clean-code/ch${i + 1}/slides.pdf` 
          }
        ]
      }))
    },
    {
      title: "Alice and Bob Learn Application Security",
      icon: "🔒",
      driveLink: "https://drive.google.com/drive/folders/1mMFHdJGTRjIPYi9t-UDHnhuXdX3-NF2n?usp=sharing",
      chapters: Array.from({ length: 7 }, (_, i) => ({
        title: `Chapter ${i + 1}`,
        resources: [
          { 
            type: "slides", 
            title: `Session Slides`, 
            url: `/slides/alice-bob/ch${i + 1}/slides.pdf` 
          }
        ]
      }))
    }
  ];

  function getChapterTitle(num) {
    const titles = {
      1: "A Pragmatic Philosophy",
      2: "A Pragmatic Approach",
      3: "The Basic Tools",
      4: "Pragmatic Paranoia",
      5: "Bend or Break",
      6: "Concurrency",
      7: "While You Are Coding",
      8: "Before the Project",
      9: "Pragmatic Projects"
    };
    return titles[num];
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <main className="pt-32 px-4 pb-20 max-w-4xl mx-auto">
        <div className="animate-fade-in">
          <h1 className="text-5xl font-bold mb-4 flex items-center justify-center gap-3">
            📚 Study Materials
          </h1>
          <p className="text-xl text-white/60 mb-8 text-center">
            Browse session slides for each book
          </p>
        </div>
        <div className="space-y-6">
          {books.map((book, index) => (
            <div key={index} className="bg-white/5 rounded-lg p-6 border border-white/10">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  {book.icon} {book.title}
                </h2>
                <a 
                  href={book.driveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors flex items-center gap-1"
                >
                  View in Drive <span className="text-xs">↗</span>
                </a>
              </div>
              {/* Render chapters or other content here */}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}