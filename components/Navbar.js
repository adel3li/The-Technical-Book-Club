// components/Navbar.js
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const links = [
    { label: "Home", href: "/" },
    { label: "Books", href: "/books" },
    { label: "Community", href: "/groups" },
    { label: "Resources", href: "/resources" }
  ];

  const router = useRouter();
  const current = router.pathname;

  return (
    <nav className="fixed top-0 left-0 w-full bg-black z-50 border-b border-white/10 h-16">
      <div className="relative max-w-6xl mx-auto h-full flex items-center justify-between px-4">
        {/* Left: Logo */}
        <div className="flex items-center gap-2 text-white font-bold text-xl">
          <span>TTBC</span>
          <span className="text-xs px-2 py-0.5 bg-white/10 text-white/60 rounded-full">v0.1</span>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-white/60 hover:text-white transition-colors"
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 bg-white/5 rounded-full border border-white/10 p-1 shadow-inner">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="inline-block">
              <div
                className={`px-4 py-1 text-sm rounded-full cursor-pointer transition-all duration-200
                  ${current === link.href
                    ? "bg-white text-black shadow"
                    : "text-white/80 hover:bg-white/10"}
                `}
              >
                {link.label}
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`
          fixed md:hidden top-16 left-0 w-full bg-black/95 border-b border-white/10
          transition-all duration-300 ease-in-out
          ${isMenuOpen ? 'opacity-100 h-screen' : 'opacity-0 h-0 pointer-events-none'}
        `}>
          <div className="p-4 flex flex-col gap-2">
            {links.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
              >
                <div
                  className={`px-4 py-3 text-sm rounded-lg transition-all duration-200
                    ${current === link.href
                      ? "bg-white text-black"
                      : "text-white/80 hover:bg-white/10"}
                  `}
                >
                  {link.label}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}