import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import SpaceBackground from '../three/SpaceBackground';
import '../../styles/globals.css';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <SpaceBackground />
      <Navbar />
      <main className="main-content">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;