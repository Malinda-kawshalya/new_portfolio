import { motion } from 'framer-motion';

export default function SkillItem({ name, icon }) {
  return (
    <motion.div
      className="skill-item"
      whileHover={{
        scale: 1.1,
        rotateX: 15,
        rotateY: 15,
        boxShadow: '0 20px 30px rgba(0, 0, 0, 0.4), 0 0 30px rgba(0, 255, 204, 0.5)',
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
    >
      <motion.div
        className="skill-icon"
        animate={{ y: [-10, 10], rotateX: [-5, 5], rotateY: [-5, 5] }}
        transition={{ repeat: Infinity, repeatType: 'reverse', duration: 4 }}
      >
        <span className="skill-icon-emoji">{icon}</span>
      </motion.div>
      <h3 className="skill-name">{name}</h3>
    </motion.div>
  );
}