import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Stars, OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';
import dynamic from 'next/dynamic';
import Footer from '../components/layout/Footer';
import '../styles/home.css';

// Dynamically import GSAP to avoid SSR issues
const GSAPComponent = dynamic(() => 
  import('../components/GSAPComponent').then(mod => mod.default), 
  { ssr: false }
);

// Enhanced Space Station component
function SpaceStation({ mouse }) {
  const mesh = useRef();
  const group = useRef();
  const { scene } = useGLTF('/models/space_station.glb');
  
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    group.current.rotation.y += delta * 0.1;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      mouse.current.y * 0.2,
      0.1
    );
    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z,
      mouse.current.x * 0.2,
      0.1
    );
    
    // Animate individual parts
    if (mesh.current && mesh.current.children) {
      mesh.current.children.forEach((child, i) => {
        child.rotation.y += Math.sin(t + i) * 0.01;
      });
    }
  });

  return (
    <group ref={group} scale={[0.5, 0.5, 0.5]}>
      <primitive ref={mesh} object={scene} />
      <pointLight intensity={2} position={[5, 5, 5]} color="#00ffcc" />
    </group>
  );
}

// Enhanced Star Field with dynamic movement
function StarField({ mouse }) {
  const starsRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    starsRef.current.rotation.y += mouse.current.x * 0.001;
    starsRef.current.rotation.x += mouse.current.y * 0.001;
    starsRef.current.position.z = Math.sin(t * 0.1) * 2;
  });

  return (
    <Stars
      ref={starsRef}
      radius={150}
      depth={80}
      count={8000}
      factor={6}
      saturation={1}
      fade
      speed={2}
    />
  );
}

// Interactive Particle System
function FloatingParticles({ mouse }) {
  const particlesRef = useRef();
  const count = 200;
  const [positions] = useState(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    return positions;
  });

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const positions = particlesRef.current.geometry.attributes.position.array;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const x = positions[i3];
      const y = positions[i3 + 1];
      const z = positions[i3 + 2];
      
      // Add mouse interaction
      const dx = x - mouse.current.x * 20;
      const dy = y - mouse.current.y * 20;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      positions[i3 + 1] += Math.sin(time + i) * 0.02;
      if (dist < 10) {
        positions[i3] += dx * 0.01;
        positions[i3 + 1] += dy * 0.01;
      }
    }
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  // Lazy load texture to avoid SSR issues
  const [texture, setTexture] = useState(null);
  useEffect(() => {
    new THREE.TextureLoader().load('/particle.png', loadedTexture => {
      setTexture(loadedTexture);
    });
  }, []);

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color="#00ffcc"
        transparent
        opacity={0.8}
        sizeAttenuation
        map={texture}
      />
    </points>
  );
}

// Enhanced Skill Item with hover animations
const SkillItem = ({ icon, name, delay = 0 }) => {
  const ref = useRef();
  
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    const element = ref.current;
    
    const handleMouseEnter = () => {
      element.style.transform = 'scale(1.05)';
      const iconElement = element.querySelector('.skill-icon');
      if (iconElement) {
        iconElement.style.transition = 'transform 0.5s ease';
        iconElement.style.transform = 'rotate(360deg)';
      }
    };
    
    const handleMouseLeave = () => {
      element.style.transform = 'scale(1)';
    };
    
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      className="skill-item"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      <div className="skill-icon">{icon}</div>
      <p>{name}</p>
    </motion.div>
  );
};

// Enhanced Project Card
const ProjectCard = ({ title, description, image, link, delay = 0 }) => {
  const ref = useRef();

  return (
    <motion.div
      ref={ref}
      className="project-card"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      <div className="project-image">
        <div
          className="image-placeholder"
          style={{ background: `linear-gradient(45deg, #00ffcc, #ff00ff)` }}
        />
      </div>
      <div className="project-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <Link href={link} className="project-link">
          View Project
        </Link>
      </div>
    </motion.div>
  );
};

// Loading Animation Component
const LoadingAnimation = () => (
  <motion.div
    className="loading-screen"
    initial={{ opacity: 1 }}
    animate={{ opacity: 0 }}
    transition={{ duration: 1, delay: 2 }}
  >
    <div className="loading-spinner">
      <div className="orbit">
        <div className="planet"></div>
      </div>
    </div>
  </motion.div>
);

// Main scene component with Three.js elements
const Scene = ({ mouse }) => {
  return (
    <Canvas camera={{ position: [0, 0, 15], fov: 70 }}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      <Suspense fallback={null}>
        <SpaceStation mouse={mouse} />
      </Suspense>
      <StarField mouse={mouse} />
      <FloatingParticles mouse={mouse} />
      <Environment preset="sunset" />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  );
};

// Import Suspense separately to avoid bundling issues
const Suspense = dynamic(() => 
  Promise.resolve(React.Suspense),
  { ssr: false }
);

// Main ThreeJS Hero component
const ThreeJSHero = dynamic(() => Promise.resolve(({ mouse }) => (
  <div className="hero-canvas">
    <Suspense fallback={<div className="loading-fallback">Loading 3D Scene...</div>}>
      <Scene mouse={mouse} />
    </Suspense>
  </div>
)), { ssr: false });

// Main Home Component
export default function Home() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);
  const titleY = useTransform(scrollYProgress, [0, 0.3], [0, -150]);
  const mouse = useRef({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Mouse movement handler
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Simulate loading
    setTimeout(() => setIsLoaded(true), 2500);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <Head>
        <title>Malinda Kawshalya | Cosmic Portfolio</title>
        <meta name="description" content="Interactive web developer creating cosmic digital experiences" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Rajdhani:wght@300;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      {!isLoaded && <LoadingAnimation />}

      {/* Hero Section */}
      <motion.section
        className="hero-section"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        {isMounted && <ThreeJSHero mouse={mouse} />}

        <div className="hero-content">
          <motion.div className="hero-text" style={{ y: titleY }}>
            <h1 className="hero-title">
              <span className="title-accent">{'<'}</span>
              Malinda Kawshalya
              <span className="title-accent">{'/>'}</span>
            </h1>
            <h2 className="hero-subtitle">Cosmic Web Architect</h2>
            <p className="hero-description">
              Crafting immersive digital galaxies with cutting-edge technology
            </p>
            <div className="hero-buttons">
              <Link href="/projects" className="btn btn-primary">
                Explore Universe
              </Link>
              <Link href="/contact" className="btn btn-secondary">
                Connect Now
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="scroll-indicator">
          <div className="mouse">
            <div className="wheel"></div>
          </div>
          <div className="arrow-container">
            <div className="arrow"></div>
          </div>
        </div>
      </motion.section>

      {/* Use client-side only GSAP component */}
      {isMounted && <GSAPComponent />}

      {/* About Section */}
      <section className="about-section section" id="about">
        <div className="container">
          <motion.div
            className="section-title"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2>
              <span className="title-accent">{'<'}</span> About Me{' '}
              <span className="title-accent">{'/>'}</span>
            </h2>
          </motion.div>

          <div className="about-content">
            <motion.div
              className="about-text"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p>
                Greetings, cosmic traveler! I'm{' '}
                <span className="highlight">Malinda Kawshalya</span>, a web developer
                orbiting the intersection of technology and creativity.
              </p>
              <p>
                My mission: to craft stellar web experiences using modern frameworks
                and 3D graphics, creating digital universes that captivate and inspire.
              </p>
              <p>
                When not navigating the code cosmos, I'm exploring new tech constellations,
                contributing to open-source galaxies, or stargazing at the wonders of the universe.
              </p>
            </motion.div>

            <motion.div
              className="about-image"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
<div className="profile-image-container">
  <div className="profile-image-placeholder">
    <img 
      src="/images/malinda.jpg" 
      alt="Malinda Kawshalya" 
      className="profile-photo"
    />
  </div>
                <div className="tech-orbit">
                  <div className="tech-planet p1">
                    <span>React</span>
                  </div>
                  <div className="tech-planet p2">
                    <span>Three.js</span>
                  </div>
                  <div className="tech-planet p3">
                    <span>Next.js</span>
                  </div>
                  <div className="tech-planet p4">
                    <span>GSAP</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="skills-section section" id="skills">
        <div className="container">
          <motion.div
            className="section-title"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2>
              <span className="title-accent">{'<'}</span> Skills{' '}
              <span className="title-accent">{'/>'}</span>
            </h2>
          </motion.div>

          <div className="skills-grid">
            <SkillItem icon="⚛️" name="React" delay={0.1} />
            <SkillItem icon="🔷" name="TypeScript" delay={0.2} />
            <SkillItem icon="📱" name="Responsive Design" delay={0.3} />
            <SkillItem icon="🎨" name="Tailwind CSS" delay={0.4} />
            <SkillItem icon="🌐" name="Three.js" delay={0.5} />
            <SkillItem icon="⚡" name="Next.js" delay={0.6} />
            <SkillItem icon="🎥" name="GSAP" delay={0.7} />
            <SkillItem icon="🖥️" name="WebGL" delay={0.8} />
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="projects-section section" id="projects">
        <div className="container">
          <motion.div
            className="section-title"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2>
              <span className="title-accent">{'<'}</span> Featured Projects{' '}
              <span className="title-accent">{'/>'}</span>
            </h2>
          </motion.div>

          <div className="projects-grid">
            <ProjectCard
              title="Galaxy Explorer"
              description="Interactive 3D galaxy visualization with real-time star field"
              link="/projects/galaxy-explorer"
              delay={0.1}
            />
            <ProjectCard
              title="Cosmic Dashboard"
              description="Advanced admin dashboard with WebGL visualizations"
              link="/projects/cosmic-dashboard"
              delay={0.3}
            />
            <ProjectCard
              title="Space Tourism"
              description="Immersive space tourism experience with VR support"
              link="/projects/space-tourism"
              delay={0.5}
            />
          </div>

          <motion.div
            className="view-all-projects"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <Link href="/projects" className="btn btn-secondary">
              Explore All Projects
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="contact-cta-section section">
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <h2>Ready to launch your cosmic project?</h2>
            <p>Let's create a stellar digital experience together</p>
            <Link href="/contact" className="btn btn-primary btn-large">
              Start Mission
            </Link>
          </motion.div>
        </div>
      </section>

      
    </>
  );
}