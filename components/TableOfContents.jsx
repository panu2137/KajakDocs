'use client';

import { useState, useEffect, useRef } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const TableOfContents = ({ headings = [] }) => {
  const [activeId, setActiveId] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const tocRef = useRef(null);

  // Auto-generate TOC from headings if none provided
  useEffect(() => {
    if (headings.length === 0 && typeof document !== 'undefined') {
      const headingElements = Array.from(document.querySelectorAll('h2, h3, h4'));
      const extractedHeadings = headingElements.map(heading => ({
        id: heading.id || heading.innerText.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, ''),
        text: heading.innerText,
        level: parseInt(heading.tagName.charAt(1)),
      }));
      
      // Apply IDs to headings if they don't have one
      headingElements.forEach((el, i) => {
        if (!el.id) {
          el.id = extractedHeadings[i].id;
        }
      });
    }
  }, [headings]);

  // Handle scrolling and active section highlighting
  useEffect(() => {
    const handleScroll = () => {
      if (typeof document === 'undefined') return;
      
      const headingElements = Array.from(document.querySelectorAll('h2, h3, h4'));
      
      // Find the current active heading based on scroll position
      for (let i = headingElements.length - 1; i >= 0; i--) {
        const heading = headingElements[i];
        const rect = heading.getBoundingClientRect();
        
        if (rect.top <= 100) {
          setActiveId(heading.id);
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initialize on mount
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Auto-close ToC on mobile when clicking a link
  const handleLinkClick = (e, id) => {
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
    // Smooth scroll with a small offset
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  // Determine if we have any headings to show
  const hasHeadings = headings.length > 0 || (typeof document !== 'undefined' && document.querySelectorAll('h2, h3, h4').length > 0);

  if (!hasHeadings) return null;

  return (
    <div className="relative mb-8" ref={tocRef}>
      {/* Mobile toggle */}
      <div 
        className="md:hidden flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-200 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-medium text-gray-700">Spis treści</h3>
        <FaChevronDown className={`text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      
      {/* ToC content */}
      <div className={`
        bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all
        mt-2 md:mt-0
        ${isOpen ? 'max-h-96' : 'max-h-0 md:max-h-none'}
        md:block
      `}>
        <div className="p-4">
          <h3 className="font-medium text-gray-700 mb-3 hidden md:block">Spis treści</h3>
          <nav>
            <ul className="space-y-2">
              {(headings.length > 0 ? headings : 
                Array.from(typeof document !== 'undefined' ? document.querySelectorAll('h2, h3, h4') : [])
                  .map(h => ({ 
                    id: h.id, 
                    text: h.innerText, 
                    level: parseInt(h.tagName.charAt(1)) 
                  }))
              ).map((heading, index) => (
                <li 
                  key={index} 
                  className={`
                    ${heading.level === 2 ? '' : heading.level === 3 ? 'ml-4' : 'ml-8'}
                  `}
                >
                  <a
                    href={`#${heading.id}`}
                    onClick={(e) => handleLinkClick(e, heading.id)}
                    className={`
                      block py-1 px-2 text-sm rounded hover:bg-blue-50 
                      ${activeId === heading.id 
                        ? 'text-blue-600 font-medium bg-blue-50' 
                        : 'text-gray-600'
                      }
                    `}
                  >
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default TableOfContents;