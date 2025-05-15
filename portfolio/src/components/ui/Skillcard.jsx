
import { motion } from 'framer-motion';

export default function SkillItem({ name, icon }) {
  return (
    <motion.div
      className="skill-card"
      whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3), 0 0 15px rgba(0, 255, 204, 0.3)' }}
      transition={{ duration: 0.3 }}
    >
      <div className="skill-icon">
        <img src={icon} alt={`${name} icon`} />
      </div>
      <h3 className="skill-name">{name}</h3>
    </motion.div>
  );
}
