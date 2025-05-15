
import { motion, AnimatePresence } from 'framer-motion';

export default function BlogCard({ blog, isExpanded, onReadMore }) {
  return (
    <div className="blog-card">
      <div className="blog-content">
        <span className="blog-category">{blog.category}</span>
        <h2 className="blog-title">{blog.title}</h2>
        <div className="blog-meta">
          <span>{blog.date}</span>
          <span>{blog.readTime}</span>
        </div>
        <p className="blog-description">{blog.excerpt}</p>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="blog-full-content"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <h3 className="blog-full-title">{blog.title}</h3>
              <p className="blog-full-text">{blog.content}</p>
            </motion.div>
          )}
        </AnimatePresence>
        <button onClick={onReadMore} className="cosmic-button blog-read-more">
          {isExpanded ? 'Read Less' : 'Read More'}
        </button>
      </div>
    </div>
  );
}
