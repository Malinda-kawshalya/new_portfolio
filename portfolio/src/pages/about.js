
import { useRef } from 'react';
import Head from 'next/head';
import { motion, useScroll, useTransform } from 'framer-motion';
import SkillItem from '../components/ui/SkillItem';
import { skills } from '../lib/data/skills';
import '../styles/about.css';

export default function About() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const opacitySection = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const yPosSection = useTransform(scrollYProgress, [0, 0.2], [100, 0]);

  return (
    <>
      <Head>
        <title>About Me | Cosmic Portfolio</title>
        <meta
          name="description"
          content="Learn about my journey as a passionate developer exploring the universe of code."
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Rajdhani:wght@400;500;700&display=swap"
        />
      </Head>

      {/* Cosmic Background */}
      <div className="space-background">
        <div className="stars"></div>
        <div className="twinkling"></div>
        <div className="clouds"></div>
        <div className="pulsating-clouds"></div>
        <div className="shooting-stars">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="shooting-star"
              style={{
                animationDelay: `${Math.random() * 10}s`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* About Hero */}
        <motion.section
          ref={sectionRef}
          style={{ opacity: opacitySection, y: yPosSection }}
          className="cosmic-hero about-hero"
        >
          <div className="cosmic-title about-title">
            <motion.div
          className="profile-container"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
            >
          <img 
            src="/images/Malinda.jpg"
            alt="Malinda's profile" 
            className="profile-image" 
          />
            </motion.div>
            <h1>About Me</h1>
            <p>
          I'm a passionate developer exploring the universe of code. My mission is
          to create stellar applications that push the boundaries of technology
          and design. With a love for learning and a curiosity for the cosmos, I
          craft immersive digital experiences that resonate with users. Join me on
          this galactic journey as I share insights, projects, and discoveries
          through my portfolio.
            </p>
          </div>
        </motion.section>

        {/* Skills Section */}
      <section className="skills-section">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          My Skills
        </motion.h2>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                type: 'spring',
                stiffness: 150,
              }}
            >
              <SkillItem name={skill.name} icon={skill.icon} />
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
