
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { motion, useScroll, useTransform } from 'framer-motion';
import BlogCard from '../components/ui/BlogCard';
import '../styles/blog.css';

// Sample blog data (~500 words each)
const blogs = [
  {
    id: 1,
    title: 'Crafting Cosmic Interfaces with WebGL',
    excerpt: 'Discover how WebGL and Three.js can create immersive 3D experiences for web interfaces.',
    category: 'Web Development',
    date: '2025-04-10',
    readTime: '8 min read',
    slug: 'cosmic-interfaces-webgl',
    content: `WebGL has revolutionized the way we approach web development, enabling developers to craft immersive 3D experiences directly in the browser. By leveraging the power of GPU acceleration, WebGL allows for the creation of visually stunning interfaces that feel like stepping into a sci-fi universe. In this post, we’ll explore how WebGL, combined with libraries like Three.js, can be used to build cosmic-inspired interfaces that captivate users.

Three.js simplifies the complexities of WebGL by providing a high-level API for rendering 3D scenes. Imagine a portfolio page where planets orbit a glowing star, or a navigation menu that feels like a spaceship dashboard. These effects are achievable by defining scenes, cameras, and renderers, then animating objects with shaders and textures. For instance, a rotating planet can be created using a \`SphereGeometry\` and a \`MeshStandardMaterial\` with a custom texture map to mimic a gas giant’s swirling clouds.

To enhance the cosmic theme, you can integrate particle systems to simulate stars or nebulae. A simple particle system in Three.js involves creating a \`Points\` object with a \`BufferGeometry\` and a \`PointsMaterial\`. By randomizing particle positions and adding subtle animations, you create a twinkling starfield effect. Adding interactivity, such as mouse-based camera controls with \`OrbitControls\`, allows users to explore the 3D space, making the experience more engaging.

Performance is critical when working with WebGL. To optimize, use techniques like level-of-detail (LOD) models to reduce polygon counts for distant objects and minimize draw calls by combining geometries. Additionally, leveraging compressed textures and instanced rendering can significantly improve frame rates on lower-end devices. Testing across devices ensures your cosmic interface is accessible to all users.

Integrating WebGL with React, using libraries like \`react-three-fiber\`, further streamlines development. This allows you to manage 3D scenes as React components, making state management and animations seamless. For example, you can animate a planet’s rotation based on user scroll position using Framer Motion’s \`useScroll\` hook, creating a parallax effect that enhances immersion.

In conclusion, WebGL and Three.js open up a universe of possibilities for web developers. By combining 3D graphics, animations, and interactivity, you can craft interfaces that feel otherworldly. Whether it’s a portfolio, a game, or a data visualization, the cosmic aesthetic resonates with users, leaving a lasting impression. Start experimenting with simple scenes and gradually build complexity to create your own galactic masterpiece. (Approx. 500 words)`,
  },
  {
    id: 2,
    title: 'Designing Galactic UI with React',
    excerpt: 'Learn how to build futuristic UI components with React and Framer Motion for a cosmic experience.',
    category: 'UI/UX',
    date: '2025-03-15',
    readTime: '6 min read',
    slug: 'galactic-ui-react',
    content: `Creating a galactic user interface with React involves blending modern web technologies with a futuristic aesthetic. The goal is to make users feel like they’re navigating a spaceship’s control panel or exploring a distant galaxy. This post explores how to achieve this using React, Framer Motion, and a cosmic design language.

Start with a dark theme to evoke the vastness of space. Use CSS custom properties for colors like \`--primary-color\` (#00ffcc) and \`--accent-color\` (#ff00ff) to create neon gradients. These can be applied to text, buttons, and borders using \`background-clip: text\` and \`box-shadow\` for glowing effects. For example, a button with a gradient underline that animates on hover can be styled with \`::after\` pseudo-elements.

Framer Motion is key to adding smooth animations. Use the \`motion\` component to animate elements on mount, such as a hero title fading in with \`initial={{ opacity: 0 }}\` and \`animate={{ opacity: 1 }}\`. For interactive elements, apply spring-based transitions to buttons or cards, giving them a floating, weightless feel. A \`useScroll\` hook can create parallax effects, like a planet moving as the user scrolls.

Components like cards benefit from 3D transforms. By wrapping a card in a \`motion.div\` with \`perspective: 1500px\`, you can apply \`rotateX\` and \`rotateY\` on hover to create a holographic effect. Adding a radial gradient overlay with \`::before\` enhances the futuristic vibe. For example, a blog card can scale slightly and tilt when hovered, with a glowing border that pulses.

Typography plays a crucial role in readability. Use fonts like Orbitron for headings to convey a sci-fi feel, paired with Rajdhani for body text to ensure clarity. Maintain high contrast with light text on dark backgrounds and use \`text-shadow\` to add subtle glows. For longer content, like blog posts, ensure line heights are around 1.5 and font sizes are at least 1rem for accessibility.

Accessibility is non-negotiable. Ensure buttons have sufficient click areas, use semantic HTML, and provide keyboard navigation. Test color contrast ratios to meet WCAG guidelines, especially with neon colors. For instance, \`--text-secondary\` (#b0b0b0) on \`--dark-bg\` (#0a0a23) should pass AA standards.

By combining React’s component-based architecture, Framer Motion’s animations, and a cosmic design system, you can create UI that feels both futuristic and functional. Experiment with particle effects, glowing borders, and 3D transforms to push the boundaries of web design. (Approx. 500 words)`,
  },
  {
    id: 3,
    title: 'The Art of Creative Coding',
    excerpt: 'Explore how creative coding blends art and technology to create cosmic visualizations.',
    category: 'Creative Coding',
    date: '2025-02-20',
    readTime: '10 min read',
    slug: 'art-creative-coding',
    content: `Creative coding is where art meets technology, allowing developers to create visually stunning and interactive experiences. In the context of a cosmic theme, it’s about crafting visualizations that evoke the wonder of the universe, from starfields to nebulae. This post explores how to use creative coding to build cosmic-inspired projects.

Start with a canvas-based approach using p5.js or Three.js. p5.js is great for 2D animations, like a starfield where each star twinkles with randomized opacity. Create a \`Particle\` class to manage star positions, velocities, and sizes, then animate them in a \`draw\` loop. Adding noise functions, like Perlin noise, can simulate organic movements, such as a nebula’s wispy clouds.

For 3D, Three.js is the go-to library. A simple project might involve rendering a rotating galaxy. Use a \`Points\` object with a \`BufferGeometry\` to create thousands of particles arranged in a spiral. Apply a custom shader to give particles a glowing effect, with colors transitioning from cyan to magenta. Animate the galaxy’s rotation with \`requestAnimationFrame\` for smooth performance.

Interactivity elevates creative coding projects. For example, allow users to control the camera with mouse movements or adjust parameters like particle density via sliders. Libraries like dat.gui can add a control panel for real-time tweaks, making the experience more engaging. You can also integrate audio reactivity, where visualizations pulse to music using the Web Audio API.

Optimization is crucial for complex visualizations. Use instanced rendering to draw multiple particles efficiently and limit the number of draw calls. For canvas-based projects, consider offscreen canvases to pre-render static elements. Testing on various devices ensures accessibility, as heavy visualizations can strain lower-end hardware.

Inspiration can come from real astronomical phenomena. Study images of galaxies, nebulae, or supernovae to inform your color palettes and shapes. Tools like Blender can help design 3D models, which can be imported into Three.js for web use. Sharing your work on platforms like CodePen or GitHub can also spark collaboration and feedback.

Creative coding is about experimentation. Start with small projects, like a single starfield, and gradually add complexity, such as shaders or physics simulations. The goal is to evoke wonder, making users feel like they’re exploring the cosmos. By blending art, code, and interactivity, you can create experiences that are both beautiful and inspiring. (Approx. 500 words)`,
  },
];

export default function Blog() {
  const [filter, setFilter] = useState('all');
  const [filteredBlogs, setFilteredBlogs] = useState(blogs);
  const [expandedBlog, setExpandedBlog] = useState(null);
  const [animateCards, setAnimateCards] = useState(false);

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const opacitySection = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const yPosSection = useTransform(scrollYProgress, [0, 0.2], [100, 0]);

  // Get unique categories
  const allCategories = [...new Set(blogs.map(blog => blog.category))].sort();

  // Handle filter change
  useEffect(() => {
    setAnimateCards(false);
    setExpandedBlog(null); // Close expanded blog when filtering
    setTimeout(() => {
      if (filter === 'all') {
        setFilteredBlogs(blogs);
      } else {
        const filtered = blogs.filter(blog => blog.category === filter);
        setFilteredBlogs(filtered);
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

  // Handle Read More click
  const handleReadMore = (blogId) => {
    setExpandedBlog(expandedBlog === blogId ? null : blogId);
  };

  return (
    <>
      <Head>
        <title>Cosmic Blog | Portfolio</title>
        <meta name="description" content="Explore my cosmic blog posts on web development, UI/UX, and creative coding." />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Rajdhani:wght@400;500;700&display=swap" />
      </Head>

      {/* Cosmic Background */}
      <div className="space-background">
        <div className="stars"></div>
        <div className="twinkling"></div>
        <div className="clouds"></div>
        <div className="pulsating-clouds"></div>
        <div className="shooting-stars">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="shooting-star"
              style={{
                animationDelay: `${Math.random() * 10}s`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Blog Hero */}
      <motion.section
        ref={sectionRef}
        style={{ opacity: opacitySection, y: yPosSection }}
        className="cosmic-hero"
      >
        <div className="cosmic-title">
          <h1>Cosmic Blog</h1>
          <p>A stellar collection of insights on web development, UI/UX, and creative coding.</p>
        </div>
      </motion.section>

      {/* Filter Section */}
      <section className="filter-section">
        <div className="filter-container">
          <button
            onClick={() => setFilter('all')}
            className={`cosmic-button ${filter === 'all' ? 'active' : ''}`}
          >
            All Posts
          </button>
          {allCategories.map(category => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`cosmic-button ${filter === category ? 'active' : ''}`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Blog Grid */}
      <section className="blog-grid-section">
        <div className="blog-grid">
          {filteredBlogs.length === 0 ? (
            <motion.div
              className="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p>No cosmic insights found in this category.</p>
              <button
                onClick={() => setFilter('all')}
                className="cosmic-button active"
              >
                View All Posts
              </button>
            </motion.div>
          ) : (
            filteredBlogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                className="blog-card"
                initial={{ opacity: 0, y: 50 }}
                animate={animateCards ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1, type: 'spring', stiffness: 100 }}
              >
                <BlogCard
                  blog={blog}
                  isExpanded={expandedBlog === blog.id}
                  onReadMore={() => handleReadMore(blog.id)}
                />
              </motion.div>
            ))
          )}
        </div>
      </section>


    </>
  );
}