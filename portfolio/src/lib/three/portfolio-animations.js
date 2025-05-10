// portfolio-animations.js - Custom animations for student portfolio

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Initialize the animations once the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Custom cursor
  initCustomCursor();
  
  // Parallax effects
  initParallaxEffects();
  
  // Magnetic buttons
  initMagneticElements();
  
  // 3D tilt effect for project cards
  initTiltEffect();
  
  // Text animation for headings
  initTextAnimations();
  
  // Page transitions
  initPageTransitions();
});

// Custom cursor animation
function initCustomCursor() {
  const cursor = document.createElement('div');
  cursor.classList.add('custom-cursor');
  document.body.appendChild(cursor);
  
  // Track mouse movement
  window.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
      x: e.clientX - 20,
      y: e.clientY - 20,
      duration: 0.1,
      ease: 'power1.out'
    });
  });
  
  // Cursor grow effect on interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-tag');
  
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      gsap.to(cursor, {
        scale: 1.5,
        opacity: 0.7,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    
    el.addEventListener('mouseleave', () => {
      gsap.to(cursor, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });
}

// Parallax scrolling effects
function initParallaxEffects() {
  // Hero parallax
  gsap.to('.hero-content', {
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    },
    y: 200,
    opacity: 0
  });
  
  // About section shapes parallax
  gsap.to('.shape-1', {
    scrollTrigger: {
      trigger: '.about-section',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    },
    x: -100,
    y: -50,
    ease: 'none'
  });
  
  gsap.to('.shape-2', {
    scrollTrigger: {
      trigger: '.about-section',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    },
    x: 100,
    y: 50,
    ease: 'none'
  });
  
  gsap.to('.shape-3', {
    scrollTrigger: {
      trigger: '.about-section',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    },
    scale: 1.5,
    ease: 'none'
  });
}

// Magnetic effect for buttons and interactive elements
function initMagneticElements() {
  const magneticElements = document.querySelectorAll('.btn-primary, .btn-secondary');
  
  magneticElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      
      gsap.to(el, {
        x: distanceX * 0.2,
        y: distanceY * 0.2,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    
    el.addEventListener('mouseleave', () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)'
      });
    });
  });
}

// 3D tilt effect for project cards
function initTiltEffect() {
  const cards = document.querySelectorAll('.project-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const deltaX = (x - centerX) / centerX;
      const deltaY = (y - centerY) / centerY;
      
      gsap.to(card, {
        rotationX: -deltaY * 10,
        rotationY: deltaX * 10,
        transformPerspective: 1000,
        ease: 'power1.out',
        duration: 0.5
      });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)'
      });
    });
  });
}

// Text animations
function initTextAnimations() {
  // Split text elements for animation
  const headings = document.querySelectorAll('.section-heading');
  
  headings.forEach(heading => {
    // Split text into characters
    const characters = heading.textContent.split('');
    heading.textContent = '';
    
    characters.forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      heading.appendChild(span);
      
      ScrollTrigger.create({
        trigger: heading,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(span, {
            opacity: 1,
            y: 0,
            duration: 0.1,
            delay: index * 0.03,
            ease: 'power1.out'
          });
        },
        once: true
      });
    });
  });
}

// Smooth page transitions
function initPageTransitions() {
  // Handle internal links
  const internalLinks = document.querySelectorAll('a[href^="/"]');
  
  internalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href');
      
      // Animate out current page
      gsap.to('.portfolio-container', {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: 'power2.inOut',
        onComplete: () => {
          window.location.href = href;
        }
      });
    });
  });
  
  // Animate in the page
  window.addEventListener('load', () => {
    gsap.from('.portfolio-container', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power2.out',
      delay: 0.3
    });
  });
}

// Create particles background using three.js
export function initParticlesBackground() {
  const container = document.querySelector('.canvas-container');
  if (!container) return;
  
  const width = container.clientWidth;
  const height = container.clientHeight;
  
  // Set up scene
  const scene = new THREE.Scene();
  
  // Set up camera
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.z = 5;
  
  // Set up renderer
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);
  
  // Create particles
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 1500;
  
  const posArray = new Float32Array(particlesCount * 3);
  
  for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 10;
  }
  
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  
  // Material
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.02,
    color: 0x915EFF,
    transparent: true,
    sizeAttenuation: true
  });
  
  // Mesh
  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);
  
  // Add stars
  const starGeometry = new THREE.BufferGeometry();
  const starCount = 300;
  
  const starPosArray = new Float32Array(starCount * 3);
  const starSizeArray = new Float32Array(starCount);
  
  for (let i = 0; i < starCount * 3; i += 3) {
    starPosArray[i] = (Math.random() - 0.5) * 10;
    starPosArray[i + 1] = (Math.random() - 0.5) * 10;
    starPosArray[i + 2] = (Math.random() - 0.5) * 10;
    
    // Random star size
    starSizeArray[i / 3] = Math.random() * 0.03 + 0.01;
  }
  
  starGeometry.setAttribute('position', new THREE.BufferAttribute(starPosArray, 3));
  
  const starMaterial = new THREE.PointsMaterial({
    size: 0.05,
    color: 0xFFFFFF,
    transparent: true,
    sizeAttenuation: true
  });
  
  // Use point size attribute
  starMaterial.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader.replace(
      'void main() {',
      `
      attribute float size;
      void main() {
      `
    );
    
    shader.vertexShader = shader.vertexShader.replace(
      'gl_PointSize = size;',
      'gl_PointSize = size * 100.0;'
    );
  };
  
  starGeometry.setAttribute('size', new THREE.BufferAttribute(starSizeArray, 1));
  
  const starPoints = new THREE.Points(starGeometry, starMaterial);
  scene.add(starPoints);
  
  // Animation
  let mouseX = 0;
  let mouseY = 0;
  
  window.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / width) * 2 - 1;
    mouseY = (event.clientY / height) * 2 - 1;
  });
  
  const animate = () => {
    requestAnimationFrame(animate);
    
    // Rotate particles based on mouse position
    particlesMesh.rotation.x += 0.001;
    particlesMesh.rotation.y += 0.001;
    
    // Subtle follow mouse effect
    particlesMesh.rotation.x += mouseY * 0.0005;
    particlesMesh.rotation.y += mouseX * 0.0005;
    
    starPoints.rotation.x += 0.0005;
    starPoints.rotation.y += 0.0005;
    
    renderer.render(scene, camera);
  };
  
  animate();
  
  // Handle window resize
  window.addEventListener('resize', () => {
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  });
  
  return () => {
    // Cleanup function
    container.removeChild(renderer.domElement);
    particlesGeometry.dispose();
    particlesMaterial.dispose();
    starGeometry.dispose();
    starMaterial.dispose();
  };
}