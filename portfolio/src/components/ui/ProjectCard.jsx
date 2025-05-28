import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ProjectCard = ({ project }) => {
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Handle mouse move for the card glow effect
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePosition({ x, y });
  };

  // Reset when mouse leaves
  const handleMouseLeave = () => {
    setMousePosition({ x: 50, y: 50 });
  };

  // Apply the CSS custom properties for the glow effect
  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.style.setProperty('--mouse-x', `${mousePosition.x}%`);
      cardRef.current.style.setProperty('--mouse-y', `${mousePosition.y}%`);
    }
  }, [mousePosition]);

  return (
    <div 
      className="project-card"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="project-image">
        <Image
          src={project.image}
          alt={project.title}
          width={500}
          height={300}
          priority
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
        />
      </div>
      
      <div className="project-content">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>
        
        <div className="project-tech">
          {project.tech.map((tech, index) => (
            <span key={index} className="tech-badge">
              {tech}
            </span>
          ))}
        </div>
        
        <div className="project-links">
          {project.demoLink && (
            <Link href={project.demoLink} passHref legacyBehavior>
              <a className="project-link" target="_blank" rel="noopener noreferrer">
                Live Demo
              </a>
            </Link>
          )}
          
          {project.codeLink && (
            <Link href={project.codeLink} passHref legacyBehavior>
              <a className="project-link" target="_blank" rel="noopener noreferrer">
                View Code
              </a>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;