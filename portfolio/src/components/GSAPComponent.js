import React, { useEffect } from 'react';

// This component handles all GSAP animations
// It's dynamically imported to avoid SSR issues
export default function GSAPComponent() {
  useEffect(() => {
    // Import GSAP and ScrollTrigger only on the client side
    const importGSAP = async () => {
      const gsap = (await import('gsap')).default;
      const ScrollTrigger = (await import('gsap/dist/ScrollTrigger')).default;
      
      // Register plugins
      gsap.registerPlugin(ScrollTrigger);
      
      // GSAP animations
      gsap.utils.toArray('.section').forEach((section, i) => {
        gsap.from(section, {
          opacity: 0,
          y: 100,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        });
      });
      
      // Project card parallax effect
      document.querySelectorAll('.project-card').forEach(card => {
        gsap.to(card.querySelector('.project-image'), {
          yPercent: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            scrub: true,
          },
        });
      });
    };
    
    importGSAP().catch(console.error);
    
    // Cleanup function
    return () => {
      // Import ScrollTrigger again to kill all instances
      import('gsap/dist/ScrollTrigger').then(({ default: ScrollTrigger }) => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        ScrollTrigger.clearMatchMedia();
      });
    };
  }, []);
  
  // This component doesn't render anything
  return null;
}