import React from 'react';
import SkillItem from '../components/ui/SkillItem';
import { skills } from '../lib/data/skills';
import '../styles/globals.css';

const About = () => {
  return (
    <div className="about-page">
      <section className="about-section">
        <img src="/images/profile.png" alt="Profile" className="profile-image" />
        <h1>About Me</h1>
        <p>
          I'm a passionate developer exploring the universe of code. My mission is
          to create stellar applications and share my journey through the cosmos.
        </p>
      </section>
      <section className="skills-section">
        <h2>My Skills</h2>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <SkillItem key={index} name={skill.name} icon={skill.icon} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;