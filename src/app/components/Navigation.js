'use client';

import { useState } from 'react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Certificates', href: '#certificates' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <nav className="navbar">
      <div className="nav-content">
        <div className="logo">GK</div>
        
        {/* Desktop Navigation */}
        <ul className="nav-links desktop">
          {navItems.map((item) => (
            <li key={item.label}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Toggle */}
        <button 
          className={`mobile-menu-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <ul className="nav-links mobile">
            {navItems.map((item) => (
              <li key={item.label}>
                <a href={item.href} onClick={handleLinkClick}>{item.label}</a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
}
