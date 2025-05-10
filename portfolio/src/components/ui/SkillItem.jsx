import React from 'react';
import '../../styles/globals.css';

const SkillItem = ({ name, icon }) => {
  return (
    <div className="skill-item">
      <img src={icon} alt={name} className="skill-icon" />
      <span>{name}</span>
    </div>
  );
};

export default SkillItem;