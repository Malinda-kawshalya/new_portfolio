import { useEffect, useRef, useState, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Float, PerspectiveCamera, Text3D, Center } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import * as THREE from 'three';
import { motion, useScroll, useTransform } from 'framer-motion';

// 3D Models and Components
function FloatingLaptop(props) {
  const mesh = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    mesh.current.rotation.y = Math.sin(t / 4) / 4;
    mesh.current.position.y = Math.sin(t / 1.5) / 10;
  });

  return (
    <group {...props} dispose={null}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <group ref={mesh}>
          {/* Base of laptop */}
          <mesh position={[0, 0, 0]} castShadow>
            <boxGeometry args={[1.2, 0.1, 0.8]} />
            <meshStandardMaterial color="#333" />
          </mesh>
          
          {/* Screen of laptop */}
          <mesh position={[0, 0.3, -0.3]} rotation={[Math.PI/6, 0, 0]} castShadow>
            <boxGeometry args={[1.1, 0.7, 0.05]} />
            <meshStandardMaterial color="#222" />
          </mesh>
          
          {/* Screen display */}
          <mesh position={[0, 0.3, -0.27]} rotation={[Math.PI/6, 0, 0]} castShadow>
            <planeGeometry args={[1, 0.6]} />
            <meshStandardMaterial color="#1E90FF" emissive="#0066CC" emissiveIntensity={0.5} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

function FloatingBooks(props) {
  const group = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = Math.sin(t / 3) / 3;
    group.current.position.y = Math.sin(t / 2) / 15;
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.6}>
      <group ref={group} {...props}>
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[1, 0.1, 0.7]} />
          <meshStandardMaterial color="#4285F4" />
        </mesh>
        <mesh position={[0, 0.15, 0]} castShadow>
          <boxGeometry args={[0.9, 0.1, 0.65]} />
          <meshStandardMaterial color="#DB4437" />
        </mesh>
        <mesh position={[0, 0.3, 0]} castShadow>
          <boxGeometry args={[0.95, 0.1, 0.68]} />
          <meshStandardMaterial color="#F4B400" />
        </mesh>
      </group>
    </Float>
  );
}

function ParticleField() {
  const count = 1000;
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Position
      positions[i3] = (Math.random() - 0.5) * 20;
      positions[i3 + 1] = (Math.random() - 0.5) * 20;
      positions[i3 + 2] = (Math.random() - 0.5) * 20;
      
      // Color
      colors[i3] = Math.random() * 0.5 + 0.5; // r
      colors[i3 + 1] = Math.random() * 0.5 + 0.5; // g
      colors[i3 + 2] = Math.random() * 0.5 + 0.5; // b
    }
    
    return [positions, colors];
  }, [count]);
  
  const pointsRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = time * 0.05;
    pointsRef.current.rotation.z = time * 0.03;
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
        opacity={0.8}
      />
    </points>
  );
}

function FloatingName({ text }) {
  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
      <Center>
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={0.5}
          height={0.1}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          {text}
          <meshStandardMaterial 
            color="#8A2BE2" 
            emissive="#4B0082"
            metalness={0.8}
            roughness={0.2}
          />
        </Text3D>
      </Center>
    </Float>
  );
}

function Scene({ scrollY }) {
  const { camera } = useThree();
  const cameraPositionZ = useTransform(scrollY, [0, 1000], [5, 10]);
  
  useEffect(() => {
    const unsubscribeZ = cameraPositionZ.onChange(v => {
      camera.position.z = v;
    });
    
    return () => {
      unsubscribeZ();
    };
  }, [cameraPositionZ, camera]);
  
  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      
      <FloatingName text="Malinda Kawshalya" position={[0, 2, 0]} />
      <FloatingLaptop position={[-2, 0, 0]} />
      <FloatingBooks position={[2, 0, 0]} />
      <ParticleField />
      
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
      />
      
      <EffectComposer>
        <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} />
        <ChromaticAberration offset={[0.0005, 0.0005]} />
      </EffectComposer>
    </>
  );
}

export default function Home() {
  const { scrollY } = useScroll();
  const containerRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Simulate loading of 3D assets
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Personal Information
  const personalInfo = {
    name: "MALINDA KAWSHALYA",
    title: "Computer Science Undergraduate",
    university: "NSBM Green University",
    location: "Sri Lanka",
    year: "3rd Year",
    skills: ["React", "Three.js", "JavaScript", "WebGL", "UI/UX Design", "3D Modeling"],
    bio: "I'm a passionate Computer Science student with a focus on interactive web experiences and 3D graphics. Currently exploring the intersection of art and technology to create immersive digital solutions."
  };
  
  // Projects
  const projects = [
    {
      id: 1,
      title: "Interactive Learning Platform",
      description: "A 3D educational platform using WebGL and Three.js",
      tech: ["React", "Three.js", "Node.js"],
    },
    {
      id: 2,
      title: "Student Portfolio",
      description: "A personal showcase featuring advanced animations and 3D elements",
      tech: ["Next.js", "Three.js", "GSAP"],
    },
    {
      id: 3,
      title: "AR Campus Guide",
      description: "Augmented reality application for university navigation",
      tech: ["React Native", "AR.js", "Firebase"],
    },
  ];
  
  return (
    <>
      <Head>
        <title>{personalInfo.name} | Student Portfolio</title>
        <meta name="description" content={`Portfolio website for ${personalInfo.name}, ${personalInfo.title}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {/* Loading Screen */}
      <motion.div 
        className="loading-screen"
        initial={{ opacity: 1 }}
        animate={{ opacity: isLoaded ? 0 : 1, pointerEvents: isLoaded ? 'none' : 'all' }}
        transition={{ duration: 1 }}
      >
        <div className="loader"></div>
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Loading Experience
        </motion.h2>
      </motion.div>
      
      <div className="portfolio-container" ref={containerRef}>
        {/* 3D Hero Section */}
        <section className="hero-section">
          <div className="canvas-container">
            <Canvas shadows camera={{ position: [0, 0, 5], fov: 75 }}>
              <Scene scrollY={scrollY} />
            </Canvas>
          </div>
          
          <div className="hero-content">
            <motion.div
              className="hero-text"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 50 }}
              transition={{ delay: 2.5, duration: 0.8 }}
            >
              <h1>{personalInfo.name}</h1>
              <h2>{personalInfo.title} @ {personalInfo.university}</h2>
              
              <div className="hero-cta">
                <button 
                  className="btn-primary"
                  onClick={() => aboutRef.current.scrollIntoView({ behavior: 'smooth' })}
                >
                  About Me
                </button>
                <button 
                  className="btn-secondary"
                  onClick={() => projectsRef.current.scrollIntoView({ behavior: 'smooth' })}
                >
                  My Projects
                </button>
              </div>
            </motion.div>
            
            <motion.div 
              className="scroll-indicator"
              initial={{ opacity: 0 }}
              animate={{ opacity: isLoaded ? 1 : 0 }}
              transition={{ delay: 3, duration: 0.8 }}
            >
              <span>Scroll to explore</span>
              <div className="mouse">
                <div className="wheel"></div>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* About Section */}
        <section className="about-section" ref={aboutRef}>
          <div className="section-container">
            <motion.div
              className="about-content"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="about-text">
                <h2 className="section-heading">About Me</h2>
                <p className="bio">{personalInfo.bio}</p>
                
                <div className="skill-container">
                  <h3>My Skills</h3>
                  <div className="skills">
                    {personalInfo.skills.map((skill, index) => (
                      <motion.span 
                        key={index} 
                        className="skill-tag"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        viewport={{ once: true }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
                
                <div className="education">
                  <h3>Education</h3>
                  <div className="timeline-item">
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <h4>{personalInfo.university}</h4>
                      <p>Computer Science, {personalInfo.year}</p>
                      <span className="timeline-date">2022 - Present</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="about-image">
                <div className="photo-frame">
                  <div className="photo">
                    {/* Replace with your actual photo */}
                    <img src="/images/profile.png" alt="Your Photo" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="geometric-bg">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
          </div>
        </section>
        
        {/* Projects Section */}
        <section className="projects-section" ref={projectsRef}>
          <div className="section-container">
            <motion.h2 
              className="section-heading text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              My Projects
            </motion.h2>
            
            <div className="projects-grid">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="project-card"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{ 
                    y: -10,
                    boxShadow: "0 20px 30px rgba(0, 0, 0, 0.2)",
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className="project-image">
                    {/* Replace with actual project images */}
                    <img src={`/images/projects/project${project.id}.png`} alt={project.title} />
                    <div className="project-overlay">
                      <span>View Project</span>
                    </div>
                  </div>
                  
                  <div className="project-info">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    
                    <div className="project-tech">
                      {project.tech.map((tech) => (
                        <span key={tech} className="tech-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className="projects-cta"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Link href="/projects" className="btn-primary">
                View All Projects
              </Link>
            </motion.div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section className="contact-section">
          <motion.div 
            className="contact-card"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2>Let's Connect</h2>
            <p>I'm currently looking for internship and collaboration opportunities</p>
            
            <div className="contact-links">
              <a href="mailto:youremail@example.com" className="contact-link email">
                youremail@example.com
              </a>
              <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="contact-link github">
                GitHub
              </a>
              <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="contact-link linkedin">
                LinkedIn
              </a>
            </div>
            
            <Link href="/contact" className="btn-secondary">
              Get In Touch
            </Link>
          </motion.div>
        </section>
      </div>
    </>
  );
}