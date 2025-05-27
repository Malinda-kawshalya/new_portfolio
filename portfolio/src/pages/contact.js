import Head from 'next/head';
import { useEffect, useState } from 'react';
import ContactForm from '../components/ui/ContactForm';
import '../styles/contact.css';

const Contact = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate floating particles
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      size: Math.random() * 5 + 1,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: `${Math.random() * 15 + 10}s`,
      delay: `${Math.random() * 5}s`,
    }));
    
    setParticles(newParticles);
  }, []);

  return (
    <>
      <Head>
        <title>Contact Me | Cosmic Portfolio</title>
        <meta name="description" content="Get in touch with me to discuss your project or just say hello!" />
      </Head>
      
      <div className="contact-page">
        <div className="floating-particles">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="particle"
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                left: particle.left,
                top: particle.top,
                animationDuration: particle.duration,
                animationDelay: particle.delay,
              }}
            />
          ))}
        </div>
        
        <div className="contact-container">
          <div className="contact-header">
            <h1>Get In Touch</h1>
            
          </div>
          
          <div className="contact-grid">
            <div className="contact-info">
              <h3>Contact Information</h3>
              
              <div className="contact-method">
                <div className="contact-method-title">
                  <span className="contact-icon">📧</span>
                  Email
                </div>
                <a href="mailto:malindakawshalya@gmail.com">malindakawshalya@Gmail.com</a>
              </div>
              
              <div className="contact-method">
                <div className="contact-method-title">
                  <span className="contact-icon">📱</span>
                  Phone
                </div>
                <p>+94 76 256 8438 </p>
              </div>
              
              <div className="contact-method">
                <div className="contact-method-title">
                  <span className="contact-icon">📍</span>
                  Location
                </div>
                <p>Homagama, Sri Lanka</p>
              </div>
              
              <div className="social-links">
                <a href="https://github.com/Malinda-kawshalya" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
                  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </a>
                <a href="inkedin.com/in/malinda-kawshalya-270872267/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
<a href="https://www.facebook.com/share/19Hw8wbFWk/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
</a>
              </div>
            </div>
            
            <ContactForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;