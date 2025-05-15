import React from 'react';
import { motion } from 'framer-motion';

const ServiceCard = ({ icon, title, description, delay }) => {
  return (
    <motion.div
      className="service-card"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
    >
      <div className="service-icon">{icon}</div>
      <h3 className="service-title">{title}</h3>
      <p className="service-description">{description}</p>
    </motion.div>
  );
};

export default ServiceCard;