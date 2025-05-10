import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import '../../styles/header.css';

// Particle Background for Header
function ParticleBackground() {
  const count = 300;
  const pointsRef = useRef();

  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 20;
    positions[i3 + 1] = (Math.random() - 0.5) * 20;
    positions[i3 + 2] = (Math.random() - 0.5) * 20;
    colors[i3] = Math.random() * 0.5 + 0.5;
    colors[i3 + 1] = Math.random() * 0.5 + 0.5;
    colors[i3 + 2] = Math.random() * 0.5 + 0.5;
  }

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = time * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        sizeAttenuation={true}
        vertexColors
        transparent
        opacity={0.6}
      />
    </points>
  );
}

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="header-canvas">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ParticleBackground />
        </Canvas>
      </div>
      <div className="header-container">
        <motion.div
          className="header-logo"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Link href="/" className="logo-link">
            <div className="logo-container">
              <svg className="logo-svg" viewBox="0 0 60 60" aria-hidden="true">
                <circle className="logo-planet" cx="30" cy="30" r="15" />
                <circle className="logo-ring" cx="30" cy="30" r="20" />
                <circle className="logo-moon" cx="45" cy="30" r="3" />
                <circle className="logo-star star1" cx="10" cy="10" r="2" />
                <circle className="logo-star star2" cx="50" cy="15" r="1.5" />
                <circle className="logo-star star3" cx="15" cy="50" r="1.8" />
              </svg>
              <span className="logo-text">Malinda Kawshalya</span>
            </div>
          </Link>
        </motion.div>

        <button className="header-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          <svg className="toggle-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>

        <motion.nav
          className={`header-nav ${isOpen ? 'active' : ''}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <ul className="header-menu">
            <motion.li
              className="menu-item"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link href="/" className="menu-link">
                Home
              </Link>
            </motion.li>
            <motion.li
              className="menu-item"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link href="/about" className="menu-link">
                About
              </Link>
            </motion.li>
            <motion.li
              className="menu-item has-dropdown"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <button
                className="dropdown-toggle"
                onClick={toggleDropdown}
                aria-expanded={dropdownOpen}
              >
                Projects
                <svg
                  className={`dropdown-icon ${dropdownOpen ? 'rotated' : ''}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              <ul className={`dropdown-menu ${dropdownOpen ? 'active' : ''}`}>
                <li className="dropdown-item">
                  <Link href="/projects/web" className="dropdown-link">
                    Web Projects
                  </Link>
                </li>
                <li className="dropdown-item">
                  <Link href="/projects/3d" className="dropdown-link">
                    3D Projects
                  </Link>
                </li>
                <li className="dropdown-item">
                  <Link href="/projects/ar" className="dropdown-link">
                    AR Projects
                  </Link>
                </li>
              </ul>
            </motion.li>
            <motion.li
              className="menu-item"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Link href="/contact" className="menu-link">
                Contact
              </Link>
            </motion.li>
          </ul>
          <motion.div
            className="header-actions"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Link href="/contact" className="contact-button">
              Get in Touch
            </Link>
          </motion.div>
        </motion.nav>
      </div>
    </header>
  );
};

export default Header;