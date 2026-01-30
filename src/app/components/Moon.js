'use client';

import { useEffect, useState } from 'react';

export default function Moon() {
  const [scrollY, setScrollY] = useState(0);
  const [moonOpacity, setMoonOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scroll = window.scrollY;
      setScrollY(scroll);

      // Calculate fade out based on scroll position
      // Assuming hero section is about 800-1000px, start fading at that point
      const fadeStartPoint = 700;
      const fadeEndPoint = 1000;
      
      if (scroll > fadeStartPoint) {
        const opacity = Math.max(0, 1 - (scroll - fadeStartPoint) / (fadeEndPoint - fadeStartPoint));
        setMoonOpacity(opacity);
      } else {
        setMoonOpacity(1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="moon-container" style={{ opacity: moonOpacity }}>
      <div 
        className="moon"
        style={{
          transform: `translateY(${scrollY * 2}px) rotate(${scrollY * 3}deg)`
        }}
      >
        <div className="moon-glow"></div>
        <div className="moon-craters">
          <div className="crater crater-1"></div>
          <div className="crater crater-2"></div>
          <div className="crater crater-3"></div>
        </div>
      </div>
    </div>
  );
}

