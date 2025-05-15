import React from 'react';
import Link from 'next/link';
import '../../styles/project.css';

const ProjectCard = ({ project }) => {
  const { title, description, image, link, tech } = project;
  
  return (
    <div className="project-card">
      <div className="project-image-container">
        <img 
          src={image || `https://via.placeholder.com/600x400?text=${title}`} 
          alt={title} 
          className="project-image" 
        />
      </div>
      
      <div className="project-content">
        <h3 className="project-title">{title}</h3>
        <p className="project-description">{description}</p>
        
        {tech && (
          <div className="project-tech">
            {tech.map((item, index) => (
              <span key={index} className="tech-badge">{item}</span>
            ))}
          </div>
        )}
        
        <Link href={link} className="project-link">
          View Project
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;