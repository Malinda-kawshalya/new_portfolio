import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { motion, useScroll, useTransform } from 'framer-motion';
import ProjectCard from '../components/ui/ProjectCard';
import { projects } from '../lib/data/projects';
import '../styles/project.css';

export default function Projects() {
  const [filter, setFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [animateCards, setAnimateCards] = useState(false);

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const opacitySection = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const yPosSection = useTransform(scrollYProgress, [0, 0.2], [100, 0]);

  // Get unique tech categories from all projects
  const allTech = [...new Set(projects.flatMap(project => project.tech))].sort();

  // Handle filter change
  useEffect(() => {
    setAnimateCards(false);
    setTimeout(() => {
      if (filter === 'all') {
        setFilteredProjects(projects);
      } else {
        const filtered = projects.filter(project => project.tech.includes(filter));
        setFilteredProjects(filtered);
      }
      setAnimateCards(true);
    }, 300);
  }, [filter]);

  // Trigger initial animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateCards(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Head>
        <title>Cosmic Projects | Portfolio</title>
        <meta name="description" content="Explore my stellar portfolio of web development and 3D projects" />
      </Head>

      


      {/* Projects Hero with Parallax Effect */}
      <motion.section
        ref={sectionRef}
        style={{ opacity: opacitySection, y: yPosSection }}
        className="cosmic-hero relative pt-40 pb-24 px-4 md:px-8 overflow-hidden"
      >
        
        <div className="hero-rings"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="text-center space-y-6"
          >
            <div className="cosmic-title">
              <h1 className="text-4xl md:text-6xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00ffcc] to-[#ff00ff]">
                Cosmic Projects
              </h1>
              <div className="title-glow"></div>
            </div>

            <p className="text-xl text-[#e0e0e0] max-w-3xl mx-auto">
              A constellation of my work in web development, interactive 3D experiences, and creative coding.
            </p>

          </motion.div>
        </div>
      </motion.section>

      {/* Filter Section with Glowing Effect */}
      <section className="px-4 md:px-8 mb-16 relative z-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="filter-container p-4 rounded-lg bg-opacity-20 backdrop-filter backdrop-blur-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setFilter('all')}
                className={`cosmic-button px-5 py-2 rounded-full text-sm font-orbitron font-medium transition-all ${
                  filter === 'all' ? 'active' : ''
                }`}
              >
                <span>All Projects</span>
              </button>
              {allTech.map(tech => (
                <button
                  key={tech}
                  onClick={() => setFilter(tech)}
                  className={`cosmic-button px-5 py-2 rounded-full text-sm font-orbitron font-medium transition-all ${
                    filter === tech ? 'active' : ''
                  }`}
                >
                  <span>{tech}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid with 3D Card Effects */}
      <section className="px-4 md:px-8 pb-32 relative z-20">
        <div className="max-w-7xl mx-auto">
          {filteredProjects.length === 0 ? (
            <motion.div
              className="text-center py-24"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-[#00ffcc] text-xl mb-6">No cosmic discoveries found with this technology.</p>
              <button
                onClick={() => setFilter('all')}
                className="cosmic-button active px-8 py-3 rounded-full"
              >
                <span>View All Projects</span>
              </button>
            </motion.div>
          ) : (
            <div className="projects-grid">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="project-card-wrapper"
                  initial={{ opacity: 0, y: 50, rotateY: -15 }}
                  animate={animateCards ? { opacity: 1, y: 0, rotateY: 0 } : {}}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.1,
                    type: 'spring',
                    stiffness: 100,
                  }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </div>
          )}
        </div>


      </section>
    </>
  );
}