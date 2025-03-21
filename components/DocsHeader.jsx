'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// Reusing animation patterns from your existing components
const DocsHeader = ({ title, description, tags = [] }) => {
  const headerRef = useRef(null);

  useEffect(() => {
    if (!headerRef.current) return;
    
    // Simple entrance animation
    const headerAnimation = gsap.timeline();
    
    headerAnimation.fromTo(
      headerRef.current.querySelector('.docs-title'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
    );
    
    headerAnimation.fromTo(
      headerRef.current.querySelector('.docs-description'),
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
      '-=0.4'
    );
    
    headerAnimation.fromTo(
      headerRef.current.querySelectorAll('.docs-tag'),
      { y: 10, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.4, ease: 'power2.out' },
      '-=0.3'
    );
    
    return () => {
      headerAnimation.kill();
    };
  }, [title, description]);

  return (
    <header ref={headerRef} className="mb-10 pb-6 border-b border-gray-200">
      <h1 className="docs-title text-3xl md:text-4xl font-bold text-blue-800 mb-3">
        {title}
      </h1>
      
      {description && (
        <p className="docs-description text-lg text-gray-600 mb-4">
          {description}
        </p>
      )}
      
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span 
              key={index} 
              className="docs-tag px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </header>
  );
};

export default DocsHeader;