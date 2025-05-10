import React, { useState, useEffect } from 'react';
import '../../styles/header.css';
import { Menu, X, ChevronDown } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const menuItems = [
    { name: 'Home', link: '/' },
    { 
      name: 'Projects', 
      link: '#',
      hasDropdown: true,
      dropdown: [
        { name: 'Web Development', link: '/projects/web' },
        { name: 'Mobile Apps', link: '/projects/mobile' },
        { name: 'UI/UX Design', link: '/projects/design' }
      ]
    },
    { name: 'Skills', link: '/skills' },
    { name: 'About', link: '/about' },
    { name: 'Contact', link: '/contact' }
  ];

  return (
    <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
      <div className="header-container">
        <div className="header-logo">
          <a href="/" className="logo-link">
            <div className="logo-container">
              {/* SVG Logo - replace with your own SVG or image */}
              <svg 
                className="logo-svg" 
                viewBox="0 0 100 100" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="50" cy="50" r="40" className="logo-planet" />
                <ellipse cx="50" cy="50" rx="48" ry="12" className="logo-ring" />
                <circle cx="75" cy="30" r="5" className="logo-moon" />
                <circle cx="20" cy="40" r="3" className="logo-star star1" />
                <circle cx="80" cy="65" r="2" className="logo-star star2" />
                <circle cx="35" cy="80" r="4" className="logo-star star3" />
              </svg>
              <span className="logo-text">Cosmic Portfolio</span>
            </div>
          </a>
        </div>

        <button 
          className="header-toggle" 
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav className={`header-nav ${isMenuOpen ? 'active' : ''}`}>
          <ul className="header-menu">
            {menuItems.map((item, index) => (
              <li 
                key={index} 
                className={`menu-item ${item.hasDropdown ? 'has-dropdown' : ''}`}
              >
                {item.hasDropdown ? (
                  <>
                    <button 
                      className="dropdown-toggle"
                      onClick={() => toggleDropdown(index)}
                      aria-expanded={activeDropdown === index}
                    >
                      {item.name}
                      <ChevronDown 
                        size={16} 
                        className={`dropdown-icon ${activeDropdown === index ? 'rotated' : ''}`} 
                      />
                    </button>
                    <ul className={`dropdown-menu ${activeDropdown === index ? 'active' : ''}`}>
                      {item.dropdown.map((dropItem, idx) => (
                        <li key={idx} className="dropdown-item">
                          <a href={dropItem.link}>{dropItem.name}</a>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <a href={item.link}>{item.name}</a>
                )}
              </li>
            ))}
          </ul>
          <div className="header-actions">
            <a href="/contact" className="contact-button">Get In Touch</a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;