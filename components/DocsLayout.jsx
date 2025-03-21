'use client';

import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaChevronRight, FaSearch, FaGithub } from 'react-icons/fa';

const DocsLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  // Listen for scroll events to add styling when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sidebar navigation items
  const navItems = [
    {
      section: 'Wprowadzenie',
      items: [
        { title: 'Instalacja', href: '/docs/installation' },
        { title: 'Pierwsze kroki', href: '/docs/getting-started' },
        { title: 'FAQ', href: '/docs/faq' },
      ]
    },
    {
      section: 'Rozgrywka',
      items: [
        { title: 'Sterowanie', href: '/docs/controls' },
        { title: 'Trasy', href: '/docs/tracks' },
        { title: 'Sztuczki', href: '/docs/tricks' },
      ]
    },
    {
      section: 'Dla programistów',
      items: [
        { title: 'API', href: '/docs/api' },
        { title: 'Modyfikacje', href: '/docs/mods' },
        { title: 'Tworzenie tras', href: '/docs/track-creation' },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-violet-50">
      <Navbar />
      
      {/* Mobile sidebar toggle */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed left-4 top-20 z-40 md:hidden bg-blue-600 text-white p-3 rounded-full shadow-lg"
        aria-label="Toggle documentation menu"
      >
        <FaChevronRight className={`transition-transform duration-300 ${isSidebarOpen ? 'rotate-180' : ''}`} />
      </button>

      <div className="container mx-auto pt-24 pb-16 px-4 flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside 
          className={`
            md:w-64 lg:w-72 flex-shrink-0 bg-white rounded-xl shadow-md overflow-hidden
            fixed md:sticky top-20 left-0 h-[calc(100vh-5rem)] z-30 md:z-10 transform
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            transition-transform duration-300 ease-in-out
          `}
        >
          {/* Search box */}
          <div className="p-4 border-b border-gray-100">
            <div className="relative">
              <input
                type="text"
                placeholder="Szukaj w dokumentacji..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 pl-10 pr-4 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="p-4 h-full overflow-y-auto">
            {navItems.map((section, idx) => (
              <div key={idx} className="mb-6">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">
                  {section.section}
                </h3>
                <ul className="space-y-1">
                  {section.items.map((item, itemIdx) => (
                    <li key={itemIdx}>
                      <a 
                        href={item.href} 
                        className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            
            <div className="mt-auto pt-6 border-t border-gray-100">
              <a 
                href="https://github.com/twoja-nazwa/kayak-racing" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <FaGithub />
                <span>GitHub Repository</span>
              </a>
            </div>
          </nav>
        </aside>
        
        {/* Sidebar backdrop for mobile */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        
        {/* Main content */}
        <main className="flex-grow md:ml-6 mt-6 md:mt-0 transition-all duration-300">
          <div className="bg-white rounded-xl shadow-md p-6 md:p-10">
            {children}
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default DocsLayout;