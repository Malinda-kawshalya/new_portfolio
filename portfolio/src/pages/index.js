import { useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Hero section animation variants
const heroVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      staggerChildren: 0.2,
    },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  const projectsRef = useRef(null);
  
  // Sample featured projects
  const featuredProjects = [
    {
      id: 1,
      title: 'Project Alpha',
      description: 'A futuristic 3D visualization dashboard.',
      tech: ['React', 'Three.js', 'WebGL'],
      image: '/images/projects/project1.jpg', // Replace with your image
    },
    {
      id: 2,
      title: 'Project Orbit',
      description: 'Space-themed social networking platform.',
      tech: ['Next.js', 'Firebase', 'Tailwind CSS'],
      image: '/images/projects/project2.jpg', // Replace with your image
    },
    {
      id: 3,
      title: 'Stellar Database',
      description: 'Interactive database of celestial objects.',
      tech: ['Node.js', 'MongoDB', 'D3.js'],
      image: '/images/projects/project3.jpg', // Replace with your image
    },
  ];
  
  return (
    <>
      <Head>
        <title>Your Name | Space-Themed Portfolio</title>
        <meta name="description" content="Portfolio website for Your Name, featuring web development and 3D space-themed projects" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center px-4 relative overflow-hidden">
        <motion.div
          className="text-center space-y-6 z-10"
          variants={heroVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-white"
            variants={itemVariant}
          >
            <span className="text-space-accent">{'<'}</span>
            Your Name
            <span className="text-space-accent">{' />'}</span>
          </motion.h1>
          
          <motion.h2 
            className="text-2xl md:text-3xl text-gray-300"
            variants={itemVariant}
          >
            Full-Stack Developer & 3D Enthusiast
          </motion.h2>
          
          <motion.p 
            className="max-w-2xl mx-auto text-gray-400 text-lg"
            variants={itemVariant}
          >
            Creating immersive digital experiences through the fusion of code and creativity, exploring the frontiers of web development and 3D visualization.
          </motion.p>
          
          <motion.div 
            className="flex justify-center space-x-4 pt-6"
            variants={itemVariant}
          >
            <Link href="/projects" className="btn-primary">
              View Projects
            </Link>
            <Link 
              href="/contact" 
              className="border border-space-accent text-white hover:bg-space-accent font-bold py-2 px-4 rounded-md transition-all duration-300"
            >
              Get In Touch
            </Link>
          </motion.div>
        </motion.div>
        
        {/* Scrolldown indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <button 
            onClick={() => projectsRef.current.scrollIntoView({ behavior: 'smooth' })}
            aria-label="Scroll to projects"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </motion.div>
      </section>
      
      {/* Featured Projects Section */}
      <section 
        ref={projectsRef}
        className="section-container"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="section-heading text-center">Featured Projects</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {featuredProjects.map((project) => (
              <motion.div
                key={project.id}
                className="bg-space-light bg-opacity-30 backdrop-blur-sm rounded-lg overflow-hidden border border-space-light hover:border-space-accent transition-all duration-300"
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className="h-48 bg-gray-800 relative">
                  {/* Replace this with your actual project image */}
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                    {/* Placeholder for project image */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span 
                        key={tech} 
                        className="text-xs bg-space-accent bg-opacity-20 text-space-highlight px-2 py-1 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <Link 
                    href={`/projects#${project.id}`}
                    className="text-space-highlight hover:text-space-accent transition-colors inline-flex items-center"
                  >
                    View Project
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link href="/projects" className="btn-primary">
              View All Projects
            </Link>
          </div>
        </motion.div>
      </section>
      
      {/* Skills Section */}
      <section className="section-container bg-black bg-opacity-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="section-heading text-center">My Skills</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-12">
            {['React', 'Next.js', 'Three.js', 'WebGL', 'Node.js', 'MongoDB', 'Tailwind CSS', 'TypeScript'].map((skill) => (
              <motion.div
                key={skill}
                className="bg-space-light bg-opacity-20 backdrop-blur-sm rounded-lg p-6 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-lg font-medium text-white">{skill}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
      
      {/* CTA Section */}
      <section className="section-container">
        <motion.div
          className="bg-gradient-to-r from-space-dark to-space-light p-8 md:p-12 rounded-xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Let's Work Together</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
          </p>
          <Link href="/contact" className="btn-primary text-lg px-8 py-3">
            Get In Touch
          </Link>
        </motion.div>
      </section>
    </>
  );
}